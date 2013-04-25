FmMobile.photoSelectPopupPg = {
	//  Page constants.
    PAGE_ID: "photoSelectPopupPg",
    
    //  Page methods.
    getPhotoFail: function (message) {
        alert('没有選到相片，請再選一次！');
    },
        
        
    gotoPhotoCropper: function (imageURI) {
        
        fileSelectedURI = imageURI;
        
        //Here is the workaround for iOS6 subsampling issue (when drawing from a more-than-2M jpg to canvas)
        subsamplingResize(imageURI, { maxWidth: 960, maxHeight: 960 }, function(resultURI){
                          fileProcessedForCropperURI = resultURI;
                          $.mobile.changePage("photo_cropper.html");
                          });
        
        //fileProcessedForCropperURI = imageURI;
        
        
    },
        
        
    onUseCameraBtnClick: function(event, data){
        navigator.camera.getPicture(FmMobile.photoSelectPopupPg.gotoPhotoCropper, FmMobile.photoSelectPopupPg.getPhotoFail,{
                                    quality: 50,
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    sourceType: navigator.camera.PictureSourceType.CAMERA
                                    });
    },
        
    onUsePhotoAlbumBtnClick: function(event, data){
        navigator.camera.getPicture(FmMobile.photoSelectPopupPg.gotoPhotoCropper, FmMobile.photoSelectPopupPg.getPhotoFail,{
                                    quality: 50,
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                    });
    }
}
