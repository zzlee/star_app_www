FmMobile.myUgcPg = {
    PAGE_ID: "myUgcPg",
    myVideos: null,
    
    init: function(){
        FM_LOG("[myUgcPg] pageinit");
        $('#nav-bar').show();
        

        var url = starServerURL + "/miix/members/:memberId/ugcs";
        FmMobile.myUgcPg.myVideos = new Array();
        //screen_pg.js
        //Everytime reload the data from our Server.
        var query = {
            "_id": localStorage._id,
            "userID": localStorage.fb_userID,
            "timestamp": Date.now()
        };
        $.ajax({
               url: url,
               data: query,
               dataType: 'json',
               success: function(response){
                   if(response){
                       $.each(response, function(i, item){
                          var data ={
                              Title : item.title,
                              ProjectId: item.projectId,
                              Genre: item.genre,
                              Youtube : item.url.youtube,
                              //if column no data then send " "
                              //Youtube : item.url.youtube,
                              //Tudou : item.url.tudou,
                              //S3 : item.url.s3,
                              No: item.no,
                              
                          }
                          FmMobile.myUgcPg.myVideos.push(data);
                              console.log("[data] :" + data);
                        });
//                          FmMobile.myUgcPg.loadLiveVideo(FmMobile.myUgcPg.myVideos, "video");
      
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
    
    loadLiveVideo: function(arryVideo, type){
        FM_LOG("[myUgcPg] loadLiveVideo");
        console.log('[Type] : ' + type);
        var parent = $("#my-video-list");
        
        //remove all tags in my-video-list
        parent.html("");
        
        /** Set data to List */
        for(var i = 0; i< arryVideo.length; i++){
            var widget = $("<div>").attr({id: arryVideo[i].ProjectId, class: "content-movie"});
            var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
            //For item info ex. Copy Youtube'url, Share on FB and # of video/image
            var info = $("<div>").attr({id: "my-video-info"});
            
            dummyDiv.appendTo(widget);
            
            //For Youtube
            if(arryVideo[i].Youtube != ""){
                var ytVideoID = (arryVideo[i].Youtube).split('/').pop();
                console.log(i + " ytVideoID :" + ytVideoID + ", No. " + arryVideo[i].No);
                this.videoThumbnail = $("<img>").attr({
                                                      id: 'img_'+ytVideoID,
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
                    info.appendTo(widget);
                }
                
                widget.appendTo(parent);
            }else if(arrVideo[i].S3 != ""){
                //Get the image's name
                var s3ImageName = arrVideo[i].S3;
                var s3Url = arrVideo[i].S3;
                console.log(i + " s3ImageName : " + s3ImageName);
                this.imageThumbnail = $("<img>").attr({
                                                      //set image's name to id
                                                      id: "img_" +s3ImageName,
                                                      src: s3Url,
                                                      class: "content-movie-img"
                                                      });
                this.imageThumbnail.appendTo(widget);
                
                
            }else if(arrVideo[i].Todou != ""){
                
            
            }else{
                console.log("[myUgcPg.loadLiveVideo] videoList : no Youtube URL");
            }
            
        }
        
        FmMobile.myUgcPg.ClickEvent();
    },
    
    ClickEvent: function(){
        /**  Video play  */
        FM_LOG("[myUgcPg.ClickEvent]");
        $('#my-video-list>div>img').click(function(){
            console.log("click" + this);
            //if gene != youtube url
            // jump the callPlayer
            //else if( photo)
            // connect S3 and show the photo!
                                    
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
            var divID = this.parentElement.id;
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

                $('#'+divID).prepend(videoFrame);
                $('#'+this.id).remove();
        });
        
        /** Copy youtube url and share to FB */
        $('#my-video-info>img').click(function(){
            var imgID = this.id;        //
            var tmpIDArray = this.id.split('_');
            switch(tmpIDArray[0]){
                case "copyUrl":
                    window.clipboardPluginCopy("https://www.youtube.com/watch?feature=player_embedded&v=" + tmpIDArray[1], function() { alert("已複製到剪貼簿")} , function(e){alert(e);});

                    break;
                case "shareFb":
                    alert("share to FB");
                    break;
                default:
                    alert("You don't touch the button.");

            }

        });

    },
    
    
    
    
};
