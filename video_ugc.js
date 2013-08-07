VideoUgc = (function(){
    
    function constructor(mainTemplateId, subTemplateId, cbOfConstructor){
        
        //object's private members		
        var templateMgr = null;
        var template = null;
        var customizableObjects = [];
        var customizableObjectDimensions = {};
        var ugcProjectId = null;
        
        var obj = {
            //==public services of VideoUgc==
            /**
             * Get the preview image from Server (generated by AE)
             */
            getPreviewImage: function(cbOfGetPreviewImage){
                
            },
            
            /**
             * Ask AE server (via main server) to render Miix video
             * 
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
             * @param ugcInfo
             * @param cbOfAskServerToGenerate
             */
            askServerToGenerate: function(userContent, ugcInfo, cbOfAskServerToGenerate){
                ugcProjectId = mainTemplateId +'-'+ ugcInfo.ownerId._id +'-'+ (new Date()).toISOString().replace(/[-:.]/g, "");
                var imageUri = userContent.picture.urlOfOriginal;
                var imageFileName = imageUri.substr(imageUri.lastIndexOf('/')+1);
                async.series([
                    function(callback){
                        //upload original image user content file to server
                        var options = new FileUploadOptions();
                        options.fileKey = "file";
                        options.fileName = imageFileName;
                        options.mimeType = "image/jpeg"; //TODO: to have mimeType customizable? 
                        options.chunkedMode = true;
                        
                        var ImageCustomizableObjectId = null;
                        for (var i=0;i<customizableObjects.length;i++){
                            if (customizableObjects[i].format == "image"){
                                ImageCustomizableObjectId = customizableObjects[i].ID;
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
                        params.obj_OriginalWidth = customizableObjectDimensions[ImageCustomizableObjectId].width;
                        params.obj_OriginalHeight = customizableObjectDimensions[ImageCustomizableObjectId].height;
                        
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
                            callback(null);
                        };
                        
                        var uploadFail_cb = function(error) {
                            console.log("upload error source " + error.source);
                            console.log("upload error target " + error.target);
                            callback("Failed to uplaod user content file to server: "+error.code);
                        };
                        
                        ft.upload(imageUri, starServerURL+"/miix/videos/user_content_files", uploadSuccess_cb, uploadFail_cb, options);
                    },
                    function(callback){
                        //ask server to render the Miix vidoe
                        /*
                        var userContentDescription = {};
                        userContentDescription.projectID = ugcProjectId;
                        //userContentDescription.templateID = templateID; //not used in server side
                        //userContentDescription.userName = userName;  //not used in server side
                        userContentDescription.ownerID = ugcInfo.ownerId._id;
                        userContentDescription.ownerFbUserID = ugcInfo.ownerId.fbUserId;
                        userContentDescription.customizableObjects = JSON.stringify(customizableObjects);
                        userContentDescription.timeStamp = (new Date()).toISOString(); //only for avoiding Safari's cache mechanism
                        */
                        
                        customizableObjects[0].content = imageFileName; //TODO: anything better than hard coding here ?
                        
                        $.ajax( starServerURL+"/miix/video_ugcs/"+ugcProjectId, {
                            type: "PUT",
                            data: {
                                ownerId: ugcInfo.ownerId._id,		                        
                                ownerFbUserId: ugcInfo.ownerId.fbUserId,
                                contentGenre: mainTemplateId,
                                //contentGenre: "greeting",  //TODO: for test. Need to change back
                                title: ugcInfo.title,
                                customizableObjects: JSON.stringify(customizableObjects),
                                time: (new Date()).toISOString() //only for avoiding Safari's cache mechanism
                            },
                            success: function(data, textStatus, jqXHR ){
                                callback(null);
                            },
                            error: function(jqXHR, textStatus, errorThrown){
                                callback(errorThrown);
                            }
                        });
                        
                    }
                ],
                function(err, results){
                    if (cbOfAskServerToGenerate) {
                        cbOfAskServerToGenerate(err, results);
                    }
                });
                
            }
        }; //end of obj
        
        async.series([
            function(callback){
                //get templateMgr & template
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
                //get customizable objects info
                $.ajax({
                    url: templateMgr.getTemplateFolderPath()+'/'+mainTemplateId+'/'+subTemplateId+'/template_customizable_object_list.xml',
                    dataType: 'xml',
                    success: function(xmlDoc){
                        var customizableObjectsXml = xmlDoc.getElementsByTagName("customizable_object");
                    
                    for (var i=0; i<customizableObjectsXml.length; i++) {
                        var objID = customizableObjectsXml[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
                        var objFormat = customizableObjectsXml[i].getElementsByTagName("format")[0].childNodes[0].nodeValue;
                        var objDescription = customizableObjectsXml[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
                        var objKeyFrame = customizableObjectsXml[i].getElementsByTagName("key_frame")[0].childNodes[0].nodeValue;
                        
                        customizableObjectDimensions[objID] = {
                            width: customizableObjectsXml[i].getElementsByTagName("original_width")[0].childNodes[0].nodeValue,
                            height: customizableObjectsXml[i].getElementsByTagName("original_height")[0].childNodes[0].nodeValue 
                        };
                        
                        customizableObjects[i]={
                            ID: objID,
                            format: objFormat,
                            description: objDescription,
                            keyFrame: objKeyFrame
                        };
                        
                    }
                    
                    callback(null);
    },
                    error: function(jqXHR, textStatus, errorThrown){
                        callback("Failed to read template_customizable_object_list.xml"+ errorThrown);
                    }
                });
            }
        ],
        function(err, results){
            if (!err) {
                cbOfConstructor(null, obj);
            }
            else {
                cbOfConstructor('Failed to initiate an VideoUgc object: '+err, null);
            }
        });

        
    }//end of constructor
    
    return {
        /**
         * Get an instance of ImgaeUgc
         * 
         * @param {String} mainTemplateId
         * @param {String} subTemplateId
         * @param {Function} cbOfGetInstance The callback function with the signature cbOfGetInstance (err, uInstance):
         *     <ul>
         *     <li>err: error message if any
         *     <li>instance: instance of ImgaeUgc
         *     </li>
         */
        getInstance: function(mainTemplateId, subTemplateId, cbOfGetInstance){
            constructor(mainTemplateId, subTemplateId, function(err, instance){
                cbOfGetInstance(err, instance);
            });
        }
    };
})();