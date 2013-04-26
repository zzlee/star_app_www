var FmMobile = window.FmMobile || {};

var templateSelected;
var fileSelectedURI, fileProcessedForCropperURI;
var photoCroppedURI="./img/face.jpg";
var fileObjectID;
var projectID;
var croppedArea;
var customizableObjectDimensions = new Object();
var customizedContent = new Object();
var fileSelected;
var myPhotoCropper;


var mobileinitForMovieGen = function() {
	$.mobile.page.prototype.options.addBackBtn = true;
	//$("#templateSelectPg").live("pageinit", FmMobile.templateSelectPg.load);
    //$("#photoSelectPopupPg").live("pageinit", FmMobile.photoSelectPopupPg.load);
	$("#movieCreatePg").live("pageinit", FmMobile.movieCreatePg.load);
    $("#movieCreatePg").live("pageshow", FmMobile.movieCreatePg.show);
	$("#photoCropperPg").live("pageinit", FmMobile.photoCropperPg.load);
    $("#photoCropperPg").live("pageshow", FmMobile.photoCropperPg.show);
	//$("#moviePreviewPg").live("pageinit", FmMobile.moviePreviewPg.load);
    //$("#moviePreviewPg").live("pageshow", FmMobile.moviePreviewPg.show);
}

/*
//for test
$(document).bind("mobileinit", function(){
    mobileinitForMovieGen();
});
 
*/











	


            
