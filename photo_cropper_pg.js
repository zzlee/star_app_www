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
        
        
    onOkBtnClick: function() {
        croppedArea = myPhotoCropper.getCroppedArea();
        var rawPhotoImg = new Image();
        rawPhotoImg.src = fileProcessedForCropperURI;
        rawPhotoImg.onload = function(){
            var sourceCanvas = document.createElement("canvas");
            var sourceCanvasContext = sourceCanvas.getContext("2d");
            sourceCanvas.width = rawPhotoImg.width;
            sourceCanvas.height = rawPhotoImg.height;
            sourceCanvasContext.drawImage(rawPhotoImg, 0, 0);
            //console.dir(tempCanvas);
            var destinationCanvas = document.createElement("canvas");
            var destinationCanvasContext = destinationCanvas.getContext("2d");
            destinationCanvas.width = rawPhotoImg.width*croppedArea.width;
            destinationCanvas.height = rawPhotoImg.height*croppedArea.height;
            destinationCanvasContext.drawImage(sourceCanvas,
                                               rawPhotoImg.width*croppedArea.x,
                                               rawPhotoImg.height*croppedArea.y,
                                               rawPhotoImg.width*croppedArea.width,
                                               rawPhotoImg.height*croppedArea.height,
                                               0, 0,
                                               destinationCanvas.width,
                                               destinationCanvas.height);
            photoCroppedURI = destinationCanvas.toDataURL();
            $.mobile.changePage("movie_preview.html");
        }
        FmMobile.analysis.trackEvent("Button", "Click", "Crop", 23);
    }
}

