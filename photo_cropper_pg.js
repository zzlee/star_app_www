FmMobile.photoCropperPg = {
	//  Page constants.
    PAGE_ID: "photoCropperPg",
	
	//myPhotoCropper: null,
    stageAllowableWidth: 0,
    stageAllowableHeight: 0,
    
    //  Page methods.
    load: function(event, data){
        stageAllowableWidth = window.innerWidth;
        stageAllowableHeight = window.innerHeight*0.9;
        var cropperWidthToHeightRatio = customizableObjectDimensions[fileObjectID].width / customizableObjectDimensions[fileObjectID].height;
        myPhotoCropper = new PhotoCropper("photo_cropper_container", stageAllowableWidth, stageAllowableHeight,  fileProcessedForCropperURI, cropperWidthToHeightRatio);
        
    },
        
    show: function(event, data){
        var stageWidth = $("#photo_cropper_container > div").width();
        var stageX = (stageAllowableWidth-stageWidth)/2;
        
        var stageHeight = $("#photo_cropper_container > div").height();
        var stageY = (stageAllowableHeight-stageHeight)/2;
        
        $("#photo_cropper_container > div").css("left", stageX.toString()+"px");
        $("#photo_cropper_container").css({"position":"absolute", "bottom":stageY.toString()+"px"});
        
        FmMobile.analysis.trackPage("/photoCropperPg");
        recordUserAction("enters photoCropperPg");
    },
    
    onSubmitBtnClick: function() {
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
            
            customizedContent.customizableObjects[0].content = fileSelected;
            
            
            customizedContent.timeStamp = (new Date()).toISOString();
            
            
            $.post(starServerURL+'/miix/videos/user_content_description', customizedContent, function(result){
                   console.dir("upload user data info result: "+result);
                   if ( !result.err ) {
                   FmMobile.addProcessingWork(projectID);
                   $.mobile.hidePageLoadingMsg();
                   $.mobile.changePage("my_video.html");
                   
                   }
                   })
            .error(function() {
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
            
            croppedArea = myPhotoCropper.getCroppedArea();
            
            var params = new Object();
            params.fileObjectID = fileObjectID;
            params.projectID = projectID;
            params.croppedArea_x = croppedArea.x;
            params.croppedArea_y = croppedArea.y;
            params.croppedArea_width = croppedArea.width;
            params.croppedArea_height = croppedArea.height;
            params.obj_OriginalWidth = customizableObjectDimensions[fileObjectID].width;
            params.obj_OriginalHeight = customizableObjectDimensions[fileObjectID].height;
            params.osVersion = "iOS_"+device.version;
            
            
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
        
        uploadPhoto(fileSelectedURI);
        FmMobile.analysis.trackEvent("Button", "Click", "Submit", 24);
        //recordUserAction("submits a Photo");
        
        recordUserAction("submits a Photo", true);
        
    }
    
    
}

