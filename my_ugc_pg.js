FmMobile.myUgcPg = {
    PAGE_ID: "myUgcPg",
    myVideos: null,
    
    init: function(){
        FM_LOG("[myUgcPg] pageinit");
        $('#nav-bar').show();
        

        var url = starServerURL + "/miix/members/" + localStorage._id + "/ugcs";
        FmMobile.myUgcPg.myVideos = new Array();
        //screen_pg.js
        //Everytime reload the data from our Server.

        $.ajax({
               url: url,
               dataType: 'json',
               success: function(response){
                   if(response){
                       $.each(response, function(i, item){
                          var data ={
                              Title : item.title,
                              ProjectId: item.projectId,
                              Genre: item.genre,
                              Url : item.url,   // including youtube, s3 and tudou
                              No: item.no,
                              
                          }
                          FmMobile.myUgcPg.myVideos.push(data);
                              
                        });
                          FmMobile.myUgcPg.loadLiveVideo(FmMobile.myUgcPg.myVideos, "video");
//                        FmMobile.myUgcPg.test(FmMobile.myUgcPg.myVideos);
                    }else{
                       console.log("[error] : " + response.error);
                   }
               }
        });

        
        
    },
    
    show: function(){
        FM_LOG("[myUgcPg] pageshow");
        $("#btnMiixMovie").click(function(){
             FmMobile.myUgcPg.loadLiveVideo(FmMobile.myUgcPg.myVideos, "video");
         
         });
        $("#btnLiveMovie").click(function(){
             FmMobile.myUgcPg.loadLiveVideo(FmMobile.myUgcPg.myVideos, "live");
         
         });
        
        FmMobile.myUgcPg.loadLiveVideo(FmMobile.myUgcPg.myVideos, "video");
    },
    
    test: function(arry){
        for(var i = 0 ; i< arry.length; i++)
            console.log(arry[i]);
    },
    
    loadLiveVideo: function(arryVideo, type){
        FM_LOG("[myUgcPg] loadLiveVideo");
        console.log('[Type] : ' + type);
        var parent = $("#my-video-list");
        
        //remove all tags in my-video-list
        parent.html("");
        FmMobile.myUgcPg.test(arryVideo);

        /** Set data to List */
        for(var i = 0; i< arryVideo.length; i++){
            var widget = $("<div>").attr({id: arryVideo[i].ProjectId, class: "content-movie"});
            var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
            //For item info ex. Copy Youtube'url, Share on FB and # of video/image
            var info = $("<div>").attr({id: "my-video-info"});
            
            dummyDiv.appendTo(widget);
            
            switch(arryVideo[i].Genre){
                //Genre type : video and image
                //video : miix
                //image : miix_image
                case "miix":
                    if(typeof(arryVideo[i].Url) != "undefined"){
                        //if arryVideo[i] exist
                        //Get the youtube video ID
                        var ytVideoID = (arryVideo[i].Url.youtube).split('/').pop();
                        console.log(i + " ytVideoID :" + ytVideoID + ", No. " + arryVideo[i].No);
                        this.videoThumbnail = $("<img>").attr({
                                                              id: 'imgYouTube_'+ytVideoID,
                                                              src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                              class: "content-movie-img"
                                                              });
                        this.videoThumbnail.appendTo(widget);
                        
                        this.shareYoutubeDiv = $("<img>").attr({
                                                               id: "copyUrl_" + ytVideoID,
                                                               class: "share",
                                                               src: "images/youtube.png"
                                                               });
                        this.shareYoutubeDiv.appendTo(info);
                        
                        this.shareFbDiv = $("<img>").attr({
                                                          id: "shareFb_" + ytVideoID,
                                                          class: "share",
                                                          src: "images/facebook.png"
                                                          });
                        this.shareFbDiv.appendTo(info);
                        if(type == "video"){
                            this.numberDiv = $("<div>").attr({class: "my-video-number"});
                            this.numberDiv.html("NO." + arryVideo[i].No);
                            this.numberDiv.appendTo(info);
                            info.appendTo(widget);
                        }else if(type == "live"){
                            //TODO: Live waiting GZ's API
                            info.appendTo(widget);
                        }
                        

                    }else{
                        //if youtube url not exist.
                        this.videoThumbnail = $("<img>").attr({
                                                              id: 'imgError_' + i,
                                                              src: "images/choose_movie.png",
                                                              class: "content-movie-img"
                                                              });
                        this.videoThumbnail.appendTo(widget);
                    }
                    widget.appendTo(parent);
                    break;
                case "miix_image":
                    if(typeof(arryVideo[i].Url.s3) != "undefined"){
                        //Get the image's project Id
                        var projectId = arryVideo[i].ProjectId;
                        console.log("s3 :" + arryVideo[i].Url.s3);
                        
                        //TODO: cultural and  creative, mood are different it should to update
                        var s3Url = arryVideo[i].Url.s3;
                        this.imageThumbnail = $("<img>").attr({
                                                              id: "imgS3_" +projectId,
                                                              src: s3Url,
                                                              class: "content-movie-img"
                                                              });
                        this.imageThumbnail.appendTo(widget);
                    
                        this.shareYoutubeDiv = $("<img>").attr({
                                                               id: "copyUrlS3_" + projectId,
                                                               class: "share",
                                                               src: "images/youtube.png"
                                                               });
                        this.shareYoutubeDiv.appendTo(info);
                        
                        this.shareFbDiv = $("<img>").attr({
                                                          id: "shareFb_" + s3Url,
                                                          class: "share",
                                                          src: "images/facebook.png"
                                                          });
                        this.shareFbDiv.appendTo(info);
                    
                        if(type == "video"){
                            this.numberDiv = $("<div>").attr({class: "my-video-number"});
                            this.numberDiv.html("NO." + arryVideo[i].No);
                            this.numberDiv.appendTo(info);
                            info.appendTo(widget);
                        }else if(type == "live"){
                            //TODO: Wating a new API
                            info.appendTo(widget);
                        }
                    }else{
                        //if s3 url not exist
                        this.videoThumbnail = $("<img>").attr({
                                                              id: 'imgError_' + i,
                                                              src: "images/choose_movie.png",
                                                              class: "content-movie-img"
                                                              });
                        this.videoThumbnail.appendTo(widget);
                    }
                    widget.appendTo(parent);
                    break;
                default :
                    console.log("Eroor : no Genre");
            }

        }
        
        FmMobile.myUgcPg.ClickEvent();
    },
    
    ClickEvent: function(){
        /**  Video play  */
        FM_LOG("[myUgcPg.ClickEvent]");
        $('#my-video-list>div>img').click(function(){
            console.log("click" + this);
                                     
                                          
            var divID = this.parentElement.id;
            var arryIdType = this.id.split('_');
            switch(arryIdType[0]){
                case "imgYouTube":
                    var tempUrlArray = this.src.split('/');
                    var ytVideoID = tempUrlArray[tempUrlArray.length-2];
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
                        }
                    };
                    
                    $('#'+divID).prepend(videoFrame);
                    $('#'+this.id).remove();
                    break;
                case "imgError":
                case "imgS3":
                    console.log("you chosse the error item or the image");
                    break;
                default:
                    console.log("Click event is not woked");
            }
            

        });
        
        /** Copy youtube url and share to FB */
        $('#my-video-info>img').click(function(){
            var imgID = this.id;        
            var tmpIDArray = this.id.split('_');
//            for(var i = 0; i < tmpIDArray.length; i++)
//                console.log("id.split[" + i + "] :" + tmpIDArray[i]);
                                      
            if(tmpIDArray.length > 2)
              tmpIDArray[0] = tmpIDArray[1] + "_" + tmpIDArray[2] + "_" + tmpIDArray[3];
                                      
            console.log("tmpIdArray[0] :" + tmpIDArray[0]);
            switch(tmpIDArray[0]){
                case "copyUrl":
//                    window.clipboardPluginCopy("https://www.youtube.com/watch?feature=player_embedded&v=" + tmpIDArray[1], function() { alert("已複製到剪貼簿")} , function(e){alert(e);});
                	window.plugins.ClipboardManager.copy(
                			"https://www.youtube.com/watch?feature=player_embedded&v=" + tmpIDArray[1],
                			function() { alert("已複製到剪貼簿")},
               			 function(e){alert(e);});
                    break;
                case "shareFb":
                    alert("share to FB");
                    break;
                case "copyUrlS3":
                    console.log("S3 URL " + tmpIDArray[1]);
//                    window.clipboardPluginCopy("https://s3.amazonaws.com/miix_content/user_project/" + tmpIDArray[1] + "/" + tmpIDArray[1] + ".png", function() { alert("已複製到剪貼簿")} , function(e){alert(e);});
                	window.plugins.ClipboardManager.copy(
                			"https://s3.amazonaws.com/miix_content/user_project/" + tmpIDArray[1] + "/" + tmpIDArray[1] + ".png",
                			function() { alert("已複製到剪貼簿")},
                			 function(e){alert(e);});
                    break;
                default:
                    alert("You don't touch the button.");

            }
        });

    },
    
    
    
    
};
