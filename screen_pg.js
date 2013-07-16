FmMobile.screenPg = {
    /*
     1. Get the video from our server when the user enter this page.
     2. Set the info to UI
     */
    PAGE_ID: "screenPg",
    
    
    show: function(){
        FM_LOG("[screenPg] pageshow");
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
//                              console.log(videoHighlights);
                      });
//                       showArray(videoHighlights);
                       videoWgt(videoHighlights);
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
        
        
        var videoWgt = function(arryVideo){
            var parent = $("#my-video-list");
//            var widget;

            
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
                    console.log("[screenPg.init] videoWgt : no Youtube URL");
                }

                

                
            }

    
        }
        
    },

    
};
