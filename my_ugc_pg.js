FmMobile.myUgcPg = {
    PAGE_ID: "myUgcPg",
    myLivevideos: null,

    myContents: null,
    myLiveContents: null,
    Type: null,
    init: function(){
        FM_LOG("[myUgcPg] pageinit");
        $('#nav-bar').show();

        var url = starServerURL + "/miix/members/" + localStorage._id + "/ugcs";
        //    FmMobile.myUgcPg.myContents = new Array();
        if(FmMobile.myUgcPg.Type == "live"){
            FmMobile.myUgcPg.Type = "";
            $("#btnLiveMovie >img").attr({src: "images/tab-active.png"});
            $("#btnMiixMovie >img").attr({src: "images/tab.png"});
            FmMobile.myUgcPg.loadContents(FmMobile.myUgcPg.myLiveContents, "live");
        }else{
            FmMobile.myUgcPg.myContents = new Array();
            
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
                          Url : item.url,
                          No: item.no,
                          }
                          FmMobile.myUgcPg.myContents.push(data);
    //                      console.log("[contentData] " + data);
                          });
                           FmMobile.myUgcPg.Type = "content";
                           //        FmMobile.myUgcPg.myContents = FmMobile.ajaxContents();
                           FmMobile.myUgcPg.loadContents(FmMobile.myUgcPg.myContents, "content");
                   }else{
                   console.log("[error] : " + response.error);
                   }
                   }
                   });

        }
        //TODO:load live video with ajax

     
    },
    
    show: function(){
        FM_LOG("[myUgcPg] pageshow");
        $("#btnMiixMovie").click(function(){
                                 $("#btnMiixMovie > img").attr({src: "images/tab-active.png"});
                                 $("#btnLiveMovie > img").attr({src: "images/tab.png"});
            FmMobile.myUgcPg.Type = "content";
//            FmMobile.myUgcPg.myContents = FmMobile.ajaxContents();            
            FmMobile.myUgcPg.loadContents(FmMobile.myUgcPg.myContents, "content");

         });
        $("#btnLiveMovie").click(function(){
            $("#btnLiveMovie >img").attr({src: "images/tab-active.png"});
            $("#btnMiixMovie >img").attr({src: "images/tab.png"});
             
            //API : /miix/members/:memberId/live_contents
            FmMobile.myUgcPg.myLiveContents = new Array();
            var urlLiveContents = remotesite + "/miix/members/" + localStorage._id + "/live_contents";
            $.ajax({
                url: urlLiveContents,
                dataType: 'json',
                success: function(response){
                                if(response){
                                    $.each(response, function(i, item){
                                           var data ={
                                               Title : item.title,
                                               ProjectId: item.projectId,
                                               Genre: item.genre,
                                               Url : item.url,
                                           }
                                            FmMobile.myUgcPg.myLiveContents.push(data);
                                   });
                                   FmMobile.myUgcPg.Type = "live";
                                   FmMobile.myUgcPg.loadContents(FmMobile.myUgcPg.myLiveContents, "live");
                                }else{
                                    console.log("[error] : " + response.error);
                                }
                            }
                });

         });
        
//            FmMobile.myUgcPg.loadContents(FmMobile.myUgcPg.myContents, "content");

    },
    
    test: function(arry){
    	for(var i = 0 ; i< arry.length; i++)
        console.log(arry[i]);
    },
    
    loadContents: function(arryContents, type){
        FM_LOG("[myUgcPg] loadContents");
        FM_LOG("[type] " + type);

        var parent = $("#my-video-list");
        parent.html("");
        
        FmMobile.myUgcPg.test(arryContents);

        /** Set data to List */
        for(var i = 0; i< arryContents.length; i++){
            if(type == "content"){
                var widget = $("<div>").attr({id: arryContents[i].ProjectId, class: "content-movie"});
            }else if(type == "live"){
                var widget = $("<div>").attr({id: arryContents[i].ProjectId, class: "content-movie", style: "margin-top:20%;"});
            }
            var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
            //For item info ex. Copy Youtube'url, Share on FB and # of video/image
            var info = $("<div>").attr({id: "my-video-info"});
            
            dummyDiv.appendTo(widget);
            switch(arryContents[i].Genre){
                case "miix":
                case "miix_story":
                    if(typeof(arryContents[i].Url) != "undefined"){
                        var ytVideoID = (arryContents[i].Url.youtube).split('/').pop();
                        console.log(i + " ytVideoID :" + ytVideoID + ", No. " + arryContents[i].No);
                        if(type == "content"){
                            this.videoThumbnail = $("<img>").attr({
                                                              id: 'imgYouTube_'+ytVideoID,
                                                              src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                              class: "content-movie-img"
                                                              });
                        }else if(type == "live"){
                            this.videoThumbnail = $("<img>").attr({
                                                                  id: 'imgYouTube_'+ytVideoID,
                                                                  src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                                                  class: "content-movie-img",
                                                                  style: "height: 90%;"  //fixed the image of height
                                                                  });
                        }
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
                        if(type == "content"){
                                this.numberDiv = $("<div>").attr({class: "my-video-number"});
                                this.numberDiv.html("NO." + arryContents[i].No);
                                this.numberDiv.appendTo(info);
                                info.appendTo(widget);
                        }else if(type =="live"){
                            info.appendTo(widget);
                        }
                    }else{


                    }
                    widget.appendTo(parent);
                    break;
                case "miix_image":
                case "miix_image_live_photo":
                    var projectId = arryContents[i].ProjectId;
                    console.log("s3 :" + arryContents[i].Url.s3);
                    if(type == "content"){
                        var s3Url = arryContents[i].Url.s3;
                        this.imageThumbnail = $("<img>").attr({
                                                              id: "imgS3_" +projectId,
                                                              src: s3Url,
                                                              class: "content-movie-img"
                                                              });
                    }else if(type == "live"){
                        var s3Url = "https://s3.amazonaws.com/miix_content" + arryContents[i].Url.s3;
                        this.imageThumbnail = $("<img>").attr({
                                                              id: "imgS3_" +projectId,
                                                              src: s3Url,
                                                              class: "content-movie-img",
                                                              style: "height: 90%;"  //fixed the image of height
                                                              });
                    }
                    this.imageThumbnail.appendTo(widget);
                    this.shareYoutubeDiv = $("<img>").attr({
                                                           id: "copyUrlS3_" + projectId,
                                                           class: "share",
                                                           src: "images/youtube.png"
                                                           });
                    this.shareYoutubeDiv.appendTo(info);
                        
                    this.shareFbDiv = $("<img>").attr({
                                                      id: "shareImgFb_" + projectId,
                                                      class: "share",
                                                      src: "images/facebook.png"
                                                      });
                    this.shareFbDiv.appendTo(info);
                    
                    if(type == "content"){
                        this.numberDiv = $("<div>").attr({class: "my-video-number"});
                        this.numberDiv.html("NO." + arryContents[i].No);
                        this.numberDiv.appendTo(info);
                        info.appendTo(widget);
                    }else if(type == "live"){
                        info.appendTo(widget);
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
//            console.log("click" + this);
                                     
                                          
            var divID = this.parentElement.id;
            var arryIdType = this.id.split('_');
            switch(arryIdType[0]){
                case "imgYouTube":
                    var tempUrlArray = this.src.split('/');
//                    console.log("tempUrlArry " + tempUrlArray[tempUrlArray.length-2])
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
                    }};
                    
                    $('#'+divID).prepend(videoFrame);
                    $('#'+this.id).remove();
                    break;
                case "imgError":
                    console.log("you chosse the error item or the image");
                    break;
                case "imgS3":
                                          
                    FmMobile.srcForMyUgcViewer=this.src;
                    $.mobile.changePage('cropper_test.html');

                    break;
                default:
                    console.log("Click event is not woked");
            }
            

        });
        
        /** Copy youtube url and share to FB */
        $('#my-video-info>img').click(function(){
            var imgID = this.id;        
//            console.log("imgID :" + imgID);
            var tmpIDArray = this.id.split('_');
                                      
            /** template naming
            * copyUrlS3_template-xxxxxxx-xxxxxxxx
            * type:
            * 		mood-xxxxxxx
            * 		check_in-xxxxxxxx
            * 		cultural_and_creative-xxxxxxx
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


            switch(tmpIDArray[0]){
                case "copyUrl":
                	if(device.platform == "iPhone"){
                		/**iOS Plugin */
                		window.clipboardPluginCopy("https://www.youtube.com/watch?feature=player_embedded&v=" + tmpIDArray[1], function() { alert("已複製到剪貼簿")} , function(e){alert(e);});
                	}else if(device.platform == "Android"){
                		/** Android Plugin */
                		window.clipboardManagerCopy(
                			"https://www.youtube.com/watch?feature=player_embedded&v=" + tmpIDArray[1],
                			function(r){alert("Url is copyied")},
                			function(e){alert(e)}
                		);
                	}
                    break;
                case "shareFb":
                    FmMobile.shareFbType="video";
                    FmMobile.srcForMyUgcViewer="http://img.youtube.com/vi/"+tmpIDArray[1]+"/mqdefault.jpg";
                    FmMobile.youtubeVideoUrl="http://www.youtube.com/embed/" +tmpIDArray[1] + "?rel=0&showinfo=0&modestbranding=1&controls=0&autoplay=1";
                    $.mobile.changePage('facebook_share.html');
                   
                    break;
                case "shareImgFb":
                    FmMobile.shareFbType="image";
                    var s3Url4Fb = "https://s3.amazonaws.com/miix_content/user_project/" + tmpIDArray[1] + "/" + tmpIDArray[1];
                    if(FmMobile.myUgcPg.Type == "content"){
                        FmMobile.srcForMyUgcViewer= s3Url4Fb + ".png";
                    }else if(FmMobile.myUgcPg.Type == "live"){
                        FmMobile.srcForMyUgcViewer= s3Url4Fb + ".jpg";
                    }
                    $.mobile.changePage('facebook_share.html');
                    break;            
                case "copyUrlS3":
                    console.log("S3 URL " + tmpIDArray[1]);
                    var s3Url = "https://s3.amazonaws.com/miix_content/user_project/" + tmpIDArray[1] + "/" + tmpIDArray[1];
                    if(FmMobile.myUgcPg.Type == "content"){
                        window.clipboardPluginCopy(s3Url + ".png", function() { alert("已複製到剪貼簿")} , function(e){alert(e);});
                    }
                    else if(FmMobile.myUgcPg.Type == "live"){
                    	if(device.platform == "iPhone"){
                    		window.clipboardPluginCopy(s3Url + ".jpg", function() { alert("已複製到剪貼簿")} , function(e){alert(e);});             
                    	}else if(device.platform == "Android"){
                    		window.clipboardManagerCopy(
                			"https://s3.amazonaws.com/miix_content/user_project/" + tmpIDArray[1] + "/" + tmpIDArray[1] + ".png",
                			function(r){alert("Url is copyied.")},
                			function(e){alert(e)}
                    		);
                    	}
                    }
                    break;
                case "error":
                	alert("Your Url is not available.");
                	break;
                default:
                    alert("You don't touch the button.");

            }
        });

    },
    
    
    
    
};
