FmMobile.moviePreviewPg = {
	//  Page constants.
    PAGE_ID: "moviePreviewPg",
    
    //  Page methods.
    show: function(){
        FmMobile.analysis.trackPage("/moviePreviewPg");
        recordUserAction("enters moviePreviewPg");
    },
        
    load: function(event, data){
        
        //var templateID = "rotate"; //TODO: pass a parameter to set
        //var customizableObjectToPreview = "map" //TODO: pass a parameter to set
        var templateID = "miixcard"; //TODO: pass a parameter to set
        var templateID = "greeting"; //TODO: pass a parameter to set
        var customizableObjectToPreview = "greeting_photo" //TODO: pass a parameter to set
        var templatePreviewKeyFrames = new Array();
        var actualWidth, actualHeight;
        
        //for test
        var cornerImg = new Image();
        cornerImg.src = "./img/_corner.png";
        
        
        //$('#divStatus').html("照片上傳中，成功後即開始影像合成，合成完成後會通知您去分享給朋友！"); //for test
        
        $('#divStatus').hide();
        $('#photoSubmitButtons').show();
        
        
        
        var renderPreviewKeyFrames = function() {
            
            
            var previewWidth = window.innerWidth;
            var previewHeight = previewWidth * actualHeight/actualWidth;
            var imglist;
            var previewBg;
            
            //$("#moviePreviewArea").css({"position":"static", "height":(previewHeight+20).toString()+"px"});
            
            
            //for test
            var vertices;
            var indices;
            var uvtData;
            
            var imgData = new Array();
            for (var i=0; i<templatePreviewKeyFrames.length; i++) {
                var anImgDataItem = {name:"frame_"+String(i),path:'./template/'+templateID+'/'+templatePreviewKeyFrames[i].BgSource};
                imgData.push(anImgDataItem);
            }
            
            imgData.push( {name:"customizableObj",path:photoCroppedURI} );
            
            //for test
            imgData.push( {name:"marker",path:"./img/_corner.png"} );
            
            
            var previewInit = function(result) {
                LGlobal.setDebug(true);
                imglist = result;
                
                
                var previewImgActualWidth = imglist["frame_0"].width;
                //var previewImgActualHeight = imglist["frame_0"].height;
                var r = previewWidth/actualWidth; //the zooming factor
                var r_previewImg = previewWidth/previewImgActualWidth; //the zooming factor with respect to actual preview image
                
                var customizableObjWidth = imglist["customizableObj"].width;
                var customizableObjHeight = imglist["customizableObj"].height;
                
                var markerUL, markerUR, markerLL, markerLR, markerC, markerUp, markerLow, markerL, markerR;
                var P_UL, P_UR, P_LL, P_LR, P_C, P_Up, P_Low, P_L, P_R;
                var P_UL_r, P_UR_r, P_LL_r, P_LR_r, P_C_r, P_Up_r, P_Low_r, P_L_r, P_R_r; //points with coordinates relative to Upper Left corner
                
                //bitmapData = new LBitmapData(imglist["frame_0"]);
                for (var i=0; i<templatePreviewKeyFrames.length; i++) {
                    templatePreviewKeyFrames[i].bitmapData = new LBitmapData(imglist["frame_"+String(i)]);
                }
                //for test
                var markerBitmapData = new LBitmapData(imglist["marker"]);
                var customizableObjBitmapData = new LBitmapData(imglist["customizableObj"]);
                var customizableObjImage;
                
                /*
                 previewBg = new LBitmap(bitmapData);
                 var r = previewWidth/imglist["frame_0"].width; //the zooming facotr
                 previewBg.scaleX = r;
                 previewBg.scaleY = r;
                 addChild(previewBg);
                 */
                
                
                
                var k = 0;
                var l;
                
                var onFrame = function(){
                    previewBg.graphics.clear();
                    previewBg.graphics.beginBitmapFill(templatePreviewKeyFrames[k].bitmapData);
                    previewBg.graphics.drawRect(1,"#000",[0,0,actualWidth,actualHeight]);
                    
                    l = (k-1)%templatePreviewKeyFrames.length; //5 frames lag??
                    if (l < 0 ) {
                        l += templatePreviewKeyFrames.length;
                    }
                    
                    P_UL = new Point( templatePreviewKeyFrames[l].Obj_UL_x*r, templatePreviewKeyFrames[l].Obj_UL_y*r );
                    P_UR = new Point( templatePreviewKeyFrames[l].Obj_UR_x*r, templatePreviewKeyFrames[l].Obj_UR_y*r );
                    P_LL = new Point( templatePreviewKeyFrames[l].Obj_LL_x*r, templatePreviewKeyFrames[l].Obj_LL_y*r );
                    P_LR = new Point( templatePreviewKeyFrames[l].Obj_LR_x*r, templatePreviewKeyFrames[l].Obj_LR_y*r );
                    /*
                     P_C = getDiagonalIntersection( new Point(markerUL.x,markerUL.y), new Point(markerUR.x, markerUR.y),
                     new Point(markerLL.x, markerLL.y), new Point(markerLR.x, markerLR.y) );
                     */
                    P_Up = getMidPoint(P_UL, P_UR);
                    P_Low = getMidPoint(P_LL, P_LR);
                    P_L = getMidPoint(P_UL, P_LL);
                    P_R = getMidPoint(P_UR, P_LR);
                    P_C = getMidPoint(P_Up, P_Low);
                    
                    P_UL_r = new Point(0, 0);
                    P_UR_r = P_UR.relativeTo( P_UL );
                    P_LL_r = P_LL.relativeTo( P_UL );
                    P_LR_r = P_LR.relativeTo( P_UL );
                    P_C_r = P_C.relativeTo( P_UL );
                    P_Up_r = P_Up.relativeTo( P_UL );
                    P_Low_r = P_Low.relativeTo( P_UL );
                    P_L_r = P_L.relativeTo( P_UL );
                    P_R_r = P_R.relativeTo( P_UL );
                    
                    customizableObjImage.x = P_UL.x;
                    customizableObjImage.y = P_UL.y;
                    
                    vertices = [P_UL_r.x, P_UL_r.y, P_L_r.x, P_L_r.y, P_LL_r.x, P_LL_r.y,
                                P_Up_r.x, P_Up_r.y, P_C_r.x, P_C_r.y, P_Low_r.x, P_Low_r.y,
                                P_UR_r.x, P_UR_r.y, P_R_r.x, P_R_r.y, P_LR_r.x, P_LR_r.y];
                    customizableObjImage.graphics.clear();
                    customizableObjImage.graphics.beginBitmapFill(customizableObjBitmapData);
                    customizableObjImage.graphics.drawTriangles(vertices, indices, uvtData);
                    
                    /*
                     //for test
                     markerUL.x = P_UL.x-10;
                     markerUL.y = P_UL.y-10;
                     markerUR.x = P_UR.x-10;
                     markerUR.y = P_UR.y-10;
                     markerLL.x = P_LL.x-10;
                     markerLL.y = P_LL.y-10;
                     markerLR.x = P_LR.x-10;
                     markerLR.y = P_LR.y-10;
                     markerC.x = P_C.x-10;
                     markerC.y = P_C.y-10;
                     markerUp.x = P_Up.x-10;
                     markerUp.y = P_Up.y-10;
                     markerLow.x = P_Low.x-10;
                     markerLow.y = P_Low.y-10;
                     markerL.x = P_L.x-10;
                     markerL.y = P_L.y-10;
                     markerR.x = P_R.x-10;
                     markerR.y = P_R.y-10;
                     */
                    
                    
                    
                    k++;
                    if ( k >= templatePreviewKeyFrames.length ) {
                        k = 0;
                    }
                }
                
                
                previewBg = new LSprite();
                addChild(previewBg);
                previewBg.scaleX = r_previewImg;
                previewBg.scaleY = r_previewImg;
                
                /*
                 //for test
                 markerUL = new LBitmap(markerBitmapData);
                 markerUR = new LBitmap(markerBitmapData);
                 markerLL = new LBitmap(markerBitmapData);
                 markerLR = new LBitmap(markerBitmapData);
                 markerC = new LBitmap(markerBitmapData);
                 markerUp = new LBitmap(markerBitmapData);
                 markerLow = new LBitmap(markerBitmapData);
                 markerL = new LBitmap(markerBitmapData);
                 markerR = new LBitmap(markerBitmapData);
                 addChild(markerUL);
                 addChild(markerUR);
                 addChild(markerLL);
                 addChild(markerLR);
                 addChild(markerC);
                 addChild(markerUp);
                 addChild(markerLow);
                 addChild(markerL);
                 addChild(markerR);
                 */
                
                indices = new Array();
                //这里用之前的6个点将图形分成4个三角形
                indices.push(0, 3, 1);
                indices.push(3, 1, 4);
                indices.push(1, 4, 2);
                indices.push(4, 2, 5);
                indices.push(3, 6, 4);
                indices.push(6, 4, 7);
                indices.push(4, 7, 5);
                indices.push(7, 5, 8);
                uvtData = new Array();
                //这里是定义6各点原来应在的位置
                uvtData.push(0, 0);
                uvtData.push(0, 0.5);
                uvtData.push(0, 1);
                uvtData.push(0.5, 0);
                uvtData.push(0.5, 0.5);
                uvtData.push(0.5, 1);
                uvtData.push(1, 0);
                uvtData.push(1, 0.5);
                uvtData.push(1, 1);
                
                var customizableObjImage = new LSprite();
                addChild(customizableObjImage);
                //previewBg.addChild(customizableObjImage);
                
                
                previewBg.addEventListener(LEvent.ENTER_FRAME,onFrame);
                $("#moviePreview").bind("stopPreviewAnimation", function(e){
                                        previewBg.removeEventListener(LEvent.ENTER_FRAME,onFrame);
                                        });
                
                
                var onHide = function(){
                    previewBg.removeEventListener(LEvent.ENTER_FRAME, onFrame);
                    removeChild(previewBg);
                    removeChild(customizableObjImage);
                    $("#moviePreview").empty();
                    
                };
                
                $("#moviePreviewPg").live("pagehide", onHide);
                
                
                
            }
            
            var main = function() {
                LLoadManage.load(imgData,null,previewInit);
            }
            
            init(250,"moviePreview",previewWidth,previewHeight,main,LEvent.INIT);
        }
        
        var getTemplatePreviewKeyFrames_cb = function(xmlDoc) {
            
            //read preview key frame info from [customizable object ID].xml
            var templatePreviewKeyFramesXml = xmlDoc.getElementsByTagName("preview_key_frame");
            var numberOftemplatePreviewKeyFrames = templatePreviewKeyFramesXml.length;
            for (var i=0; i<numberOftemplatePreviewKeyFrames; i++) {
                var aTemplatePreviewKeyFrame;
                if ( templatePreviewKeyFramesXml[i].getElementsByTagName("overlaid_customizable_object")[0] ) {
                    aTemplatePreviewKeyFrame={
                    BgSource: templatePreviewKeyFramesXml[i].getElementsByTagName("source")[0].childNodes[0].nodeValue,
                    Obj_UL_x: templatePreviewKeyFramesXml[i].getElementsByTagName("upper_left_corner_x")[0].childNodes[0].nodeValue,
                    Obj_UL_y: templatePreviewKeyFramesXml[i].getElementsByTagName("upper_left_corner_y")[0].childNodes[0].nodeValue,
                    Obj_UR_x: templatePreviewKeyFramesXml[i].getElementsByTagName("upper_right_corner_x")[0].childNodes[0].nodeValue,
                    Obj_UR_y: templatePreviewKeyFramesXml[i].getElementsByTagName("upper_right_corner_y")[0].childNodes[0].nodeValue,
                    Obj_LL_x: templatePreviewKeyFramesXml[i].getElementsByTagName("lower_left_corner_x")[0].childNodes[0].nodeValue,
                    Obj_LL_y: templatePreviewKeyFramesXml[i].getElementsByTagName("lower_left_corner_y")[0].childNodes[0].nodeValue,
                    Obj_LR_x: templatePreviewKeyFramesXml[i].getElementsByTagName("lower_right_corner_x")[0].childNodes[0].nodeValue,
                    Obj_LR_y: templatePreviewKeyFramesXml[i].getElementsByTagName("lower_right_corner_y")[0].childNodes[0].nodeValue
                    };
                }
                else {
                    aTemplatePreviewKeyFrame={
                    BgSource: templatePreviewKeyFramesXml[i].getElementsByTagName("source")[0].childNodes[0].nodeValue,
                    Obj_UL_x: 0,
                    Obj_UL_y: 0,
                    Obj_UR_x: 0,
                    Obj_UR_y: 0,
                    Obj_LL_x: 0,
                    Obj_LL_y: 0,
                    Obj_LR_x: 0,
                    Obj_LR_y: 0
                    };
                    
                }
                templatePreviewKeyFrames.push(aTemplatePreviewKeyFrame);
            }
            
            renderPreviewKeyFrames();
        }
        
        var getTemplateDescription_cb = function(xmlDoc) {
            actualWidth  = xmlDoc.getElementsByTagName("composition_width")[0].childNodes[0].nodeValue;
            actualHeight = xmlDoc.getElementsByTagName("composition_height")[0].childNodes[0].nodeValue;
            
            
            $.ajax({
                   url: './template/'+templateID+'/preview_keyframe_des_'+customizableObjectToPreview+'.xml',
                   dataType: 'xml',
                   success: getTemplatePreviewKeyFrames_cb
                   });
        }
        
        //get cropped image
        
        croppedArea = myPhotoCropper.getCroppedArea();
        var rawPhotoImg = new Image();
        rawPhotoImg.src = fileProcessedForCropperURI;
        rawPhotoImg.onload = function(){
            var sourceCanvas = document.createElement("canvas");
            var sourceCanvasContext = sourceCanvas.getContext("2d");
            sourceCanvas.width = rawPhotoImg.width;
            sourceCanvas.height = rawPhotoImg.height;
            sourceCanvasContext.drawImage(rawPhotoImg, 0, 0);
            //console.dir(tempCanvas);
            var destinationCanvas = document.createElement("canvas");
            var destinationCanvasContext = destinationCanvas.getContext("2d");
            destinationCanvas.width = rawPhotoImg.width*croppedArea.width;
            destinationCanvas.height = rawPhotoImg.height*croppedArea.height;
            destinationCanvasContext.drawImage(sourceCanvas,
                                               rawPhotoImg.width*croppedArea.x,
                                               rawPhotoImg.height*croppedArea.y,
                                               rawPhotoImg.width*croppedArea.width,
                                               rawPhotoImg.height*croppedArea.height,
                                               0, 0,
                                               destinationCanvas.width,
                                               destinationCanvas.height);
            
            photoCroppedURI = destinationCanvas.toDataURL();
            $.mobile.changePage("movie_preview.html");
        }
                
        
        $.ajax({
               url: './template/'+templateID+'/template_description.xml',
               dataType: 'xml',
               success: getTemplateDescription_cb
               });
        
        
        
        
    },
        
    onDoAgainBtnClick: function() {
        
        $.mobile.changePage("movie_create.html");
        FmMobile.analysis.trackEvent("Button", "Click", "DoAgain", 24);
        
    },
        
    onSubmitBtnClick: function() {
        var uploadFail_cb = function(error) {
            //$('#divStatus').html('檔案無法上傳伺服器，請待網路狀況好時再重試！');
            /*
             navigator.notification.alert(
             '喔喔！上傳失敗了。您的網路OK嗎？',  // message
             function(){$('#submitPhotoBtn').click();},         // callback
             ' ',            // title
             '重新上傳'                  // buttonName
             ); */
            
            var onConfirm = function(buttonIndex) {
                switch(buttonIndex) {
                    case 1:
                        $('#submitPhotoBtn').click();
                        break;
                    case 2:
                        $.mobile.changePage("my_video.html");
                        break;
                }
            }
            navigator.notification.confirm(
                                           '喔喔！上傳失敗了。您的網路OK嗎？',  // message
                                           onConfirm,              // callback to invoke with index of button pressed
                                           ' ',            // title
                                           '重新上傳,以後再玩'          // buttonLabels
                                           );
            
        }
        
        
        var uploadSuccess_cb = function(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            
            //$('#divStatus').html("檔案上傳成功！");
            
            customizedContent.customizableObjects[0].content = fileSelected;
            
            //$('#div'+fileObjectID).html(fileSelected);
            /*
             customizableObjects[event.data.objectIndex].content = fileSelected;
             itemContentIsReady[event.data.objectIndex] = true;
             
             var allItemContentAreReady = true;
             for (var i=0; i<itemContentIsReady.length; i++) {
             allItemContentAreReady = allItemContentAreReady && itemContentIsReady[i];
             }
             if ( allItemContentAreReady ) {
             $('#movieCreatePgFooter').show();
             }
             */
            
            customizedContent.timeStamp = (new Date()).toISOString();
            
            
            $.post(starServerURL+'/miix/videos/user_content_description', customizedContent, function(result){
                   console.dir("upload user data info result: "+result);
                   if ( !result.err ) {
                   FmMobile.addProcessingWork(projectID);
                   $.mobile.hidePageLoadingMsg();
                   $.mobile.changePage("my_video.html");
                   
                   }
                   })
            .error(function() {
                   /*
                    navigator.notification.alert(
                    '喔喔！上傳失敗了。您的網路OK嗎？',  // message
                    function(){$('#submitPhotoBtn').click();},         // callback
                    ' ',            // title
                    '重新上傳'                  // buttonName
                    );*/
                   var onConfirm = function(buttonIndex) {
                   switch(buttonIndex) {
                   case 1:
                   $('#submitPhotoBtn').click();
                   break;
                   case 2:
                   $.mobile.changePage("my_video.html");
                   break;
                   }
                   }
                   navigator.notification.confirm(
                                                  '喔喔！上傳失敗了。您的網路OK嗎？',  // message
                                                  onConfirm,              // callback to invoke with index of button pressed
                                                  ' ',            // title
                                                  '重新上傳,以後再玩'          // buttonLabels
                                                  );
                   });
        }
        
        
        var uploadPhoto = function (imageURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
            fileSelected = options.fileName;
            options.mimeType = "image/jpeg";
            //options.mimeType = "image/png";
            options.chunkedMode = true;
            
            var params = new Object();
            params.fileObjectID = fileObjectID;
            params.projectID = projectID;
            params.croppedArea_x = croppedArea.x;
            params.croppedArea_y = croppedArea.y;
            params.croppedArea_width = croppedArea.width;
            params.croppedArea_height = croppedArea.height;
            params.obj_OriginalWidth = customizableObjectDimensions[fileObjectID].width;
            params.obj_OriginalHeight = customizableObjectDimensions[fileObjectID].height;
            params.osVersion = "iOS_"+device.version;
            
            
            console.log('[uploadPhoto()] params.projectID = %s', params.projectID);
            console.log('[uploadPhoto()] params.fileObjectID = %s', params.fileObjectID);
            
            
            options.params = params;
            options.chunkedMode = true;
            
            var ft = new FileTransfer();
            
            /*
             $("div").bind(ProjectID+"__uploadFile", function(e, _uploadPercentage){
             var uploadPercentageString = ( Math.floor(_uploadPercentage*100) ).toString();
             $('#divStatus').html("檔案上傳%"+uploadPercentageString+"...");
             console.log("_uploadPercentage= "+_uploadPercentage);
             });
             */
            
            //var upladBar = uploadingMgr.addUpload(projectID);
            
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    var uploadPercentage = progressEvent.loaded / progressEvent.total * 100;
                    console.log("uploadPercentage=" + uploadPercentage.toString());
                    //$("div").trigger(ProjectID+"__uploadFile", [ uploadPercentage ]);
                    
                    //upladBar.setValue(uploadPercentage);
                    
                } else {
                    console.log("upload some chunk....");
                }
            };
            
            //uploadingMgr.showAll($("#moviePreviewPg_contentArea"));
            
            ft.upload(imageURI, starServerURL+"/miix/videos/user_content_files", uploadSuccess_cb, uploadFail_cb, options);
            
            $("#moviePreview").trigger("stopPreviewAnimation");
            $('#divStatus').html("照片上傳成功後即開始影像合成，合成完成後會通知您去分享給朋友！");
            $('#divStatus').show();
            $('#photoSubmitButtons').hide();
            $.mobile.showPageLoadingMsg();
            
            /*
             $("div").bind(ProjectID+"__uploadFile", function(e, _uploadPercentage){
             var uploadPercentageString = ( Math.floor(_uploadPercentage*100) ).toString();
             $('#divStatus').html("檔案上傳%"+uploadPercentageString+"...");
             console.log("_uploadPercentage= "+_uploadPercentage);          
             });
             */
            
        }
        
        uploadPhoto(fileSelectedURI);
        FmMobile.analysis.trackEvent("Button", "Click", "Submit", 24);
        //recordUserAction("submits a Photo");
        
        recordUserAction("submits a Photo", true);
        
    }
}
