FmMobile.imageTestPg = {
    PAGE_ID: "imageTestPg",
 
    init: function(){
        
        var uploadToServer = function(imageURI, imageWidth, imageHeight){
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
            //options.mimeType = "image/jpeg";
            options.mimeType = "image/png";
            options.chunkedMode = true;
            
            var params = new Object();
            params.fileObjectID = 'test-image';
            params.projectID = 'test-image';
            params.croppedArea_x = 0;
            params.croppedArea_y = 0;
            params.croppedArea_width = 1;
            params.croppedArea_height = 1;
            params.obj_OriginalWidth = imageWidth;
            params.obj_OriginalHeight = imageHeight;
            params.osVersion = "iOS_"+device.version;
            
            options.params = params;
            options.chunkedMode = true;
            
            var ft = new FileTransfer();
            
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    var uploadPercentage = progressEvent.loaded / progressEvent.total * 100;
                    console.log("uploadPercentage=" + uploadPercentage.toString());
                } else {
                    console.log("upload some chunk....");
                }
            };
            
            var uploadSuccess_cb = function(){
                alert('File upload success!');
            };
            
            var uploadFail_cb = function(){
                alert('File upload failed!');
            };
            
            
            ft.upload(imageURI, starServerURL+"/miix/videos/user_content_files", uploadSuccess_cb, uploadFail_cb, options);
            
            
        
        };
 
                // Draw it!
            
 

        
        //var resultCanvas = document.getElementById('resultCanvas');
        
        var ugcCanvas = document.createElement('canvas');
        ugcCanvas.setAttribute("id","ugcCanvas");
        //document.getElementById('canvasContainer').appendChild(ugcCanvas);
        //$("#ugcCanvas").css("width","100%");
        
        //var ugcCanvas = $('<canvas>');
        //$('#canvasContainer').append(ugcCanvas);
        
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
                
                //== CanvasText ==
                // Definition of global vars
                var Canvas,Context;
                // Creation of the new CanvasText instance.
                var CT = new CanvasText;

                Canvas = ugcCanvas;
                Context = ctx;

                // Once window is loaded we set the configuration and the default styles.
                CT.config({
                    canvas: Canvas,
                    context: Context,
                    fontFamily: "Verdana",
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontColor: "#000",
                    lineHeight: "24"
                });
                /*
                 * Definition of some style classes.
                 */
                CT.defineClass("blue",{
                    fontSize: "22px",
                    fontColor: "#29a1f1",
                    fontFamily: "Impact",
                    fontWeight: "normal",
                    textShadow: "2px 2px 2px #919191"
                });

                CT.defineClass("pink",{
                    fontSize: "22px",
                    fontColor: "#ff5e99",
                    fontFamily: "Times new roman",
                    fontWeight: "bold",
                    fontStyle: "italic"
                });
                //== end of CanvasText ==
                
                var drawText = function(x, y, boxWidth, lineHeight) {
                	
                }
                

                // The text we want to draw.
                var text = 'In this example I don\'t care about <class="blue">blue</class> or <class="pink">pink</class>.\n\
                            I just care about the new and <class="blue">exciting</class> <class="pink">automatic</class>\n\
                            <class="blue">multiline</class> feature!! <br />Just to be sure:<br />Lorem ipsum dolor sit amet, \n\
                            consectetur adipiscing elit. Nulla ut erat magna, quis commodo nulla.\n\
                            Vestibulum <class="pink">eget</class> mi quis sapien lacinia porta eget eget neque. Aliquam lacus \n\
                            leo, sodales sit amet laoreet non, mollis ut nibh.';

                var textChinse = '很多人習慣在手機充電時講電話，這樣的動作千萬得小心，大陸南方航空一名空姐，11日晚間在家中用充電的iPhone5講電話，沒想到一股電流通過身體，造成空姐當場死亡';

                
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
                ctx.translate(775,22);
                ctx.rotate(10.36*Math.PI/180);
                //draw text
                CT.drawText({
                    text:textChinse,
                    x: 0,
                    y: 0,
                    boxWidth:240
                });
                ctx.restore();
                
                
                $("#canvasImg").attr("src", ugcCanvas.toDataURL('image/png'));
                
                /*
                var reultURI = resultCanvas.toDataURL('image/png').replace('image/octet-stream');
                //uploadToServer(reultURI, bgImage.width, bgImage.height);
                //Canvas2Image.saveAsPNG(resultCanvas);
                
                $.ajax({
                       type: "POST",
                       url: starServerURL+"/miix/ugc_base64_contents",
                       data: {
                           imgBase64: reultURI
                       }
                       }).done(function(o) {
                               console.log('saved');
                       });*/
                
                
            };

            
        };
        
        if (templateMgr) {
			console.dir(templateMgr.getSubTemplate("mood","picture_plus_text"));
		}

        
 
    },
    
    show: function(){
    },
};

