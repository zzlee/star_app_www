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
                
                ctx.save();
                ctx.translate(775,22);
                ctx.rotate(10.36*Math.PI/180);
                ctx.drawImage(objImage,0,0,240, 180);
                ctx.restore();
                
                ctx.save();
                ctx.translate(885,22);
                ctx.drawImage(objImage,0,0,240, 180);
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

