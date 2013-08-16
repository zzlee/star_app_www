FmMobile.screenPg = {
    /*
     1. Get the video from our server when the user enter this page.
     2. Set the info to UI
     3. Play Youtube
     */
    
    //TODO: 小巨蛋頁面 not finishoied


    PAGE_ID: "screenPg",
    highLightVideos: null,
    highLightContent:null,
    
    init: function(){
        FM_LOG("[screenPg] pageinit");
        $('#nav-bar').show();
    },
    
    show: function(){
        FM_LOG("[screenPg] pageshow");
        FmMobile.analysis.trackPage("/screenPg");
        $("#btnHighLights").click(function(){
            $("#btnHighLights > img").attr({src: "images/tab_show_active.png"});
            $("#btnArena > img").attr({src: "images/tab_tanmu.png"});
//            FmMobile.screenPg.loadVideo(FmMobile.screenPg.highLightVideos, "highlight");
            FmMobile.screenPg.loadHighLightContent(FmMobile.screenPg.highLightContent);
        });
        
        $("#btnArena").click(function(){
            $("#btnHighLights > img").attr({src: "images/tab_show.png"});
            $("#btnArena > img").attr({src: "images/tab_tanmu_active.png"});
             FmMobile.screenPg.loadArenaContent();

        });
        
//        FmMobile.screenPg.loadVideo(FmMobile.screenPg.highLightVideos, "highlight");
//        FmMobile.screenPg.loadHighLightContent(FmMobile.screenPg.highLightContent);
        
        //Get the the video from our server.
        var url = starServerURL + "/miix/ugc_hightlights";
        FmMobile.screenPg.highLightContent = new Array();
        
        //json transfer array
        //it's async
        $.ajax({
               url: url,
               dataType: 'json',
               success: function(response){
                               if(response){
                                   $.each(response, function(i, item){
                                          var data ={
                                              OwnerId: item.ownerId,
                                              Name: item.fb_userName,
                                              Genre: item.genre,
                                              Url : item.url,
                              
                                  }
                              FmMobile.screenPg.highLightContent.push(data);
                              });
        //               FmMobile.screenPg.loadVideo(FmMobile.screenPg.highLightVideos, "highlight");
                            FmMobile.screenPg.loadHighLightContent(FmMobile.screenPg.highLightContent);
                       }else{
                           console.log("[error] : " + response.error);
                       }
                   }
               });
    },
    
    loadArenaContent: function(){
        FM_LOG("[screenPg]loadArenaContent");
        var parent = $("#my-video-list");
        parent.html("");
        
        
        //Introduce Nova
        
        var intro = $("<div>").attr({id:"intro", class:"tanmu-instraction"});
        intro.html('台北天幕LED介紹<br><br> 城市之光、台北天幕LED位於台北小巨蛋，顯示面積為100m x 16m，解析度為1743 x 260像素，是台灣最有名的戶外數位媒體。<br><br>'
            + '台北天幕LED由' + '<a href="http://www.novamedia.com.tw/" target="_blank" style="color:#790000">諾亞媒體</a>'
                   + '代理經營。諾亞媒體，數位看板媒體專家。');
        var introImg_1 = $("<img>").attr({
                                        src: "images/tanmu01.png",
                                        class: "tanmu-img"
                                        });
        var introImg_2 = $("<img>").attr({
                                         src: "images/tanmu02.png",
                                         class: "tanmu-img"
                                         });
        var introImg_3 = $("<img>").attr({
                                         src: "images/tanmu03.png",
                                         class: "tanmu-img"
                                         });
        
        intro.appendTo(parent);
        introImg_1.appendTo(parent);
        introImg_2.appendTo(parent);
        introImg_3.appendTo(parent);
    },
    
    loadHighLightContent: function(arryHighlight){
        FM_LOG("[screenPg]loadHighLightContent");
        var parent = $("#my-video-list");
        parent.html("");
        
        //improve efficency
        var arryLen = arryHighlight.length;
        
        for(var i = 0; i < arryLen; i++){
            console.log("userId" + arryHighlight[i].OwnerId.userID);
            var widget = $("<div>").attr({id: arryHighlight[i].OwnerId.userID + "_" + i, class: "content-movie"});
            var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
            var infoDiv = $("<div>").attr({id: "ownerid-info"});
            var ownerPhotoUrl = 'https://graph.facebook.com/' + arryHighlight[i].OwnerId.userID + '/picture/';
            dummyDiv.appendTo(widget);
            
            var Thumbnail = null;
            var ownerPhoto = null;
            var ownerNameDiv = $("<div>").attr({class: "facebook_name"});
            switch(arryHighlight[i].Genre){
                case "miix_story":
                case "miix":
                    if(typeof(arryHighlight[i].Url) != "undefined"){
                        var ytVideoID = (arryHighlight[i].Url.youtube).split('/').pop();
                        console.log("youtubeID " + ytVideoID);
                        //set youtube
                        Thumbnail = $("<img>").attr({
                                                              id: 'imgYouTube_'+ytVideoID,
                                                              src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                              class: "content-movie-img"
                                                              });
                        Thumbnail.appendTo(widget);
                        //set the owner'photo
                        ownerPhoto = $("<img>").attr({
                                                               id: "OwnerId_" + i + "_" + arryHighlight[i].OwnerId.userID,
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
                                                              src: "images/choose_movie.png",
                                                              class: "content-movie-img"
                                                              });
                        Thumbnail.appendTo(widget);
                        
                    }

                    widget.appendTo(parent);
                    break;
                case "miix_image_live_photo":

                        var s3Url = "https://s3.amazonaws.com/miix_content" + arryHighlight[i].Url.s3;
                        Thumbnail = $("<img>").attr({
                                                              id: "imgS3_" + i + "-" + arryHighlight[i].userID,
                                                              src: s3Url,
                                                              class: "content-movie-img",
                                                              style: "height: 90%;"  //fixed the image of height
                                                              });
                    Thumbnail.appendTo(widget);

                    //set the owner'photo
                    ownerPhoto = $("<img>").attr({
                                                      id: "OwnerId_" + i + "_" + arryHighlight[i].OwnerId.userID,
                                                      class: "share",
                                                      src: ownerPhotoUrl
                                                      });
                    //set the owner's name
                    ownerNameDiv.html(arryHighlight[i].Name);
                    ownerPhoto.appendTo(infoDiv);
                    ownerNameDiv.appendTo(infoDiv);
                    infoDiv.appendTo(widget);
            
                    widget.appendTo(parent);
                    break;

                default :
                    console.log("Eroor : no Genre");
            }
            
        }
        
        FmMobile.screenPg.clickEvent();
        
    },
    
    //Deprecated
    loadVideo: function(arryVideo, type){
        FM_LOG("[screenPg]loadVideo");
        
        console.log("[Type] : " + type);
        
        var parent = $("#my-video-list");
        parent.html("");
        
        
        for(var i = 0; i< arryVideo.length; i++){
            var widget = $("<div>").attr({id: arryVideo[i].ProjectId, class: "content-movie"});
            var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});

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

                if(type == "highlight"){
                    this.TitleDiv = $("<div>").attr({class: "screen_dp"});
                    this.PosterDiv = $("<div>").attr({class: "screen_dp"});
                    this.TitleDiv.html("影片名稱： " + arryVideo[i].Title);
                    this.PosterDiv.html("發布者： " + arryVideo[i].PosterId);
                    this.TitleDiv.appendTo(parent);
                    this.PosterDiv.appendTo(parent);
                }else if(type == "arena"){
                    this.Sponsor = $("<div>").attr({class: "screen_dp"});
                    this.Sponsor.html("贊助 贊助 贊助 贊助 贊助 贊助");
                    this.Sponsor.appendTo(parent);
                }
                
            }else{
                console.log("[screenPg.init] videoList : no Youtube URL");
            }
            
        }
        
        FmMobile.screenPg.clickEvent();
        

        
        
    },
    

    
    clickEvent: function(){
        FM_LOG("[screenPg.clickEvent");
        
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

    
};
