FmMobile.myUgcPg = {
    PAGE_ID: "myUgcPg",
        
    myContents: null,
    myLiveContents: null,
    Type: null,
        
    init: function(){

        FM_LOG("[myUgcPg] pageinit");
        $('#nav-bar').show();
        FmMobile.viewerBackFlag=null;

               
        
    },
    
    show: function(){
        FmMobile.analysis.trackPage("/myUgcPg");
        recordUserAction("enters myUgcPg");
        

        
        $("#btnMyUgc").children("img").attr({src:"images/m2-active.png"});
        $("#btnTemplate").children("img").attr({src:"images/m1.png"});
        $("#btnScreen").children("img").attr({src:"images/m3.png"});
        $("#btnSetting").children("img").attr({src:"images/m4.png"});
        
        FM_LOG("[myUgcPg] pageshow");
        $("#btnMiixMovie").click(function(){
             $("#btnMiixMovie>img").attr({src: "images/tab_ugc_active.png"});
             $("#btnLiveMovie>img").attr({src: "images/tab_live.png"});
             FmMobile.myUgcPg.Type = "content";
             FmMobile.myUgcPg.loadContents(FmMobile.myUgcPg.myContents);
         
         });
        $("#btnLiveMovie").click(function(){
             $("#btnLiveMovie>img").attr({src: "images/tab_live_active.png"});
             $("#btnMiixMovie>img").attr({src: "images/tab_ugc.png"});
             
             //API : /miix/members/:memberId/live_contents
             FmMobile.myUgcPg.myLiveContents = [];
             var urlLiveContents = remotesite + "/miix/members/" + localStorage._id + "/live_contents";
             $.ajax({
                    url: urlLiveContents,
                    dataType: 'json',
                    success: function(response){
                                    if(response){
                                        $.each(response, function(i, item){
                                           var data ={
                                               ProjectId: item.projectId,
                                               No: item.no,
                                               Genre: item.genre,
                                               Url : item.url,
                                           };
                                       FmMobile.myUgcPg.myLiveContents.push(data);
                                       });
                                        FmMobile.myUgcPg.Type = "live";
                                        FmMobile.myUgcPg.loadLiveContents(FmMobile.myUgcPg.myLiveContents);
                                    }else{
                                        console.log("[error] : " + response.error);
                                    }
                            }
                    
                    
                });
         });
        if(FmMobile.checkNetwork()){
        
            //(the code originally in init() )
            var url = starServerURL + "/miix/members/" + localStorage._id + "/ugcs";
            //    FmMobile.myUgcPg.myContents = new Array();
            if(FmMobile.myUgcPg.Type == "live"){
//                FmMobile.myUgcPg.Type = "";
                $("#btnLiveMovie >img").attr({src: "images/tab_live_active.png"});
                $("#btnMiixMovie >img").attr({src: "images/tab_ugc.png"});
    //            FmMobile.myUgcPg.Type = "content";
                FmMobile.myUgcPg.loadLiveContents(FmMobile.myUgcPg.myLiveContents);
                
            }else{
                FmMobile.myUgcPg.myContents = [];
                
                $.ajax({
                       url: url,
                       dataType: 'json',
                       success: function(response){
                                       if(response){
                                           $.each(response, function(i, item){
                                                  var data ={
                                                      ProjectId: item.projectId,
                                                      Genre: item.genre,
                                                      Url : item.url,
                                                      PreviewUrl: item.doohPreviewUrl,
                                                      No: item.no,
                                                  };
                                                  FmMobile.myUgcPg.myContents.push(data);
                                          });
                                            FmMobile.myUgcPg.Type = "content";
                                           FmMobile.myUgcPg.loadContents(FmMobile.myUgcPg.myContents);
                                       }else{
                                           console.log("[error] : " + response.error);
                                       }
                               }
                    });
                
                
            }
            FmMobile.dummyDiv();
        }


        
    },
        
    test: function(arry){
        for(var i = 0 ; i< arry.length; i++)
            console.log(arry[i]);
    },
        
    loadLiveContents: function(arryHighlightContents){
        FM_LOG("[myUgcPg] loadLiveContents: ");
        var parent = $("#my-video-list");
        parent.html("");
        
        FmMobile.myUgcPg.test(arryHighlightContents);
        
        var arryLen = arryHighlightContents.length;
        var widget = null;
        var countContent = 0;
        
        /** Set data to List */
        for(var i = 0; i < arryLen; i++){
            
            var projectId = arryHighlightContents[i].ProjectId;
            console.log("projectId " + projectId);
            var widget = null;
            var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
            
            //For item info ex. Copy Youtube'url, Share on FB and # of video/image
            var info = $("<div>").attr({id: "my-content-info", style:"margin-bottom:27%;"});
            var Thumbnail = null;   //For content
            var shareYoutubeDiv = null;
            var shareFbDiv = null;
            var number = arryHighlightContents[i].No;
            var numberDiv = $("<div>").attr({class: "my-video-number"});
            var divhr = $("<div>");
            var hr = null;
//            if(typeof(arryHighlightContents[i].Url) != "undefined"){
                switch(arryHighlightContents[i].Genre){
                    case "miix_story":
                        if(typeof(arryHighlightContents[i].Url.youtube) != "undefined"){
                            countContent = countContent + 1;
                            if(countContent === 1){
                                widget = $("<div>").attr({id: projectId, class: "content-movie"});
                            }else{
                                widget = $("<div>").attr({id: projectId, class: "content-movie", style: "margin-top:5%;"}); //TODO: don't use margin-top with percentage in this case
                            }
                            dummyDiv.appendTo(widget);
                            var ytVideoID = (arryHighlightContents[i].Url.youtube).split('/').pop();

                            Thumbnail= $("<iframe>").attr({
                                                        id: ytVideoID,
                                                        src: "http://www.youtube.com/embed/" +ytVideoID + "?rel=0&showinfo=0&modestbranding=1&controls=0&autoplay=1",
                                                        class: "content-movie-img-iframe",
                                                        frameborder: "0"
                                                      });
                            Thumbnail.appendTo(widget);
                            
                            shareYoutubeDiv = $("<img>").attr({
                                                               id: "copyUrl_" + ytVideoID,
                                                               class: "share",
                                                               src: "images/youtube.png"
                                                               });
                            shareYoutubeDiv.appendTo(info);
                            
                            shareFbDiv = $("<img>").attr({
                                                          id: "shareFb_" + ytVideoID,
                                                          class: "share",
                                                          src: "images/facebook.png"
                                                          });
                            shareFbDiv.appendTo(info);
                            numberDiv.html("演出編號：" + number);
                            numberDiv.appendTo(info);
                            
                            hr = $("<hr>").attr({style:"margin-top:27%;"});
                            hr.appendTo(divhr);

                            info.appendTo(widget);
                            divhr.appendTo(widget);
                            widget.appendTo(parent);



                        }
                        break;
                    case "miix_image_live_photo":
                        console.log("s3 :" + arryHighlightContents[i].Url.s3);
                        countContent = countContent + 1;
                        if(countContent === 1){
                            widget = $("<div>").attr({id: projectId, class: "content-movie"});
                        }else{
                            widget = $("<div>").attr({id: projectId, class: "content-movie", style: "margin-top:5%;"}); //TODO: don't use margin-top with percentage in this case
                        }
                        dummyDiv.appendTo(widget);
                        var s3Url = "https://s3.amazonaws.com/miix_content" + arryHighlightContents[i].Url.s3;
                        Thumbnail = $("<img>").attr({
                                                      id: "imgS3_" +projectId,
                                                      src: s3Url,
                                                      class: "content-movie-img",
                                                      style: "height: 63%;margin-top:3.5%;"  //fixed the image of height
                                                      });
                        
                        Thumbnail.appendTo(widget);
                        shareYoutubeDiv = $("<img>").attr({
                                                           id: "copyUrlS3_" + projectId,
                                                           class: "share",
                                                           src: "images/youtube.png"
                                                           });
                        shareYoutubeDiv.appendTo(info);
                        
                        shareFbDiv = $("<img>").attr({
                                                      id: "shareImgFb_" + projectId,
                                                      class: "share",
                                                      src: "images/facebook.png"
                                                      });
                        shareFbDiv.appendTo(info);
                        numberDiv.html("演出編號：" + number);
                        
                        numberDiv.appendTo(info);
                        
                        hr = $("<hr>").attr({style:"margin-top:27%;"});
                        hr.appendTo(divhr);
                        
                        info.appendTo(widget);
                        divhr.appendTo(widget);
                        widget.appendTo(parent);

                        break;
                        
                    default :
                        console.log("Error : no Genre");
                }//End of switch
            
//            }else{
//                Thumbnail = $("<img>").attr({
//                                              id: 'imgError_' + i,
//                                              class: "content-movie-img"
//                                              });
//                Thumbnail.appendTo(widget);
//                widget.appendTo(parent);
                
//            }//End of If
        
        }//End of Loop
        
        FmMobile.myUgcPg.ClickEvent();
        
    },
        
    loadContents: function(arryContents){
        FM_LOG("[myUgcPg] loadContents");
        
        var parent = $("#my-video-list");
        console.log("parent=");
        console.dir(parent);
        parent.html("");
        
//        FmMobile.myUgcPg.test(arryContents);
        var arryLenContent = arryContents.length;
        
        
        /** Set data to List */
        for(var i = 0; i < arryLenContent; i++){
            
            if(i==(arryLenContent-1)){
                $.mobile.silentScroll(FmMobile.myUgcScroll_y);
            }
            var dummyDivPreview = $("<div>").attr({class: "movie-pic-dummy"});
            var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
            var dummyDivLong = $("<div>").attr({class:"movie-pic-dummy-long"});
            //For item info ex. Copy Youtube'url, Share on FB and # of video/image

            var infoPreview = $("<div>").attr({id:"my-content-info"});
            var info = $("<div>").attr({id: "my-content-info"});
            
            var projectId = arryContents[i].ProjectId;
            var number = arryContents[i].No;
            var numberDiv = $("<div>").attr({class: "my-video-number"});
            var widgetPreview = null;
            var widget = null;
            
            //For content and buttons
            var Thumbnail = null;
            var shareYoutubeDiv = null;
            var shareFbDiv = null;
            var tanmuSize = $("<div>").attr({class:"tanmu-instraction",style:"text-align:center;"});
            tanmuSize.html("天幕尺寸：100公尺×16公尺");
            //Set Preview
            if(typeof(arryContents[i].PreviewUrl) != "undefined"){
                widgetPreview = $("<div>").attr({id: "preview_" + projectId, class: "content-movie-preview"});
                dummyDivPreview.appendTo(widgetPreview);
                var previewUrl = arryContents[i].PreviewUrl;
                Thumbnail = $("<img>").attr({
                                                        id: 'imgPreview_' + projectId,
                                                        src: previewUrl,
                                                        class: "content-movie-img"
                                                        });
                Thumbnail.appendTo(widgetPreview);
                
                //var ytVideoID = i;
                shareYoutubeDiv = $("<img>").attr({
                                                       id: "copyPreUrl_" + projectId,
                                                       class: "share",
                                                       src: "images/youtube.png"
                                                       });
                shareYoutubeDiv.appendTo(infoPreview);
                
                shareFbDiv = $("<img>").attr({
                                                  id: "sharePreFb_" + projectId,
                                                  class: "share",
                                                  src: "images/facebook.png"
                                                  });
                shareFbDiv.appendTo(infoPreview);
                
                infoPreview.appendTo(widgetPreview);
                widgetPreview.appendTo(parent);
            }else{
                widgetPreview = $("<div>").attr({id: "previewError_" + i, class: "content-movie-preview"});
                dummyDivPreview.appendTo(widgetPreview);
                Thumbnail = $("<img>").attr({
                                                        id: 'imgPreviewError_' + i,
                                                        class: "content-movie-img"
                                                        });
                Thumbnail.appendTo(widgetPreview);
                widgetPreview.appendTo(parent);
            }//End of If
            
            
            //Set Contents
            switch(arryContents[i].Genre){
                case "miix":
                    if(typeof(arryContents[i].Url) != "undefined"){
                        var ytVideoID = (arryContents[i].Url.youtube).split('/').pop();
                        widget = $("<div>").attr({id: projectId, class: "content-movie", style: "margin-bottom: 26%;margin-top: 18%;"});
                        dummyDiv.appendTo(widget);
                        Thumbnail = $("<img>").attr({

                                                        id: 'imgYouTube_'+ytVideoID,
                                                        src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                        class: "content-movie-img",
                                                        style: "margin-top:4.5%;height:93%;"
                                                              });
                        
                        Thumbnail.appendTo(widget);
                        shareYoutubeDiv = $("<img>").attr({
                                                               id: "copyUrl_" + ytVideoID,
                                                               class: "share",
                                                               src: "images/youtube.png"
                                                               });
                        shareYoutubeDiv.appendTo(info);
                        
                        shareFbDiv = $("<img>").attr({
                                                          id: "shareFb_" + ytVideoID,
                                                          class: "share",
                                                          src: "images/facebook.png"
                                                          });
                        shareFbDiv.appendTo(info);
                        
                        
                        numberDiv.html("試鏡編號：" + number);
                        numberDiv.appendTo(info);
                        info.appendTo(widget);
                        widget.appendTo(parent);
                        
                    }else{
                        widget = $("<div>").attr({id: projectId, class: "content-movie", style: "margin-top: 18%;"});
                        dummyDiv.appendTo(widget);
                        Thumbnail = $("<img>").attr({
                                                              id: 'imgError_' + i,
                                                              src: "images/waiting.png",
                                                              class: "content-movie-img"
                                                              });
                        Thumbnail.appendTo(widget);
                        widget.appendTo(parent);
                        
                    }
                    //                    parent.append("<hr>");
                    
                    break;
                case "miix_image":
                    if(typeof(arryContents[i].Url) != "undefined"){
                        widget = $("<div>").attr({id: projectId, class: "content-movie-long"});
                        dummyDivLong.appendTo(widget);
                        
                        var s3Url = arryContents[i].Url.s3;
                        Thumbnail = $("<img>").attr({
                                                              id: "imgS3_" +projectId,
                                                              src: s3Url,
                                                              class: "content-movie-img-long"
                                                              });
                        
                        Thumbnail.appendTo(widget);
                        tanmuSize.appendTo(info);
                        shareYoutubeDiv = $("<img>").attr({
                                                               id: "copyUrlS3_" + projectId,
                                                               class: "share",
                                                               src: "images/youtube.png"
                                                               });
                        shareYoutubeDiv.appendTo(info);
                        
                        shareFbDiv = $("<img>").attr({
                                                          id: "shareImgFb_" + projectId,
                                                          class: "share",
                                                          src: "images/facebook.png"
                                                          });
                        shareFbDiv.appendTo(info);
                        
                        var numberDiv = $("<div>").attr({class: "my-video-number"});
                        numberDiv.html("試鏡編號：" + number);
                        numberDiv.appendTo(info);
                        info.appendTo(widget);
                        widget.appendTo(parent);
                        //                        parent.append("<hr>");
                        
                    }else{
                        widget = $("<div>").attr({id: projectId, class: "content-movie-long"});
                        dummyDivLong.appendTo(widget);
                        Thumbnail = $("<img>").attr({
                                                              id: "imgError_" + i,
                                                              src: "images/waiting.png",
                                                              class: "content-movie-img-long"
                                                              });
                        
                        widget.appendTo(parent);
                        
                    }
                    //                    parent.append("<hr>");
                    break;
                    
                default :
                    console.log("Eroor : no Genre");
            }//End of Switch
            parent.append("<hr>");
            
        }//End of Loop
        
        
        
        FmMobile.myUgcPg.ClickEvent();
        
    },
        
        
    ClickEvent: function(){
        /**  Video play  */
        FM_LOG("[myUgcPg.ClickEvent]");
        $('#my-video-list>div>img').click(function(e){
        //            console.log("click" + this);


        var divID = this.parentElement.id;
        var arryIdType = this.id.split('_');
        switch(arryIdType[0]){
            case "imgYouTube":
                                         
                var tempUrlArray = this.src.split('/');

                var ytVideoID = tempUrlArray[tempUrlArray.length-2];
                console.log("divId :" + divID);
                var videoFrame = $("<iframe>").attr({
                                                  id: ytVideoID,
                                                  src: "http://www.youtube.com/embed/" +ytVideoID + "?rel=0&showinfo=0&modestbranding=1&controls=0&autoplay=1",
                                                  class: "content-movie-img",
                                                  frameborder: "0"
                                                  }).load(function(){
                                                          //TODO: find a better way to have callPlayer() called after videoFrame is prepended
                                                          setTimeout(function(){
                                                                     callPlayer(ytVideoID,'playVideo');
                                                                     }, 1500);
                                                          });

                var callPlayer = function (frame_id, func, args) {
                    if (window.jQuery && frame_id instanceof jQuery){
                        frame_id = frame_id.get(0).id;
                    }
                    var iframe = document.getElementById(frame_id);
                if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
                    iframe = iframe.getElementsByTagName('iframe')[0];
                }
                                          
                if (iframe) {
                // Frame exists,
                iframe.contentWindow.postMessage(JSON.stringify({
                                                              "event": "command",
                                                              "func": func,
                                                              "args": args || [],
                                                              "id": frame_id
                                                              }), "*");
                }};

                $('#'+divID).prepend(videoFrame);
                $('#'+this.id).remove();
                break;
            case "imgError":
                console.log("you chosse the error item or the image");
                break;
            case "imgS3":
            case "imgPreview":
                                          FmMobile.myUgcScroll_y=e.pageY;
                FmMobile.srcForMyUgcViewer=this.src;
                $.mobile.changePage('imgZoomViewer.html');

                break;
            default:
                console.log("Click event is not woked");
            }//End of Switch


        });

        /** Copy youtube url and share to FB */
        $('#my-content-info>img').click(function(e){
            //var imgID = this.id;
            var tmpIDArray = this.id.split('_');

            /** template naming
             * copyUrlS3_template-xxxxxxx-xxxxxxxx
             * type:
             *     mood-xxxxxxx
             *     check_in-xxxxxxxx
             *     cultural_and_creative-xxxxxxx
             *
             * */

            if(tmpIDArray.length == 2){
                //For youtube and mood
                tmpIDArray[1] = tmpIDArray[1];
            }else if(tmpIDArray.length == 3){
                //For check_in
                tmpIDArray[1] = tmpIDArray[1] + "_" + tmpIDArray[2];
            }else if(tmpIDArray.length == 4){
                //For cultural_and_creative
                tmpIDArray[1] = tmpIDArray[1] + "_" + tmpIDArray[2] + "_" + tmpIDArray[3];
            }else if(tmpIDArray.length == 8){
                tmpIDArray[1] = tmpIDArray[1] + "_" + tmpIDArray[2] + "_" + tmpIDArray[3]+ "_" + tmpIDArray[4]+ "_" + tmpIDArray[5]+ "_" + tmpIDArray[6]+ "_" + tmpIDArray[7];
            }else{
                //Type is wrong.
                tmpIDarray[0] = "error";
            }

            var s3Url = "https://s3.amazonaws.com/miix_content/user_project/" + tmpIDArray[1] + "/" + tmpIDArray[1];

            switch(tmpIDArray[0]){
                case "copyUrl":
                    if(device.platform == "iPhone"){
                        /**iOS Plugin */
                        window.clipboardPluginCopy("https://www.youtube.com/watch?feature=player_embedded&v=" + tmpIDArray[1],
                                                   function() {FmMobile.showNotification("copyUrl");},
                                                   function(e){alert(e);}
                                                   );
                    }else if(device.platform == "Android"){
                        /** Android Plugin */
                        window.clipboardManagerCopy(
                                        "https://www.youtube.com/watch?feature=player_embedded&v=" + tmpIDArray[1],
                                        function(r){ FmMobile.showNotification("copyUrl");},
                                        function(e){alert(e);}
                                        );
                    }
                    break;
                case "shareFb":
                    FmMobile.shareProjectID=this.parentElement.parentElement.id;                   
                    
                    FmMobile.shareFbType="video";
                    FmMobile.srcForMyUgcViewer="http://img.youtube.com/vi/"+tmpIDArray[1]+"/mqdefault.jpg";
                    FmMobile.youtubeVideoUrl="http://www.youtube.com/embed/" +tmpIDArray[1] + "?rel=0&showinfo=0&modestbranding=1&controls=0&autoplay=1";
                    $.mobile.changePage('facebook_share.html');

                    break;
                case "shareImgFb":
                    FmMobile.shareFbType="image";
                                        
               FmMobile.shareProjectID=tmpIDArray[1];

                    if(FmMobile.myUgcPg.Type == "content"){
                        FmMobile.srcForMyUgcViewer= s3Url + ".png";
                    }else if(FmMobile.myUgcPg.Type == "live"){
                        FmMobile.srcForMyUgcViewer= s3Url + ".jpg";
                    }
                    $.mobile.changePage('facebook_share.html');
                    break;
                case "sharePreFb":
                    FmMobile.shareProjectID=tmpIDArray[1];
                                        
                    FmMobile.shareFbType="image";
                    FmMobile.srcForMyUgcViewer= s3Url + "_dooh_preview.png";
                    $.mobile.changePage('facebook_share.html');
                    break;
            case "copyUrlS3":

                console.log("S3 URL " + tmpIDArray[1]);
                if(FmMobile.myUgcPg.Type == "content"){
                    if(device.platform == "iPhone"){
                        window.clipboardPluginCopy(s3Url + ".png",
                                                   function() { FmMobile.showNotification("copyUrl");},
                                                   function(e){ FmMobile.showNotification("error");
                                                               console.log('clipboardPlugin error: ' + e);}
                                                   );
                    }else if(device.platform == "Android"){
                        window.clipboardManagerCopy(s3Url+ ".png",
                                                    function(r){ FmMobile.showNotification("copyUrl");},
                                                    function(e){FmMobile.showNotification("error");
                                                                console.log('clipboardPlugin error: ' + e);}
                                                    );
                    }
                }else if(FmMobile.myUgcPg.Type == "live"){
                    if(device.platform == "iPhone"){
                        window.clipboardPluginCopy(s3Url + ".jpg",
                                                   function(){ FmMobile.showNotification("copyUrl");},
                                                   function(e){FmMobile.showNotification("error");
                                                               console.log('clipboardPlugin error: ' + e);}
                                                   );
                    }else if(device.platform == "Android"){
                        window.clipboardManagerCopy(s3Url + ".jpg",
                                                    function(r){FmMobile.showNotification("copyUrl");},
                                                    function(e){FmMobile.showNotification("error");
                                                                console.log('clipboardPlugin error: ' + e);}
                                                    );
                    }
                }
                break;
            case "copyPreUrl":
                if(device.platform == "iPhone"){
                    window.clipboardPluginCopy(s3Url + "_dooh_preview.png" ,
                                               function() { FmMobile.showNotification("copyUrl"); },
                                               function(e){FmMobile.showNotification("error");
                                                           console.log('clipboardPlugin error: ' + e);}
                                               );
                }else if(device.platform == "Android"){
                    window.clipboardManagerCopy(s3Url + "_dooh_preview.png",
                                                function(r){FmMobile.showNotification("copyUrl");},
                                                function(e){FmMobile.showNotification("error");
                                                            console.log('clipboardPlugin error: ' + e);}
                                                );
                }

                break;
            case "error":
                FmMobile.showNotification("error");
                console.log("[FmMobile.myUgcPg.ClickEvent] error :" + "Your Url is not available.");
                break;
            default:
                FmMobile.showNotification("error");
                console.log("[FmMobile.myUgcPg.ClickEvent] error :" + "You don't touch the button.");

            }//End of Switch
        });//End of Click Function

    },
    
    
    
    
};