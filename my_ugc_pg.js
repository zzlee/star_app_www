FmMobile.myUgcPg = {
    PAGE_ID: "myUgcPg",
    
    init: function(){
        FM_LOG("[myUgcPg] pageinit");
        $('#nav-bar').show();
        

        var url = starServerURL + "/miix/ugc_hightlights";
        var myVideos = new Array();
        
        //screen_pg.js
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
                              Youtube : item.url.youtube,
                              No: item.no,
                      
                          }
                          myVideos.push(data);
                        });
                        videoList(myVideos);
                    }else{
                       console.log("[error] : " + response.error);
                   }
               }
        });
        
        
        var videoList = function(arryVideo){
            var parent = $("#my-video-list");
            //remove all tags in my-video-list
            parent.html("");
            
            
            for(var i = 0; i< arryVideo.length; i++){
                var widget = $("<div>").attr({id: arryVideo[i].ProjectId, class: "content-movie"});
                var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
                var shareYoutubeDiv = $("<img>").attr({
                                                   class: "share",
                                                   src: "images/youtube.png"
                                                   });
                var shareFbDiv = $("<img>").attr({
                                              class: "share",
                                              src: "images/facebook.png"
                                              });
                var numberDiv = $("<div>").attr({class: "my-video-number"});
                dummyDiv.appendTo(widget);
                if(arryVideo[i].Youtube){
                    var ytVideoID = (arryVideo[i].Youtube).split('/').pop();
                    console.log(i + " ytVideoID :" + ytVideoID + ", No. " + arryVideo[i].No);
                    this.videoThumbnail = $("<img>").attr({
                                                          id: 'img_'+ytVideoID,
                                                          src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                          class: "content-movie-img"
                                                          });
                    this.videoThumbnail.appendTo(widget);
                    
                    
                    widget.appendTo(parent);

                    shareYoutubeDiv.appendTo(parent);
                    shareFbDiv.appendTo(parent);
                    numberDiv.html("NO." + arryVideo[i].No);
                    numberDiv.appendTo(parent);
                    
                }else{
                    console.log("[myUgcPg.init] videoList : no Youtube URL");
                }
                
            }
            
            
            
        }

        
    },
    
    show: function(){
        FM_LOG("[myUgcPg] pageshow");
        $("#btnMiixMovie").click(function(){
//            $("#btnMiixMovie>img").attr("src","images/a-my_video.png");
//            $("#btnLiveMovie>img").attr("src","images/e-dooh.png");
             FmMobile.myUgcPg.init();
         
         
         });
        $("#btnLiveMovie").click(function(){
 //            $("#btnMiixMovie>img").attr("src","images/e-my_video.png");
 //            $("#btnLiveMovie>img").attr("src","images/a-dooh.png");

             FmMobile.myUgcPg.loadLiveVideo();
         
         });
        
        $('#my-video-list>div>img').click(function(){
            console.log("click" + this);
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

    },
    
    loadLiveVideo: function(){
        FM_LOG("[myUgcPg] loadLiveVideo");
        var url = starServerURL + "/miix/ugc_hightlights";
        var myLiveVideos = new Array();
        
        //screen_pg.js
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
                              Youtube : item.url.youtube,
                          }
                          myLiveVideos.push(data);
                      });
                   videoList(myLiveVideos);
                   }else{
                       console.log("[error] : " + response.error);
                   }
               }
           });
        
        
        var videoList = function(arryVideo){
            var parent = $("#my-video-list");
            //remove all tags in my-video-list
            parent.html("");
            
            
            for(var i = 0; i< arryVideo.length; i++){
                var widget = $("<div>").attr({id: arryVideo[i].ProjectId, class: "content-movie"});
                var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
                var shareYoutubeDiv = $("<img>").attr({
                                                      class: "share",
                                                      src: "images/youtube.png"
                                                      });
                var shareFbDiv = $("<img>").attr({
                                                 class: "share",
                                                 src: "images/facebook.png"
                                                 });
                if(arryVideo[i].Youtube){
                    var ytVideoID = (arryVideo[i].Youtube).split('/').pop();
                    console.log(i + " ytVideoID :" + ytVideoID);
                    this.videoThumbnail = $("<img>").attr({
                                                          id: 'img_'+ytVideoID,
                                                          src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                          class: "content-movie-img"
                                                          });
                    this.videoThumbnail.appendTo(widget);
                    
                    
                    widget.appendTo(parent);
                    
                    shareYoutubeDiv.appendTo(parent);
                    shareFbDiv.appendTo(parent);
                    
                }else{
                    console.log("[myUgcPg.loadLiveVideo] videoList : no Youtube URL");
                }
                
            }
            
            
            
        }

    },
    
    
};
