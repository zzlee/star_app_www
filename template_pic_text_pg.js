FmMobile.template_pic_text_pg = {
	//  Page constants.
PAGE_ID: "template_pic_text_pg",
    
    //  Page methods.
show: function(){
    FmMobile.analysis.trackPage("/template_pic_text_pg");
    recordUserAction("enters template_pic_text_pg");
    FmMobile.dummyDiv();
},
    
load: function(event, data){
   // FmMobile.userContent.text="aa";
    var textForUgcUtility;
    
    $("#ur_text").bind("blur",function(){
                       textForUgcUtility= $("#ur_text").val().replace(/\n/g,"<n>");
                       FmMobile.userContent.text=textForUgcUtility;
                       });
    
    
    $("#ur_text").keyup(function(){
                        var moreLineInBox=$("#ur_text").val();
                        moreLineInBox=$("#ur_text").val().replace(/\n/g,"<n>");
                        var moreLineInBox_2=moreLineInBox.split("<n>");
                        if(moreLineInBox_2.length>3){
                        FmMobile.showNotification("inAreaTextOver");
                        $("#ur_text").val(moreLineInBox_2[0]+"\n"+moreLineInBox_2[1]+"\n"+moreLineInBox_2[2]);
                        return false;
                        }
                        });
   
    $("#nav-bar").show();
    
    
    $("#back_main").click(function(){
                          $.mobile.changePage("template-sub_template.html");
                          });
    
    
    $('#template_top_img_pic').attr({src:FmMobile.selectedTemplateBarImg});
    
    
    
    
    var url = $(this).data('url');
    
    
    
    var itemContentIsReady;
    
    
    
    var buttonClick_cb = function(event, ui) {
        
        console.log('button clicked!');
        //fileObjectID = event.data.objectID;
        //console.log('[buttonClick_cb()] fileObjectID = %s', fileObjectID);
        //alert('fileObjectID = '+fileObjectID );
        if($("#ur_text").val().length==0 ||$("#ur_text").val()==" "){
            FmMobile.showNotification("nullText");
        }else{
            
            var check_format= FmMobile.userContent.text.split("<n>");
            //FmMobile.userContent.text=check_format;
            if(check_format.length>3){
                FmMobile.showNotification("moreLines");
                return false;
                //alert("more than 4 lines!");
            }
            
            if(check_format[0].length >8){
                
                FmMobile.showNotification("moreWords");
                return false;
                
                
            }
            if(check_format[1] != undefined){
                if(check_format[1].length >8 ){
                    FmMobile.showNotification("moreWords");
                    return false;
                    
                }
            }
            
            if(check_format[2] != undefined){
                if(check_format[2].length >8 ){
                    FmMobile.showNotification("moreWords");
                    return false;
                    
                }
            }
        
        var getPhotoFail = function (message) {
            //alert('没有選到相片，請再選一次！');
        }
        
        
        var gotoPhotoCropper = function (imageURI) {
            
            FmMobile.userContent.picture.urlOfOriginal = imageURI;
            
            if ( (device.version > "6") && (device.platform == "iPhone")) {
                
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
            
        };
        
        if ( event.data.photoSource == "album" ) {
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
    };
    
    $('#btnUseCamera').bind( "click", { photoSource: "camera" }, buttonClick_cb);
    $('#btnUseAlbum').bind( "click", { photoSource: "album" }, buttonClick_cb);
    
    
}
}