

DoohPreview = (function(){
        
    function constructor(doohId, ugcBgImageUrl, customizableObjects, userContent, cbOfConstructor){
        
        var templateMgr = null;
        var template = null;
        var doohPreviewCanvas = null;
        var context = null;
        
        /**
         * function to draw an image on a specific quadrilateral <br>
         * 
         * The implementation so far is a temporary one using a rotated rectangle approximate the quadrilateral 
         * @param context
         * @param imageUrl
         * @param quadrilateral an object consisting the coordinates of four corners of the quadrilateral
         *     <ul>
         *     <li>x_ul, y_ul: the coordinates of upper left corner
         *     <li>x_ur, y_ur: the coordinates of upper right corner
         *     <li>x_ll, y_ll: the coordinates of lower left corner
         *     <li>x_lr, y_lr: the coordinates of lower right corner
         *     </ul>
         * @param cbOfDrawQuadrilateralImage
         */
        var drawQuadrilateralImage = function( context, imageUrl, quadrilateral, cbOfDrawQuadrilateralImage ){
            var q = quadrilateral;
            var width = Math.sqrt( (q.x_ur-q.x_ul)*(q.x_ur-q.x_ul)+(q.y_ur-q.y_ul)*(q.y_ur-q.y_ul) );
            var height = Math.sqrt( (q.x_ll-q.x_ul)*(q.x_ll-q.x_ul)+(q.y_ll-q.y_ul)*(q.y_ll-q.y_ul) );
            var angle = Math.atan( (q.y_ur-q.y_ul)/(q.x_ur-q.x_ul) )/Math.PI*180;
            ugcUtility.drawImage(context, imageUrl, q.x_ul, q.y_ul, width, height, angle, cbOfDrawQuadrilateralImage);
        };
        
        
        var obj = {
            //==public services of DoohPreview==
            /**
             * Get the URL of DOOH preview image
             */
            getPreviewImageUrl: function() {
                return doohPreviewCanvas.toDataURL('image/png');
            }
        };
        
        async.series([
            function(callback){
                //TODO: read DOOH preview info
                callback(null);
            },
            function(callback){
                //initiate canvas related variables
                var bgImage = null;
                doohPreviewCanvas = document.createElement('canvas');
                doohPreviewCanvas.setAttribute("id","doohPreviewCanvas");
                
                context = doohPreviewCanvas.getContext('2d');
                context.webkitImageSmoothingEnabled = true;
                bgImage = new Image();
                bgImage.src = ugcBgImageUrl;
                bgImage.onload = function(){
                    console.log("bgImage.width="+bgImage.width+"  bgImage.height="+bgImage.height);
                    doohPreviewCanvas.width = bgImage.width;
                    doohPreviewCanvas.height = bgImage.height;
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
                //draw the customizable objects
                var imageUrl = null;
                var iteratorDrawCustomizalbeObjects = function(aCustomizableObject, cbOfIterator){
                    if (aCustomizableObject.type == "image"){
                        imageUrl = userContent.picture.urlOfCropped;
                        drawQuadrilateralImage( context, imageUrl, aCustomizableObject.quadrilateral, function(errOfDrawQuadrilateralImage){
                            cbOfIterator(errOfDrawQuadrilateralImage);
                        });
                    }
                    else if (aCustomizableObject.type == "thumbnail"){
                        imageUrl = userContent.thumbnail.url;
                        ugcUtility.drawChineseText( context, localStorage.fb_name, aCustomizableObject.fb_x, aCustomizableObject.fb_y, aCustomizableObject.width, aCustomizableObject.lineHeight, aCustomizableObject.fb_angle,aCustomizableObject.fb_color);
                        drawQuadrilateralImage( context, imageUrl, aCustomizableObject.quadrilateral, function(errOfDrawQuadrilateralImage){
                            if(aCustomizableObject.quadrilateral2){
                                drawQuadrilateralImage( context, imageUrl, aCustomizableObject.quadrilateral2, function(errOfDrawQuadrilateralImage){
                                    cbOfIterator(errOfDrawQuadrilateralImage);
                                });
                            }
                            else {
                                cbOfIterator(errOfDrawQuadrilateralImage);
                            }
                        });
                    }
                    else if (aCustomizableObject.type == "text"){
                        ugcUtility.drawChineseText( context, userContent.text, aCustomizableObject.x, aCustomizableObject.y, aCustomizableObject.width, aCustomizableObject.lineHeight, aCustomizableObject.angle,aCustomizableObject.text_color);
                        cbOfIterator(null);
                    }
                };
                async.eachSeries(customizableObjects, iteratorDrawCustomizalbeObjects, function(err){
                    if (!err) {
                        callback(null);
                    }
                    else {
                        callback('Failed to draw the customizable objects: '+err);
                    }
                });
            },
            function(callback){
                //draw the fence 
                callback(null);
            }
        ],
        function(err, results){
            if (!err) {
                cbOfConstructor(null, obj);
            }
            else {
                cbOfConstructor('Failed to initiate an DoohPreview object', null);
            }
        });
    }
    
    
    return {
        /**
         * Get an instance of DoohPreview
         * 
         * @param doohId
         * @param ugcBgImageUrl
         * @param customizableObjects
         * @param userContent
         * @param cbOfgetInstance
         * @returns
         */
        getInstance: function(doohId, ugcBgImageUrl, customizableObjects, userContent, cbOfgetInstance){
                constructor(doohId, ugcBgImageUrl, customizableObjects, userContent, function(err, _uInstance){
                    cbOfgetInstance(err, _uInstance);
                });
        }
    };
})();
