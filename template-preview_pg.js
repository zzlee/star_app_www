FmMobile.template_previewPg = {
PAGE_ID: "template_previewPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_previewPg");
    recordUserAction("enters template_previewPg");
},
    
init: function(){
    $("#nav-bar").show();
    
    var imageUgc;
    ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent,function(err, _imageUgc){
                         console.log(err);
                         if (!err){
                         imageUgc = _imageUgc;
                         console.log(err);
                             $("#show").attr("src", imageUgc.getImageUrl() );
                         console.log(err);

                         }
                         });

    
    
    $('#btnTest').click(function(){
                        
                        //alert("22");
                        var mainTemplate = FmMobile.selectedTemplate;
                        var ownerId = localStorage._id; //Gance's
                        var ownerFbUserId = localStorage.fb_userID; //Gance's
                        var ugcProjectId = mainTemplate +'-'+ ownerId +'-'+ (new Date()).toISOString().replace(/[-:.]/g, "");
                        var ugcInfo = {
                        ownerId:{_id:ownerId, fbUserId:ownerFbUserId },
                        contentGenre: mainTemplate,
                        title: "today's mood"
                        };
                        
                        imageUgc.uploadToServer(ugcProjectId, ugcInfo, function(err){
                                                console.log("err="+err);
                                                if(!err){alert("success!");}
                                                });
                        });

    
    /*
    ImageUgc.getInstance(FmMobile.selectedTemplate,FmMobile.selectedSubTemplate, FmMobile.userContent,
                         function(err, imageUgc){
                         
                    if (!err){
                    alert("success");
                    $("#canvasImg").attr("src", imageUgc.getImageUrl() );
                         }
                    });    
     
     */
     /*
                      alert(
                      "selectedTemplate: "+FmMobile.selectedTemplate+"<br>"+
                      "selectedSubTemplate: "+FmMobile.selectedTemplate+"<br>"+
                      "text: "+FmMobile.userContent.text+"<br>"+
                       "url: " +FmMobile.userContent.picture.url+"<br>"+
                        "crop: "+FmMobile.userContent.picture.crop._x+"<br/>"+
                            FmMobile.userContent.picture.crop._y+
                            FmMobile.userContent.picture.crop._w+
                            FmMobile.userContent.picture.crop._h+
                            FmMobile.userContent.picture.url
                            
                            );
                      */
    /*
    alert(FmMobile.userContent.text);
   alert(FmMobile.userContent.picture.urlOfOriginal);
    alert(FmMobile.userContent.picture.crop._x);
    alert(FmMobile.userContent.picture.crop._y);
    alert(FmMobile.userContent.picture.crop._w);
    alert(FmMobile.userContent.picture.crop._h);
    */
    
 },
};
