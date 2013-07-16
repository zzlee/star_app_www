FmMobile.screenPg = {
    /*
     1. Get the video from our server when the user enter this page.
     2. Set the info to UI
     3. Play Youtube
     */
    PAGE_ID: "screenPg",
    
    
    show: function(){
        FM_LOG("[screenPg] pageshow");
        FmMobile.analysis.trackPage("/screenPg");
        
        //From fm_widget
        //if user click the img and then play the youtube
        $('#my-video-list>div>img').click(function(){
            console.log('[click on video list: ]'+this);

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
    
    loadVideo: function(event, data){
        FM_LOG("[screenPg]loadVideo");
        
        
    },
    
    init: function(){
        FM_LOG("[screenPg] pageinit");
		$('#nav-bar').show();
        
        //Get the the video from our server.
        var url = starServerURL + "/miix/ugc_hightlights";
        var videoHighlights = new Array();
        
        //json transfer array
        //it's async
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
                                  PosterId : item.ownerId.userID,

                              }
                              videoHighlights.push(data);
                      });
//                       showArray(videoHighlights);
                       videoList(videoHighlights);
                   }else{
                       console.log("[error] : " + response.error);
                   }
               }
        });
        
        
        //TEST
        var showArray = function(arryVideo) {
            console.log("length : " + arryVideo.length);
            for(var i = 0; i < arryVideo.length; i++)
                console.log("[youtube] : " + arryVideo[i].Youtube);
            
        }
        
        
        var videoList = function(arryVideo){
            var parent = $("#my-video-list");
            parent.html("");

            
            for(var i = 0; i< arryVideo.length; i++){
                var widget = $("<div>").attr({id: arryVideo[i].ProjectId, class: "content-movie"});
                var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
                var TitleDiv = $("<div>").attr({class: "screen_dp"});
                var PosterDiv = $("<div>").attr({class: "screen_dp"});
                dummyDiv.appendTo(widget);
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
                    
                    console.log(arryVideo[i].Title);
                    console.log(arryVideo[i].PosterId);
                    
                    TitleDiv.html("影片名稱： " + arryVideo[i].Title);
                    PosterDiv.html("發布者： " + arryVideo[i].PosterId);
                    TitleDiv.appendTo(parent);
                    PosterDiv.appendTo(parent);
                    
                }else{
                    console.log("[screenPg.init] videoList : no Youtube URL");
                }
                
            }

    
        }
        
    },

    
};
