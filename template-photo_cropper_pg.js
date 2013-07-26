var option = {
source: { x: 0, y: 0 },
scale: { w: 0, h: 0 },
destination: { x: 0, y: 0 },
scope: { w: 0, h: 0 }
};
var canvas, context, image;

var s_now = { x: 0, y: 0, status: 0 },
p_before = { x: 0, y: 0, v: 0, status: 0 },
p_now = { x: 0, y: 0, v: 0 };

FmMobile.photoCropperPg = {
	//  Page constants.
PAGE_ID: "photoCropperPg",
	
	//myPhotoCropper: null,
stageAllowableWidth: 0,
stageAllowableHeight: 0,
    
    //  Page methods.
load: function(event, data){
    
    $("#nav-bar").show();
    
    if(FmMobile.selectedTemplate=='miix_it'){
        
         $("#submitPhotoBtn2").click(function(){
        FmMobile.userContent.picture.urlOfOriginal = fileSelectedURI;
        FmMobile.userContent.picture.urlOfCropped = canvas.toDataURL();
        $.mobile.changePage("template-preview.html");
                                     });
        /*
        var videoUgc;
        VideoUgc.getInstance('miix_it', 'miix_one_image', function(err, _videoUgc){
                             if (!err){
                                 videoUgc = _videoUgc;
                                }
             });

        $("#submitPhotoBtn2").click(function(){
                                    alert("aaa");
                        var mainTemplate = FmMobile.selectedTemplate;
                        var ownerId = localStorage._id; //Gance's
                        var ownerFbUserId = localStorage.fb_userID; //Gance's
                        var ugcInfo = {
                                ownerId:{_id:ownerId, fbUserId:ownerFbUserId },
                                title: "My Miix move!!"
                            };
                                    
                    
                                    
                    videoUgc.askServerToGenerate(FmMobile.userContent, ugcInfo, function(err){
                                 console.log("err="+err);
                                         });
            });
        */
                                    
                        
        
    }else{
    $("#submitPhotoBtn2").click(function(){
                        
                                FmMobile.userContent.picture.urlOfCropped = canvas.toDataURL();
                                $.mobile.changePage("template-preview.html");
                        });
    
    }
    var onSubmitBtnClick= function() {
       
        
        FmMobile.userContent.picture.urlOfCropped = canvas.toDataURL();
        
          
        var uploadFail_cb = function(error) {
            
            var onConfirm = function(buttonIndex) {
                switch(buttonIndex) {
                    case 1:
                        $('#submitPhotoBtn').click();
                        break;
                    case 2:
                        $.mobile.changePage("my_video.html");

                        
                        break;
                }
            }
            navigator.notification.confirm(
                                           '喔喔！上傳失敗了。您的網路OK嗎？',  // message
                                           onConfirm,              // callback to invoke with index of button pressed
                                           ' ',            // title
                                           '重新上傳,以後再玩'          // buttonLabels
                                           );
            
        }
        
        
        var uploadSuccess_cb = function(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            
            //$('#divStatus').html("檔案上傳成功！");
            
            customizableObjects[0].content = fileSelected;
            
            
            customizedContent.timeStamp = (new Date()).toISOString();
            customizedContent.customizableObjects = JSON.stringify(customizableObjects);

            
            $.post(starServerURL+'/miix/videos/user_content_description', customizedContent, function(result){
                   console.dir("upload user data info result: "+result);
                   if ( !result.err ) {
                   FmMobile.addProcessingWork(projectID);
                   $.mobile.hidePageLoadingMsg();
                   //$.mobile.changePage("template-preview.html");
                   
                   }
                   })
            .error(function() {
                   var onConfirm = function(buttonIndex) {
                   switch(buttonIndex) {
                   case 1:
                   $('#submitPhotoBtn').click();
                   break;
                   case 2:
                  // $.mobile.changePage("template-preview.html");
                   break;
                   }
                   }
                   navigator.notification.confirm(
                                                  '喔喔！上傳失敗了。您的網路OK嗎？',  // message
                                                  onConfirm,              // callback to invoke with index of button pressed
                                                  ' ',            // title
                                                  '重新上傳,以後再玩'          // buttonLabels
                                                  );
                   });
        }
        
        
        var uploadPhoto = function (imageURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
            fileSelected = options.fileName;
            options.mimeType = "image/jpeg";
            //options.mimeType = "image/png";
            options.chunkedMode = true;
            
            var params = new Object();
            params.fileObjectID = fileObjectID;
            params.projectID = projectID;
            params.croppedArea_x = croppedArea.x;
            params.croppedArea_y = croppedArea.y;
            params.croppedArea_width = croppedArea.width;
            params.croppedArea_height = croppedArea.height;
            params.obj_OriginalWidth = customizableObjectDimensions[fileObjectID].width;
            params.obj_OriginalHeight = customizableObjectDimensions[fileObjectID].height;
            params.osVersion = "Android_" +device.version;
            
            
            console.log('[uploadPhoto()] params.projectID = %s', params.projectID);
            console.log('[uploadPhoto()] params.fileObjectID = %s', params.fileObjectID);
            
            
            options.params = params;
            options.chunkedMode = true;
            
            var ft = new FileTransfer();
            
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    var uploadPercentage = progressEvent.loaded / progressEvent.total * 100;
                    console.log("uploadPercentage=" + uploadPercentage.toString());
                } else {
                    console.log("upload some chunk....");
                }
            };
            
            
            ft.upload(imageURI, starServerURL+"/miix/videos/user_content_files", uploadSuccess_cb, uploadFail_cb, options);
            
            $("#moviePreview").trigger("stopPreviewAnimation");
            $('#divStatus').html("照片上傳成功後即開始影像合成，合成完成後會通知您去分享給朋友！");
            $('#divStatus').show();
            $('#photoSubmitButtons').hide();
            $.mobile.showPageLoadingMsg();
            
        }
        
        //uploadPhoto(fileSelectedURI);
        FmMobile.analysis.trackEvent("Button", "Click", "Submit", 24);
        //recordUserAction("submits a Photo");
        
        recordUserAction("submits a Photo", true);
        
    };
    
    $('#submitPhotoBtn').click(onSubmitBtnClick);
    $('#cancelBtn').click(function(){
                          
                          if( FmMobile.selectedSubTemplate=="picture_only"){
                          $.mobile.changePage("template-input_pic.html");
                          }else if(FmMobile.selectedSubTemplate=="picture_plus_text"){
                          $.mobile.changePage("template-input_text_pic.html");
                          }else if(FmMobile.selectedSubTemplate=="check_in"){
                          $.mobile.changePage("template-input_text_pic.html");

                          }
                          });
   
    
    
},
    
    
    
