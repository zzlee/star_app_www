var ugcUtility = {};

ugcUtility.drawChineseText = function(context, text, x, y, maxWidth, lineHeight, angle, fontColor, font) {
    x = Number(x);
    y = Number(y);
    maxWidth = Number(maxWidth);
    lineHeight = Number(lineHeight);
    angle = Number(angle);
    
    var cursorX = 0;
    var cursorY = 0;
    var words = text; //In Chinese, a character is a word.
    var line = '';
    
    context.save();
    context.translate(x,y);
    context.rotate(angle*Math.PI/180);
    if (font){
        context.font = font; 
    }
    else {
        context.font = '36px 華康歐陽詢體W5';
    }
    
    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        
        
        if(FmMobile.selectedTemplate=="check_in"){
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, cursorX, cursorY);
                line = words[n];
                cursorY += lineHeight;
            }
            else {
                line = testLine;
            }
        }else{
            if(true) {
                line = testLine;
                var changePerLine=testLine.split("<n>");
                if(changePerLine.length>1){
                    for(var i=0;i<changePerLine.length;i++){
                        line=changePerLine[i];
                        context.fillText(line, cursorX, cursorY);
                    }
                    cursorY += lineHeight;
                }else{
                    line = testLine;
                }
            }
        }
        //var changePerLine=testLine.split("<n>");
        //&& changePerLine.length<1
        /*
        if (testWidth > maxWidth && n > 0  ) {
            context.fillText(line, cursorX, cursorY);
            line = words[n];
            cursorY += lineHeight;
        }else
         */
         
        context.fillStyle = fontColor;
    }
    
    
    
    context.fillText(line, cursorX, cursorY);
    
    context.restore();
};

ugcUtility.drawImage = function(context, imageUrl, x, y, width, height, angle, cbOfDrawImage){
    var objImage = new Image();
    objImage.src = imageUrl;
    objImage.onload = function(){
        context.save();
        context.translate(x,y);
        context.rotate(angle*Math.PI/180);
        context.drawImage(objImage, 0, 0, width, height);
        context.restore();
        cbOfDrawImage(null);
    };
    objImage.onerror = function(){
        cbOfDrawImage("Failed to load the image "+imageUrl);
    };
    objImage.onabort = function(){
        cbOfDrawImage("Failed to load the image "+imageUrl+" (aborted)");
    };
};
