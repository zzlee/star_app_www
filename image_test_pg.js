FmMobile.imageTestPg = {
PAGE_ID: "imageTestPg",
    
init: function(){
    
    
    // Draw it!
    /*
     var ugcCanvas = document.createElement('canvas');
     ugcCanvas.setAttribute("id","ugcCanvas");
     
     var ctx = ugcCanvas.getContext('2d');
     ctx.webkitImageSmoothingEnabled = true;
     var bgImage = new Image();
     var objImage = new Image();
     bgImage.src = 'template/mood/test_bg.jpg';
     bgImage.onload = function(){
     ugcCanvas.width = bgImage.width;
     ugcCanvas.height = bgImage.height;
     objImage.src = 'template/mood/Koala.jpg';
     objImage.onload = function(){
     ctx.drawImage(bgImage,0,0);
     //ctx.translate(742,19);
     
     
     var wrapChineseText = function(context, text, x, y, maxWidth, lineHeight) {
     var words = text; //In Chinese, a character is a word.
     var line = '';
     
     for(var n = 0; n < words.length; n++) {
     var testLine = line + words[n];
     var metrics = context.measureText(testLine);
     var testWidth = metrics.width;
     if (testWidth > maxWidth && n > 0) {
     context.fillText(line, x, y);
     line = words[n];
     y += lineHeight;
     }
     else {
     line = testLine;
     }
     }
     context.fillText(line, x, y);
     }
     
     
     // The text we want to draw.
     var text = 'In this example I don\'t care about <class="blue">blue</class> or <class="pink">pink</class>.\n\
     I just care about the new and <class="blue">exciting</class> <class="pink">automatic</class>\n\
     <class="blue">multiline</class> feature!! <br />Just to be sure:<br />Lorem ipsum dolor sit amet, \n\
     consectetur adipiscing elit. Nulla ut erat magna, quis commodo nulla.\n\
     Vestibulum <class="pink">eget</class> mi quis sapien lacinia porta eget eget neque. Aliquam lacus \n\
     leo, sodales sit amet laoreet non, mollis ut nibh.';
     
     var textChinse = 'å¾ˆå¤šäººç¿’æ…£åœ¨æ‰‹æ©Ÿå……é›»æ™‚è¬›é›»è©±ï¼Œé€™æ¨£çš„å‹•ä½œåƒè¬å¾—å°å¿ƒï¼Œå¤§é™¸å—æ–¹èˆªç©ºä¸€åç©ºå§ï¼Œ11æ—¥æ™šé–“åœ¨å®¶ä¸­ç”¨å……é›»çš„iPhone5è¬›é›»è©±ï¼Œæ²’æƒ³åˆ°ä¸€è‚¡é›»æµé€šéŽèº«é«”ï¼Œé€ æˆç©ºå§ç•¶å ´æ­»äº¡';
     
     
     ctx.save();
     ctx.translate(775,22);
     ctx.rotate(10.36*Math.PI/180);
     ctx.drawImage(objImage,0,0,240, 180);
     ctx.restore();
     
     ctx.save();
     ctx.translate(885,22);
     ctx.drawImage(objImage,0,0,240, 180);
     ctx.restore();
     
     ctx.save();
     ctx.translate(40,40);
     ctx.font = '30px è¯åº·æ­é™½è©¢é«”W5';
     wrapChineseText(ctx, textChinse, 0, 0, 300, 30);
     ctx.restore();
     
     $("#canvasImg").attr("src", ugcCanvas.toDataURL('image/png'));
     
     //upload to server
     var reultURI = resultCanvas.toDataURL('image/png').replace('image/octet-stream');
     
     $.ajax({
     type: "POST",
     url: starServerURL+"/miix/ugc_base64_contents",
     data: {
     imgBase64: reultURI
     }
     }).done(function(o) {
     console.log('saved');
     });
     
     
     };
     
     
     }; */
    
    
    
    /*
     if (templateMgr) {
     console.dir(templateMgr.getTemplateList());
     console.dir(templateMgr.getSubTemplateList("mood"));
     console.dir(templateMgr.getSubTemplate("mood","picture_plus_text"));
     }*/
    
    
    //== imageUgc test ==
    FmMobile.userContent.text = "sssssssssss";
    FmMobile.userContent.picture.urlOfCropped = 'img/Koala.jpg';
    FmMobile.userContent.thumbnail.url = 'img/darth-vader.jpg';
    
    var imageUgc = null;
    ImageUgc.getInstance('mood', 'picture_plus_text', FmMobile.userContent, function(err, _imageUgc){
                         if (!err){
                         imageUgc = _imageUgc;
                         $("#canvasImg").attr("src", imageUgc.getImageUrl() );
                         }
                         });
    
    $('#btnTest').click(function(){
                         
                         alert("22");
                        var mainTemplate = "mood";
                        var ownerId = '512da133989cfc2403000005'; //Gance's
                        var ownerFbUserId = '100004619173955'; //Gance's
                        var ugcProjectId = mainTemplate +'-'+ ownerId +'-'+ (new Date()).toISOString().replace(/[-:.]/g, "");
                        var ugcInfo = {
                        ownerId:{_id:ownerId, fbUserId:ownerFbUserId },
                        contentGenre: mainTemplate,
                        title: "today's mood"
                        };
                        
                        imageUgc.uploadToServer(ugcProjectId, ugcInfo, function(err){
                                                console.log("err="+err);
                                                });
                        });
    
    
    
    
},
    
show: function(){
},
};