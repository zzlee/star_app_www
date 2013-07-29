FmMobile.template_input_miixit = {
	//  Page constants.
PAGE_ID: "template_input_miixit",
    
    //  Page methods.
show: function(){
    FmMobile.analysis.trackPage("/template_input_miixit");
    recordUserAction("enters template_input_miixit");
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
                          $.mobile.changePage("template-main_template.html");
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
    
    
    
    var url = $(this).data('url');
    //var templateID = url.split("=")[1];
    var templateID = "greeting";
    //var templateID = "miixcard";
    //var templateID = "rotate";
    projectID = templateID +'-'+ userName +'-'+ (new Date()).toISOString().replace(/[-:.]/g, "");
    customizedContent.projectID = projectID;
    customizedContent.templateID = templateID;
    customizedContent.userName = userName;
    //customizedContent.ownerID = {_id: localStorage._id, fb_userID: localStorage.fb_userID, fb_name: localStorage.fb_name};
    customizedContent.ownerID = localStorage._id;
    customizedContent.ownerFbUserID = localStorage.fb_userID;
    
    
    var itemContentIsReady;
    
    
    
    var buttonClick_cb = function(event, ui) {
        
        console.log('button clicked!');
        fileObjectID = event.data.objectID;
        console.log('[buttonClick_cb()] fileObjectID = %s', fileObjectID);
        //alert('fileObjectID = '+fileObjectID );
        
        
        
        var getPhotoFail = function (message) {
            //alert('没有選到相片，請再選一次！');
        }
        
        
        var gotoPhotoCropper = function (imageURI) {
            
            fileSelectedURI = imageURI;
            
            if ( device.version > "6") {
                
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
                
                
            }
            else {
                fileProcessedForCropperURI = imageURI;
                $.mobile.changePage("template-photo_cropper.html");
                
            }
            
            console.log("version="+device.version);
            
        }
        
        if ( event.data.PhotoSource == "album" ) {
            navigator.camera.getPicture(gotoPhotoCropper, getPhotoFail,{
                                        quality: 50,
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                        });
            FmMobile.analysis.trackEvent("Button", "Click", "Album", 21);
        }
        else {
            navigator.camera.getPicture(gotoPhotoCropper, getPhotoFail,{
                                        quality: 50,
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.CAMERA
                                        });
            FmMobile.analysis.trackEvent("Button", "Click", "Album", 22);
        }
        
        
        
        
    }
    
    var getCustomizableObject_cb = function(xmlDoc) {
        var customizableObjectsXml = xmlDoc.getElementsByTagName("customizable_object");
        
        itemContentIsReady = Array(customizableObjectsXml.length);
        
        for (var i=0; i<customizableObjectsXml.length; i++) {
            var objID = customizableObjectsXml[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
            var objFormat = customizableObjectsXml[i].getElementsByTagName("format")[0].childNodes[0].nodeValue;
            var objDescription = customizableObjectsXml[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
            var objKeyFrame = customizableObjectsXml[i].getElementsByTagName("key_frame")[0].childNodes[0].nodeValue;
            
            customizableObjectDimensions[objID] = {
            width: customizableObjectsXml[i].getElementsByTagName("original_width")[0].childNodes[0].nodeValue,
                height: customizableObjectsXml[i].getElementsByTagName("original_height")[0].childNodes[0].nodeValue };
            
            $('#movieKeyFrame').attr('src', './template/'+templateID+'/'+objKeyFrame);
            
            $('#btnUseCamera').bind( "click", { objectID: objID, objectIndex: i, PhotoSource: "camera" }, buttonClick_cb);
            $('#btnUseAlbum').bind( "click", { objectID: objID, objectIndex: i, PhotoSource: "album" }, buttonClick_cb);
            
            
            customizableObjects[i] = new Object();
            customizableObjects[i].ID = objID;
            customizableObjects[i].format = objFormat;
        }
    }
    
    
    //console.log('enter movieCreatePg');
    
    
    $.ajax({
           url: './template/'+templateID+'/template_customizable_object_list.xml',
           dataType: 'xml',
           success: getCustomizableObject_cb
           });
    
    /*
     var btnSubmit1Click_cb = function () {
     //console.dir(customizedContent);
     $.post(starServerURL+'/miix/videos/user_content_description', customizedContent, function(result){
     console.dir(result);
     });
     
     //go back to home.html
     //TODO: find a better way to go bakc to home.html
     //$.mobile.changePage("home.html", {changeHash: false});
     $('#movieCreatePg').live('pagehide',function(event, ui){
     history.back();
     });
     history.back();
     
     }
     
     $('#btnSubmit1').bind( "click", btnSubmit1Click_cb);
     $('#movieCreatePgFooter').hide();
     */
}
}
