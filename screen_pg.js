FmMobile.screenPg = {


    PAGE_ID: "screenPg",
    highLightVideos: null,
    highLightContent:null,
    
    init: function(){
        $('body').css({
                      "position":""
                      });
        FmMobile.myUgcScroll_y=0;
        FM_LOG("[screenPg] pageinit");
        $('#nav-bar').show();
        $("#intro").hide();
        
    },
    
    show: function(){
        FM_LOG("[screenPg] pageshow");
        FmMobile.analysis.trackPage("/screenPg");
        $("#btnHighLights").click(function(){
        	FmMobile.analysis.trackPage("/screenPg/highLights");
            $("#btnHighLights > img").attr({src: "images/tab_show_active.png"});
            $("#btnArena > img").attr({src: "images/tab_tanmu.png"});
            $("#intro").hide();
//            FmMobile.screenPg.loadVideo(FmMobile.screenPg.highLightVideos, "highlight");
            FmMobile.screenPg.loadHighLightContent(FmMobile.screenPg.highLightContent);
        });
        
        $("#btnArena").click(function(){
        	FmMobile.analysis.trackPage("/screenPg/tanmuIntro");
            $("#btnHighLights > img").attr({src: "images/tab_show.png"});
            $("#btnArena > img").attr({src: "images/tab_tanmu_active.png"});
            var parent = $("#my-video-list");
            $("#intro").show();
            parent.html("");
            //We use html to introduce Tanmu LED so we don't need a function to show it.
//             FmMobile.screenPg.loadArenaContent();

        });
        
//        FmMobile.screenPg.loadVideo(FmMobile.screenPg.highLightVideos, "highlight");
//        FmMobile.screenPg.loadHighLightContent(FmMobile.screenPg.highLightContent);
        
        if(FmMobile.checkNetwork()){
            //Get the the video from our server.
            var url = starServerURL + "/miix/ugc_highlights";
            FmMobile.screenPg.highLightContent = new Array();
            
            //json transfer array
            //it's async
            $.ajax({
                   url: url,
                   dataType: 'json',
                   data:{ miixToken: localStorage.miixToken },
                   success: function(response){
                                   if(response){
                                       $.each(response, function(i, item){
                                              var data ={
                                                  Id: item.fbUserId,
                                                  Name: item.fb_userName,
                                                  Genre: item.genre,
                                                  LiveContentUrl : item.liveContentUrl,
                                              LongPhotoUrl: item.longPhotoUrl,
                                              YouTubeUrl: item.youtubeUrl
                                  
                                      }
                                  FmMobile.screenPg.highLightContent.push(data);
                                  });
                                FmMobile.screenPg.loadHighLightContent(FmMobile.screenPg.highLightContent);
                           }else{
                               console.log("[error] : " + response.error);
                           }
                       }
                   });
            FmMobile.dummyDiv();
        }
    },
    
    loadArenaContent: function(){
        FM_LOG("[screenPg]loadArenaContent");

        

    },
    
    loadHighLightContent: function(arryHighlight){
        FM_LOG("[screenPg]loadHighLightContent");
        var parent = $("#my-video-list");
        parent.html("");
        
        //improve efficency
        var arryLen = arryHighlight.length;
        
        for(var i = 0; i < arryLen; i++){
//            console.log("userId" + arryHighlight[i].Id);
            var widget = $("<div>").attr({id: arryHighlight[i].Id + "_" + i, class: "content-movie"});
            
            var mainDummy = $("<div>").attr({class: "movie-pic-dummy"});
            var infoDiv = $("<div>").attr({id: "ownerid-info"});
            var ownerPhotoUrl = 'https://graph.facebook.com/' + arryHighlight[i].Id + '/picture/?width=150&height=150';
            
            mainDummy.appendTo(widget);
            
            var Thumbnail = null;
            var ownerPhoto = null;
            var ownerNameDiv = $("<div>").attr({class: "facebook_name"});
            
            var subContent = $("<div>").attr({id: arryHighlight[i].Id + "_" + i + "_longPhoto", class: "content-movie-long-highlight"});
            
            var dummyLong = $("<div>").attr({class: "movie-pic-dummy-long"});
            var longPhoto = null;
            
            switch(arryHighlight[i].Genre){
                case "miix_story":
                case "miix":
                    if(typeof(arryHighlight[i].YouTubeUrl) != "undefined"){
                        var ytVideoID = (arryHighlight[i].YouTubeUrl).split('/').pop();
//                        console.log("youtubeID " + ytVideoID);
                        //set youtube
                        Thumbnail = $("<img>").attr({
                                                    id: 'imgYouTube_'+ytVideoID,
                                                    src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                    class: "content-movie-img",
                                                    style:"height:56%;margin-top:2.5%;"
                                                      });
                        Thumbnail.appendTo(widget);
                        //set the owner'photo
                        ownerPhoto = $("<img>").attr({
                                                               id: "OwnerId_" + i + "_" + arryHighlight[i].Id,
                                                               class: "facebook_pic",
                                                               src: ownerPhotoUrl
                                                               });
                        //set the owner's name

                        ownerNameDiv.html(arryHighlight[i].Name);
                        ownerPhoto.appendTo(infoDiv);
                        ownerNameDiv.appendTo(infoDiv);
                        infoDiv.appendTo(widget);

                    }else{
                        Thumbnail = $("<img>").attr({
                                                              id: 'imgError_' + i,
                                                              class: "content-movie-img"
                                                              });
                        Thumbnail.appendTo(widget);
                        
                    }

                    widget.appendTo(parent);
                    break;
                case "miix_image":
                    if((arryHighlight[i].LiveContentUrl != "undefined") && (arryHighlight[i].LongPhotoUrl != "undefined")){
                        Thumbnail = $("<img>").attr({
                                                      id: "imgS3_" + i + "-" + arryHighlight[i].Id,
                                                      src: arryHighlight[i].LiveContentUrl,
                                                      class: "content-movie-img",
                                                      style: "height: 45%;margin-top:2.5%;"  //fixed the image of height
                                                      });
                        Thumbnail.appendTo(widget);
                        
                        dummyLong.appendTo(subContent);
                        longPhoto = $("<img>").attr({
                                                    id: "longPhoto_" + arryHighlight[i].Id,
                                                    src:arryHighlight[i].LongPhotoUrl,
                                                    class: "content-movie-img-long",
                                                    style: "margin-top: 9px;"
                                                    
                        
                        });
                        
                        longPhoto.appendTo(subContent);

                        //set the owner'photo
                        ownerPhoto = $("<img>").attr({
                                                          id: "OwnerId_" + i + "_" + arryHighlight[i].Id,
                                                          class: "share",
                                                          src: ownerPhotoUrl,
                                                         style: "width:35%;margin-left:0%;margin-right:5%;"
                                                          });
                        //set the owner's name
                        
                        subContent.appendTo(widget);
                        ownerNameDiv.html(arryHighlight[i].Name);
                        ownerPhoto.appendTo(infoDiv);
                        ownerNameDiv.appendTo(infoDiv);
                        infoDiv.appendTo(widget);
                
                        widget.appendTo(parent);
                    }//End of If
                    break;

                default :
                    console.log("Eroor : no Genre");
            }//End of switch
            parent.append("<hr>");
            
        }//End of Loop
        
        FmMobile.screenPg.clickEvent();
        
    },
    

    
    clickEvent: function(){
        FM_LOG("[screenPg.clickEvent");
        
        //From fm_widget
        //if user click the img and then play the youtube
        $('#my-video-list>div>img').click(function(){
                                          
            var arryIdType = this.id.split('_');
//            console.log('[click on video list: ]'+this);
            switch(arryIdType[0]){
                case "imgYouTube":
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
                                                      style:"height:57%;margin-top:2.5%;",
                                                      frameborder: "0"
                                                      }).load(function(){
                                                              //TODO: find a better way to have callPlayer() called after videoFrame is prepended
                                                              setTimeout(function(){
                                                                         callPlayer(ytVideoID,'playVideo');
                                                                         }, 1500);
                                                              });

                    $('#'+divID).prepend(videoFrame);
                    $('#'+this.id).remove();

                    break;
                case "imgS3":
                    break;
                default:
                    FM_LOG("[screenPg]No Type!");
            }//End of switch
        });//End of Click function()

        
    },

    
};
