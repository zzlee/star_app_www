FmMobile.template_input_miixit = {
	//  Page constants.
PAGE_ID: "template_input_miixit",
    
    //  Page methods.
show: function(){
    FmMobile.analysis.trackPage("/template_input_miixit");
    recordUserAction("enters template_input_miixit");
    FmMobile.dummyDiv();
},
    
load: function(event, data){
    // FmMobile.userContent.text="aaa";
    $('#template_name_3').html(FmMobile.selectedTemplateName);
    //FmMobile.bindClickEventToNavBar();
    
    $("#nav-bar").show();
    if ( localStorage._id ) {
        userName = localStorage._id;
    }
    else {
        userName = "anonymous";
    }
    
    
    // if(FmMobile.selectedTemplate=="cultural_and_creative"){
    
    $("#back_main").click(function(){
                          $.mobile.changePage("template-sub-miixit.html");
                          });
    
    /*
     if(FmMobile.selectedTemplate=="cultural_and_creative"){
     
     $("#template_name_2").html('').append(templateMgr.getTemplateList()[0].name);
     }else if(FmMobile.selectedTemplate=="mood"){
     $("#template_name_2").html('').append(templateMgr.getTemplateList()[1].name);
     }else if(FmMobile.selectedTemplate=="miix_it"){
     $("#template_name_2").html('').append(templateMgr.getTemplateList()[3].name);
     }
     */
    
    
    
    
    
    var itemContentIsReady;
    
    
    
    var buttonClick_cb = function(event, ui) {
        
        console.log('button clicked!');
        //fileObjectID = event.data.objectID;
        //console.log('[buttonClick_cb()] fileObjectID = %s', fileObjectID);
        //alert('fileObjectID = '+fileObjectID );
        
        
        var getPhotoFail = function (message) {
            //alert('疆簡癒疆��冕怏蜆瓦冕把�繡癟�售�簿翹�癡竄�嘔乒��矇�繡瓣繡�珍汕玲￣純撢�);
        }
        
        
        var gotoPhotoCropper = function (imageURI) {
            
            FmMobile.userContent.picture.urlOfOriginal = imageURI;
            
            if ( (device.version > "6") && ((device.platform == "iPhone") || (device.platform == "iPad") || (device.platform == "iPod touch")) ) {
                FM_LOG("subsampling");
                //Here is the workaround for iOS 6.0 and 6.0.1 subsampling issue (when drawing from a more-than-2M jpg to canvas)
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
                
                
            }else if(device.platform == "Android"){
           		 var tempImg = new Image();
                    tempImg.src = imageURI;
                    tempImg.onload = function() {
                        EXIF.getData( tempImg, function(){
                                     var orientation = EXIF.getTag(tempImg, "Exif Version");
                                     alert(orientation);
                                     
                                     subsamplingResize(imageURI, { maxWidth: 960, maxHeight: 960, orientation: orientation }, function(resultURI){
                                                       alert(orientation);
                                                       fileProcessedForCropperURI = resultURI;
                                                       $.mobile.changePage("template-photo_cropper.html");
                                                       });
                                     });
                        
                    }; 
                
                
            }else{
            	
                fileProcessedForCropperURI = imageURI;
                $.mobile.changePage("template-photo_cropper.html");
                
            }
            console.log("os = " + device.platform);
            console.log("version= "+device.version);
            
        }
        
        if ( event.data.photoSource == "album" ) {
        	if(device.platform == "Android") {
        	    FmMobile.userContent.picture.urlOfOriginalIsFromAndroidAlbum = true;
        	}
        	else {
        	    FmMobile.userContent.picture.urlOfOriginalIsFromAndroidAlbum = false;
        	}
            navigator.camera.getPicture(gotoPhotoCropper, getPhotoFail,{
                                        quality: 50,
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                         targetWidth: 1500,
                                            targetHeight: 1500
                                        });
            FmMobile.analysis.trackEvent("Button", "Click", "Album", 21);
        }else {
            FmMobile.userContent.picture.urlOfOriginalIsFromAndroidAlbum = false;
            navigator.camera.getPicture(gotoPhotoCropper, getPhotoFail,{
                                        quality: 50,
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.CAMERA,
                                         targetWidth: 1500,
                                            targetHeight: 1500
                                        });
            FmMobile.analysis.trackEvent("Button", "Click", "Album", 22);
        }
        
        
        
        
    };
    
    $('#btnUseCamera').bind( "click", { photoSource: "camera" }, buttonClick_cb);
    $('#btnUseAlbum').bind( "click", { photoSource: "album" }, buttonClick_cb);
    
    
}
};
