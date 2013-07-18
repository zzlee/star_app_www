FmMobile.template_previewPg = {
PAGE_ID: "template_previewPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_previewPg");
    recordUserAction("enters template_previewPg");
},
    
init: function(){
    $("#nav-bar").show();
    
    
    ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent,function(err, imageUgc){
                         console.log(err);
                         if (!err){
                         console.log(err);
                             $("#show").attr("src", imageUgc.getImageUrl() );
                         console.log(err);

                         }
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