show: function(event, data){
    FmMobile.userContent.picture.urlOfOriginal=fileSelectedURI;
    
    //JF - image initial
    canvas = document.getElementById('photoZoom');
    context = canvas.getContext('2d');
    image = new Image();
    
    
    var change_css=($('.movie-pic-dummy').width())*0.95;
    $('.content-movie-img').css({
            'width':change_css,
            });

    
    
    //canvas.width = screen.availWidth;
    canvas.width = $('.movie-pic-dummy').width();
    canvas.height = canvas.width / customizableObjectDimensions[fileObjectID].width * customizableObjectDimensions[fileObjectID].height;
    
    image.onload = function(){
        
        option.scope.w = canvas.width;
        option.scope.h = image.height / image.width * canvas.width;
        
        option.destination.x = 0;
        option.destination.y = -0.5 * (option.scope.h - canvas.height);
        
        context.drawImage(image,
                          option.destination.x, option.destination.y,
                          option.scope.w, option.scope.h);
        
        croppedArea = {
        x:-option.destination.x / option.scope.w,  //fraction relative to its width
        y:-option.destination.y / option.scope.h,  //fraction relative to its height
        width:canvas.width / option.scope.w,  //fraction relative to its width
        height:canvas.height / option.scope.h  //fraction relative to its height
        };
        //alert(croppedArea.x);

    };
    
    //image.src = "images/test.jpg";  //for test
    
        image.src = fileProcessedForCropperURI;
   // FmMobile.userContent.picture.url=fileProcessedForCropperURI;
    
    //JF - image event
    $$('#photoZoom').pinching(function(e){
                              if(e.type == 'pinching') {
                              
                              p_now.x = (e.currentTouch[0].x + e.currentTouch[1].x) / 2 - canvas.offsetLeft;
                              p_now.y = (e.currentTouch[0].y + e.currentTouch[1].y) / 2 - canvas.offsetTop;
                              
                              //var delta = Math.sqrt(Math.sqrt(Math.pow(e.iniTouch[0].x - e.iniTouch[1].x, 2) +
                              //                                Math.pow(e.iniTouch[0].y - e.iniTouch[1].y, 2) -
                              //                                Math.pow(e.currentTouch[0].x - e.currentTouch[1].x, 2) +
                              //                                Math.pow(e.currentTouch[0].y - e.currentTouch[1].y, 2)));
                              p_now.v = Math.pow(e.currentTouch[0].x - e.currentTouch[1].x, 2) + Math.pow(e.currentTouch[0].y - e.currentTouch[1].y, 2);
                              
                              //zoom in/out
                              
                              var n = Math.sqrt(p_now.v / p_before.v);
                              
                              if (p_before.status){
                              
                              
                              //zoom limit: width * n
                              if(option.scope.w > image.width * 2 && n > 1) n = 1;
                              
                              option.scope.w *= n;
                              option.scope.h *= n;
                              
                              //center point mapping
                              option.destination.x = p_before.x - n * (p_before.x - option.destination.x) + (p_now.x - p_before.x);
                              option.destination.y = p_before.y - n * (p_before.y - option.destination.y) + (p_now.y - p_before.y);
                              
                              //zoom limit: width
                              if(option.scope.w < canvas.width) {
                              option.destination.x = 0;
                              option.destination.y = 0;
                              option.scope.w = canvas.width;
                              option.scope.h = image.height / image.width * canvas.width;
                              }
                              
                              showImage();
                              };
                              
                              p_before.x = p_now.x;
                              p_before.y = p_now.y;
                              p_before.v = p_now.v;
                              p_before.status = 1;
                              
                              }
                              //console.log(option.source.x + ', ' + option.source.y);
                              });
    
    $$('#photoZoom').pinch(function(e){
                           p_before.status = 0;
                           
                           croppedArea = {
                               x:-option.destination.x / option.scope.w,  //fraction relative to its width
                               y:-option.destination.y / option.scope.h,  //fraction relative to its height
                               width:canvas.width / option.scope.w,  //fraction relative to its width
                               height:canvas.height / option.scope.h  //fraction relative to its height
                           };
                           });
    
    $$('#photoZoom').swiping(function(e){
                             
                             //console.log('[swiping]');
                             
                             if(!isNaN(e.iniTouch.x) && (e.type == 'swiping')) {
                             
                             if(s_now.status == 0) {
                             s_now.x = e.iniTouch.x;
                             s_now.y = e.iniTouch.y;
                             s_now.status = 1;
                             }
                             
                             option.destination.x += e.currentTouch.x - s_now.x;
                             option.destination.y += e.currentTouch.y - s_now.y;
                             
                             showImage();
                             
                             s_now.x = e.currentTouch.x;
                             s_now.y = e.currentTouch.y;
                             
                             }
                             
                             });
    
    $$('#photoZoom').swipe(function(e){
                           //console.log('[swipe]');
                           s_now.status = 0;
                           
                           croppedArea = {
                               x:-option.destination.x / option.scope.w,  //fraction relative to its width
                               y:-option.destination.y / option.scope.h,  //fraction relative to its height
                               width:canvas.width / option.scope.w,  //fraction relative to its width
                               height:canvas.height / option.scope.h  //fraction relative to its height
                           };
                           
                           FmMobile.userContent.picture.crop._x=croppedArea.x;
                           FmMobile.userContent.picture.crop._y=croppedArea.y;
                           FmMobile.userContent.picture.crop._w=croppedArea.width;
                           FmMobile.userContent.picture.crop._h=croppedArea.height;
                           
                           


                           });
    
    showImage = function(){
        
        //limit
        if(option.destination.x < canvas.width - option.scope.w) option.destination.x = canvas.width - option.scope.w;
        if(option.destination.y < canvas.height - option.scope.h) option.destination.y = canvas.height - option.scope.h;
        if(option.destination.x > 0) option.destination.x = 0;
        if(option.destination.y > 0) option.destination.y = 0;
        
        //clear and draw image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, option.destination.x, option.destination.y,
                          option.scope.w, option.scope.h);
    };
    
    FmMobile.analysis.trackPage("/photoCropperPg");
    recordUserAction("enters photoCropperPg");
}
}

