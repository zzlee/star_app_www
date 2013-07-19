

ImageUgc = (function(){
		
	function constructor(mainTemplateId, subTemplateId, userContent, cb_constructor){
		
		//object's private members		
		var templateMgr = null;
		var template = null;
		var ugcCanvas = null;
		var context = null;
		var bgImage = null;
		
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
                
				 
                $.ajax( starServerURL+"/miix/base64_image_ugcs/"+ugcProjectId, {
					type: "PUT",
                    data: {
                        imgBase64: reultURI,
                        ownerId: ugcInfo.ownerId._id,
                        ownerFbUserId: ugcInfo.ownerId.fbUserId,
                        contentGenre: ugcInfo.contentGenre,
                        title: ugcInfo.title,
                        time: (new Date()).getTime()
                    },
                    success: function(data, textStatus, jqXHR ){
						if (cbOfUploadToServer){
							cbOfUploadToServer(null, data);
						}
					},
					error: function(jqXHR, textStatus, errorThrown){
						if (cbOfUploadToServer){
							cbOfUploadToServer(errorThrown, null);
						}
					}
                });
			}
		};
		
		async.series([
			function(callback){
			    //get templateMgr
				TemplateMgr.getInstance(function(err, _templateMgr){
					if (!err) {
						templateMgr = _templateMgr;
						template = templateMgr.getSubTemplate(mainTemplateId, subTemplateId);
						callback(null);
					}
					else {
						callback('Failed to get TemplateMgr instance');
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
				//draw all the customizable objects
				var iteratorDrawCustomizalbeObjects = function(aCustomizableObject, cbOfIterator){
					if (aCustomizableObject.type == "image"){
						var imageUrl = null;
						if (aCustomizableObject.id == "thumbnail"){
							imageUrl = userContent.thumbnail.url;
						}
						else {
							imageUrl = userContent.picture.urlOfCropped;
						}
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
		/**
		 * Get an instance of ImgaeUgc
		 * 
		 * @param {String} mainTemplateId
		 * @param {String} subTemplateId
		 * @param {Object} userContent An object describing user's content
		 *     <ul>
		 *     <li>text: text content
		 *     <li>picture: object
		 *         <ul>
		 *         <li>urlOfOriginal: the URL of the original picture that the user chooses
		 *         <li>urlOfCropped: the URL of the picture that the user crops. (It is normally a base64 string got from canvas.toDataURL() )
		 *         <li>crop: an object describing the cropped area
		 *             <ul>
		 *             <li>_x: _x=x_crop/width_picture
		 *             <li>_y: _y=y_crop/height_picture
		 *             <li>_w: _w=width_crop/width_picture
		 *             <li>_h: _h=height_crop/height_picture
		 *             </ul>
		 *         </ul>
		 *     <li>thumbnail: object
		 *         <ul>
		 *         <li>url: the URL of thumbnail
		 *         </ul>
		 *     </ul>
		 * @param {Function} cbOfGetInstance The callback function with the signature cbOfGetInstance (err, uInstance):
		 *     <ul>
		 *     <li>err: error message if any
		 *     <li>instance: instance of ImgaeUgc
		 *     </li>
		 */
		getInstance: function(mainTemplateId, subTemplateId, userContent, cbOfGetInstance){
			constructor(mainTemplateId, subTemplateId, userContent, function(err, instance){
				cbOfGetInstance(err, instance);
			});
		}
	};
})();

