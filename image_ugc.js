

ImageUgc = (function(){
		
	function constructor(mainTemplateId, subTemplateId, userContent, cb_constructor){
		
		//object's private members		
		var templateMgr = null;
		var template = null;
		var ugcCanvas = null;
		var context = null;
		var bgImage = null;
		var customizableObjects = [];
		
		
		var drawChineseText = function( text, x, y, maxWidth, lineHeight, angle) {
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
            context.font = '30px 華康歐陽詢體W5';
		
			for(var n = 0; n < words.length; n++) {
				var testLine = line + words[n];
				var metrics = context.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > maxWidth && n > 0) {
					context.fillText(line, cursorX, cursorY);
					line = words[n];
					cursorY += lineHeight;
				}
				else {
					line = testLine;
				}
			}
			context.fillText(line, cursorX, cursorY);
			context.restore();
		};
		
		var drawImage = function(imageUrl, x, y, width, height, angle, cbOfDrawImage){
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

		var obj = {
			//==public services of ImageUgc==
			/**
			 * Get the url of this image UGC
			 */
			getImageUrl: function(){
				return ugcCanvas.toDataURL('image/png');
			},
			
			/**
			 * Upload the UGC to server
			 * 
			 * @param ugcProjectId
			 * @param ugcInfo
			 * @param cbOfUploadToServer
			 */
			uploadToServer:function(ugcProjectId, ugcInfo, cbOfUploadToServer){
				var reultURI = ugcCanvas.toDataURL('image/png').replace('image/octet-stream');
                
				async.series([
                    function(callback){
                        //upload original image user content file to server if there is one
                        var iterator = function(aCustomizableObject, cbOfIterator) {
                            if ((aCustomizableObject.type=="image") || (aCustomizableObject.type=="video") ) { 
                                var options = new FileUploadOptions();
                                options.fileKey = "file";
                                options.fileName = aCustomizableObject.content;
                                options.mimeType = "image/jpeg"; //TODO: to have mimeType customizable? 
                                options.chunkedMode = true;
                                
                                var templateCustomizableObjects = template.customizableObjects;
                                var imageCustomizableObjectWidth = null;
                                var imageCustomizableObjectHeight = null;
                                for (var i=0;i<templateCustomizableObjects.length;i++){
                                    if (templateCustomizableObjects[i].type == "image"){
                                        imageCustomizableObjectWidth = templateCustomizableObjects[i].width;
                                        imageCustomizableObjectHeight = templateCustomizableObjects[i].height;
                                        break;
                                    }
                                }
                                
                                var params = new Object();
                                params.projectID = ugcProjectId; //for server side to save user content to specific project folder
                                //for server side to crop the user content image
                                params.croppedArea_x = userContent.picture.crop._x;
                                params.croppedArea_y = userContent.picture.crop._y;
                                params.croppedArea_width = userContent.picture.crop._w;
                                params.croppedArea_height = userContent.picture.crop._h;
                                //for server side to zoom the user content image to the same size as original footage image
                                params.obj_OriginalWidth = imageCustomizableObjectWidth;
                                params.obj_OriginalHeight = imageCustomizableObjectHeight;
                                
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
                                
                                var uploadSuccess_cb = function(r) {
                                    cbOfIterator(null);
                                };
                                
                                var uploadFail_cb = function(error) {
                                    console.log("upload error source " + error.source);
                                    console.log("upload error target " + error.target);
                                    cbOfIterator("Failed to uplaod user content file to server: "+error.code);
                                };
                                
                                ft.upload(userContent.picture.urlOfOriginal, starServerURL+"/miix/videos/user_content_files", uploadSuccess_cb, uploadFail_cb, options);
                            }
                            else {
                                cbOfIterator(null);
                            }
                        }
                        async.eachSeries(customizableObjects, iterator, function(errOfEachSeries){
                            callback(errOfEachSeries);
                        });
                        
                    },
				    function(callback){
				        //upload result image UGC to server
				        $.ajax( starServerURL+"/miix/base64_image_ugcs/"+ugcProjectId, {
		                    type: "PUT",
		                    data: {
		                        imgBase64: reultURI,
		                        ownerId: ugcInfo.ownerId._id,
		                        ownerFbUserId: ugcInfo.ownerId.fbUserId,
		                        contentGenre: ugcInfo.contentGenre,
		                        title: ugcInfo.title,
		                        customizableObjects: JSON.stringify(customizableObjects),
		                        time: (new Date()).getTime()
		                    },
		                    success: function(data, textStatus, jqXHR ){
		                        console.log("Successfully upload result image UGC to server.");
		                        callback(null);
		                    },
		                    error: function(jqXHR, textStatus, errorThrown){
		                        console.log("Failed to upload image UGC to server: "+errorThrown);
		                        callback("Failed to upload image UGC to server: "+errorThrown);
		                    }
		                });
				    }
			    ],
		        function(err, results){
				    if (cbOfUploadToServer){
                        cbOfUploadToServer(err, results);
                    }
		        });
				
                
			}
			//==end of public services of ImageUgc==
		};
		
		async.series([
			function(callback){
			    //get templateMgr
				TemplateMgr.getInstance(function(err, _templateMgr){
                    var userContentUri = null;
                    var userContentFileName = null;
					if (!err) {
						templateMgr = _templateMgr;
						template = templateMgr.getSubTemplate(mainTemplateId, subTemplateId);
						var templateCustomizableObjects = template.customizableObjects;
						for (var i=0;i<templateCustomizableObjects.length;i++){
						    customizableObjects[i] = {
						            id: templateCustomizableObjects[i].id,
						            type: templateCustomizableObjects[i].type
						    };
						    if (customizableObjects[i].type == "text"){
						        customizableObjects[i].content = userContent.text;
						    }
						    else if (customizableObjects[i].type == "image"){
						        userContentUri = userContent.picture.urlOfOriginal;
						        if (userContentUri){
						            userContentFileName = userContentUri.substr(userContentUri.lastIndexOf('/')+1);
						        }
                                customizableObjects[i].content = userContentFileName;
                            }
						}
						callback(null, obj);
					}
					else {
						callback('Failed to get TemplateMgr instance', null);
					}
				});
			},
			function(callback){
				//initiate canvas related variables
				ugcCanvas = document.createElement('canvas');
				ugcCanvas.setAttribute("id","ugcCanvas");
				
				context = ugcCanvas.getContext('2d');
				context.webkitImageSmoothingEnabled = true;
				bgImage = new Image();
				bgImage.src = templateMgr.getTemplateFolderPath()+'/'+mainTemplateId+'/'+subTemplateId+'/'+template.backgroundImageUrl;
				bgImage.onload = function(){
					ugcCanvas.width = bgImage.width;
					ugcCanvas.height = bgImage.height;
					context.drawImage(bgImage,0,0);
					callback(null);
				};
				bgImage.onerror = function(){
					callback("Failed to load the background image "+imageUrl);
				};
				bgImage.onabort = function(){
					callback("Failed to load the background image "+imageUrl+" (aborted)");
				};
			},
			function(callback){
			    var imageUrl = null;
				var iteratorDrawCustomizalbeObjects = function(aCustomizableObject, cbOfIterator){
					if (aCustomizableObject.type == "image"){
						imageUrl = userContent.picture.urlOfCropped;
						drawImage(imageUrl, aCustomizableObject.x, aCustomizableObject.y, aCustomizableObject.width, aCustomizableObject.height, aCustomizableObject.angle, function(errOfDrawImage){
							cbOfIterator(errOfDrawImage);
						});
					}
					else if (aCustomizableObject.type == "thumbnail"){
                        imageUrl = userContent.thumbnail.url;
                        drawImage(imageUrl, aCustomizableObject.x, aCustomizableObject.y, aCustomizableObject.width, aCustomizableObject.height, aCustomizableObject.angle, function(errOfDrawImage){
                            cbOfIterator(errOfDrawImage);
                        });
                    }
					else if (aCustomizableObject.type == "text"){
						drawChineseText( userContent.text, aCustomizableObject.x, aCustomizableObject.y, aCustomizableObject.width, aCustomizableObject.lineHeight, aCustomizableObject.angle);
						cbOfIterator(null);
					}
				};
				async.eachSeries(template.customizableObjects, iteratorDrawCustomizalbeObjects, function(err){
					if (!err) {
						callback(null);
					}
					else {
						callback('Failed to draw the customizable objects: '+err);
					}
				});
			}
		],
		function(err, results){
			if (!err) {
				cb_constructor(null, obj);
			}
			else {
				cb_constructor('Failed to initiate an ImageUgc object', null);
			}
		});

		
		
		
		
	}
	
	return {
		getInstance: function(mainTemplateId, subTemplateId, userContent, got_cb){
				constructor(mainTemplateId, subTemplateId, userContent, function(err, _uInstance){
					got_cb(err, _uInstance);
				});
		}
	};
})();

