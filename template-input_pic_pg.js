FmMobile.template_pic_pg = {
	//  Page constants.
    PAGE_ID: "template_pic_pg",
    
    //  Page methods.
    show: function(){
        FmMobile.analysis.trackPage("/template_pic_pg");
//        recordUserAction("enters template_pic_pg");
        FmMobile.dummyDiv();
    },
    
    load: function(event, data){
        FmMobile.userContent.text=null;
        
        //FmMobile.bindClickEventToNavBar();
        
        $("#nav-bar").show();
        /*
        if ( localStorage._id ) {
            userName = localStorage._id;
        }
        else {
            userName = "anonymous";
        }
        */
        
        
       // if(FmMobile.selectedTemplate=="cultural_and_creative"){
            
        $("#back_main").click(function(){
                              $.mobile.changePage("template-sub_template.html");
                              });
        
        
       $('#template_top_img_pic').attr({src:FmMobile.selectedTemplateBarImg});        
        //$('#template_name_2').html(FmMobile.selectedTemplateName);
        
        /*
        if(FmMobile.selectedTemplate=="cultural_and_creative"){
                        $("#template_name_3").html('').append(templateMgr.getTemplateList()[0].name);
        }else if(FmMobile.selectedTemplate=="mood"){
            $("#template_name_3").html('').append(templateMgr.getTemplateList()[1].name);
        }else if(FmMobile.selectedTemplate=="miix_it"){
             $("#template_name_3").html('').append(templateMgr.getTemplateList()[3].name);
        }
         */

        
        
        
        var url = $(this).data('url');
        
        
        
        var itemContentIsReady;
        
        
        
        var buttonClick_cb = function(event, ui) {
            
            console.log('button clicked!');
            //fileObjectID = event.data.objectID;
            //console.log('[buttonClick_cb()] fileObjectID = %s', fileObjectID);
            //alert('fileObjectID = '+fileObjectID );
            
            
            var getPhotoFail = function (message) {
                //alert('没�到��，�選一次�');
            }
            
            
            var gotoPhotoCropper = function (imageURI) {
                
                FmMobile.userContent.picture.urlOfOriginal = imageURI;
                
                if ( (device.version > "6") && ((device.platform == "iPhone") || (device.platform == "iPad") || (device.platform == "iPod touch"))) {
                    
                    //Here is the workaround for iOS 6.0 and 6.0.1 subsampling issue (when drawing from a more-than-2M jpg to canvas)
                    var tempImg = new Image();
                    tempImg.src = imageURI;
                    tempImg.onload = function() {
                        EXIF.getData( tempImg, function(){
                                     var orientation = EXIF.getTag(tempImg, "Orientation");
                                     //alert(orientation);
                                     subsamplingResize(imageURI, { maxWidth: 960, maxHeight: 960, orientation: orientation }, function(resultURI){
                                                       fileProcessedForCropperURI = resultURI;
                                                       $.mobile.changePage("template-photo_cropper.html");
                                                       });
                                     });
                        
                    };
                    
                    
                }
                else {
                   
                     var tempImg = new Image();
                    tempImg.src = imageURI;
                    tempImg.onload = function() {
                        EXIF.getData( tempImg, function(){
                                     var orientation = EXIF.getTag(tempImg, "Orientation");
                                     subsamplingResize(imageURI, { maxWidth: 960, maxHeight: 960, orientation: orientation }, function(resultURI){
                                                       fileProcessedForCropperURI = resultURI;
                                                       $.mobile.changePage("template-photo_cropper.html");
                                                       });
                                     });
                        
                    }; 
                }
                console.log("version="+device.platform+"\n"+device.version);
                
            };
            
            if ( event.data.photoSource == "album" ) {
                navigator.camera.getPicture(gotoPhotoCropper, getPhotoFail,{
                                            quality: 50,
                                            destinationType: navigator.camera.DestinationType.FILE_URI,
                                            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                             targetWidth: 1500,
                                            targetHeight: 1500
                                            });
                FmMobile.analysis.trackEvent("Button", "Click", "album", 1);
            }
            else {
                navigator.camera.getPicture(gotoPhotoCropper, getPhotoFail,{
                                            quality: 50,
                                            destinationType: navigator.camera.DestinationType.FILE_URI,
                                            sourceType: navigator.camera.PictureSourceType.CAMERA,
                                            targetWidth: 1500,
                                            targetHeight: 1500
                                            });
                FmMobile.analysis.trackEvent("Button", "Click", "camera", 1);
            }
        };
        
        $('#btnUseCamera').bind( "click", { photoSource: "camera" }, buttonClick_cb);
        $('#btnUseAlbum').bind( "click", { photoSource: "album" }, buttonClick_cb);
        
        
    }
}
