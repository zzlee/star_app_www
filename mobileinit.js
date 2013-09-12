var FmMobile = window.FmMobile || {};

var DEBUG = true,
FM_LOG = (DEBUG) ? function(str){ console.log("\n[FM] "+str); } : function(str){} ;








var local = false,
localhost = "http://localhost:3000",
remotesite = starServerURL,
domain = (local) ?  localhost : remotesite;

//var templateSelected; //deprecated
//var fileSelectedURI; //deprecated 
var fileProcessedForCropperURI;
//var photoCroppedURI="./img/face.jpg"; //deprecated 
//var fileObjectID; //deprecated
//var projectID; //deprecated
var croppedArea;
//var customizableObjectDimensions = {}; //deprecated
//var customizedContent = {}; //deprecated
//var customizableObjects = []; //deprecated
//var fileSelected; //deprecated
//var myPhotoCropper; //deprecated

FmMobile.shareProjectID;

FmMobile.viewerBackFlag;
FmMobile.imgForFullPageViewer;

FmMobile.shareFbType;
FmMobile.youtubeVideoUrl;
FmMobile.youtubeShareFbImg;
FmMobile.or_pic_height;
FmMobile.or_pic_width;
FmMobile.mycount;
FmMobile.srcForMyUgcViewer;
FmMobile.myflag=true;
FmMobile.check_in_pic;
FmMobile.checkinTextForFB;
FmMobile.finishNumber;

FmMobile.myUgcScroll_y=0;


FmMobile.rotateValue;


FmMobile.selectAlbum;

//------------------------
FmMobile.longPhoto;
FmMobile.liveTime;

FmMobile.liveType;


//--------------------------


FmMobile.forCropperRotateVal;

var templateMgr = null;

$(document).bind("mobileinit", function(){
                 // Initialization Code here.
                 // $.mobile.ns = "fm";
                 $.mobile.allowCrossDomainPages = true;
                 $.mobile.pushStateEnabled = true;
                 
                 //$.mobile.page.prototype.options.addBackBtn = true;
                 
                 /* pageinit executed after pagebeforecreate */
                 $("#cropperTestPg").live("pageinit", FmMobile.cropperTestPg.load);
                 $("#cropperTestPg").live("pageshow", FmMobile.cropperTestPg.show);
                 
                 $("#ohohshit").live('click',function(){
                                     alert("humm....");
                                     });
                 $("map > #mapAreaBack").live("click",FmMobile.orientationPg.swiperight);
                 $("map > #mapAreaNext").live("click",FmMobile.orientationPg.swipeleft);
                 
                 $('#goOrientation2').live("click",function(){
                                           $.mobile.changePage("orientation_2.html");
                                           FmMobile.analysis.trackPage("/orientation2");

                                           });
                 $('#goOrientation1').live("click",function(){
                                           $.mobile.changePage("orientation_1.html");
                                           });
                 $('#goVerifyPage').live("click",function(){
                                         if(!(localStorage.fb_userID && localStorage.verified=='true'))
                                         {
                                         $.mobile.changePage("login_toc.html", {transition: "slide"});
                                         }
                                         else {
                                         $.mobile.changePage("setting-main.html");
                                         }                                         });

                                  /*
                 $('#mapArea').live('pagebeforeshow',function(){
                                alert("no");
                                      //var change_css = ($('body').width());
                                     
                                      //alert(change_css);
                                      });

                 */
                 
                 $("a").live("click", function(event){
                    event.preventDefault();
                    var url = document.getElementsByTagName("a")[0].getAttribute("url");
                    if(url != null){
                        FmMobile.openBrowser(url);
                    }
                });

                 $("#indexPg").live("pageinit", FmMobile.indexPg.init);
                 $("#indexPg").live("pagebeforeshow", FmMobile.indexPg.beforeshow);
                 $("#indexPg").live("pageshow", FmMobile.indexPg.show);
//                 $("#orie_0").live("pagebeforeshow", FmMobile.orientationPg.init);
//                 $("#orie_0").live("pageshow", FmMobile.orientationPg.show);
                 $("#orie_1").live("pagebeforeshow", FmMobile.orientationPg.init);
                 $("#orie_1").live("pageshow", FmMobile.orientationPg.show);
                 $('div[id^="orie"]').live("swipeleft ", FmMobile.orientationPg.swipeleft);
                 $('div[id^="orie"]').live("swiperight", FmMobile.orientationPg.swiperight);
                 $('div[id^="orie"]').live("pageshow", function(){
                                          // alert(FmMobile.or_pic_height);
        $('#mapAreaBack').attr("coords","0,"+((FmMobile.or_pic_height)*0.5)+","+((FmMobile.or_pic_height)*0.25)+'"');
$('#mapAreaNext').attr("coords","'"+FmMobile.or_pic_width+","+((FmMobile.or_pic_height)*0.5)+","+((FmMobile.or_pic_height)*0.25)+'"');
                                           });
                 $("#myUgcPg").live("pageinit", FmMobile.myUgcPg.init);
                 $("#myUgcPg").live("pageshow", FmMobile.myUgcPg.show);
//                 $("#myUgcPg").live("pageloadlivevideo", FmMobile.myUgcPg.loadMyVideo);  //Deprecated
                 $("#screenPg").live("pageinit", FmMobile.screenPg.init);
                 $("#screenPg").live("pageshow", FmMobile.screenPg.show);
                 $("#screenPg").live("pageloadvideo", FmMobile.screenPg.loadVideo);
                 $("#setting_MainPg").live("pageinit", FmMobile.setting_MainPg.init);
                 $("#setting_MainPg").live("pageshow", FmMobile.setting_MainPg.show);
                 $("#tocPg").live("pageshow", FmMobile.tocPg.show);
                 $("#tocPg").live("pageinit", FmMobile.tocPg.init);
                 $("#customerQuestionPg").live("pageshow", FmMobile.customerQuestionPg.show);
                 $("#customerQuestionPg").live("pageinit", FmMobile.customerQuestionPg.init);
                 $("#loginTocPg").live("pageinit", FmMobile.loginTocPg.init);
                 $("#loginTocPg").live("pageshow", FmMobile.loginTocPg.show);
                 $("#fbLoginPg").live("pageinit", FmMobile.fbLoginPg.init);
                 $("#fbLoginPg").live("pageshow", FmMobile.fbLoginPg.show);
                 $("#verificationPg").live("pageinit", FmMobile.verificationPg.init);
                 $("#verificationPg").live("pageshow", FmMobile.verificationPg.show);
                 $("#phoneNumInputPg").live("pageinit", FmMobile.phoneNumInputPg.init);
                 $("#phoneNumInputPg").live("pageshow", FmMobile.phoneNumInputPg.show);
                 $("#codeInputPg").live("pageinit", FmMobile.codeInputPg.init);
                 $("#codeInputPg").live("pageshow", FmMobile.codeInputPg.show);
                 $("#template_photoCropperPg").live("pageinit", FmMobile.template_photoCropperPg.load);
                 $("#template_photoCropperPg").live("pageshow", FmMobile.template_photoCropperPg.show);
                 
                 $("#settingAboutPg").live("pageinit", FmMobile.settingAboutPg.init);
                 $("#settingAboutPg").live("pageshow", FmMobile.settingAboutPg.show);
                 
                 $("#fbLogoutPg").live("pageinit", FmMobile.fbLogoutPg.init);
                 $("#fbLogoutPg").live("pageshow", FmMobile.fbLogoutPg.show);
                 
                 
                 $("#imgZoomViewerPg").live("pageinit", FmMobile.imgZoomViewerPg.load);
                 $("#imgZoomViewerPg").live("pageshow", FmMobile.imgZoomViewerPg.show);
                 
                 
                 
                 
                 //$("#fullPageViewerPg").live("pageinit", FmMobile.fullPageViewerPg.load);
                 //$("#fullPageViewerPg").live("pageshow", FmMobile.fullPageViewerPg.show);
                 
                 $("#template_mainTemplatePg").live("pageinit", FmMobile.template_mainTemplatePg.init);
                 $("#template_mainTemplatePg").live("pageshow", FmMobile.template_mainTemplatePg.show);
                 $("#template_subTemplatePg").live("pageinit", FmMobile.template_subTemplatePg.init);
                 $("#template_subTemplatePg").live("pageshow", FmMobile.template_subTemplatePg.show);
                 $("#template_previewPg").live("pageinit", FmMobile.template_previewPg.init);
                 $("#template_previewPg").live("pageshow", FmMobile.template_previewPg.show);
                 $("#template_input_textPg").live("pageinit", FmMobile.template_input_textPg.init);
                 $("#template_input_textPg").live("pageshow", FmMobile.template_input_textPg.show);
                 $("#template_pic_pg").live("pageinit", FmMobile.template_pic_pg.load);
                 $("#template_pic_pg").live("pageshow", FmMobile.template_pic_pg .show);
                 $("#template_checkinPg").live("pageinit", FmMobile.template_checkinPg.init);
                 $("#template_checkinPg").live("pageshow", FmMobile.template_checkinPg.show);
                 $("#template_input_miixit").live("pageinit", FmMobile.template_input_miixit.load);
                 $("#template_input_miixit").live("pageshow", FmMobile.template_input_miixit.show);
                 $("#template_miixitPg").live("pageinit", FmMobile.template_miixitPg.init);
                 $("#template_miixitPg").live("pageshow", FmMobile.template_miixitPg.show);
                 $("#template_pic_text_pg").live("pageinit", FmMobile.template_pic_text_pg.load);
                 $("#template_pic_text_pg").live("pageshow", FmMobile.template_pic_text_pg.show);
                 $("#imageTestPg").live("pageinit", FmMobile.imageTestPg.init);
                 $("#imageTestPg").live("pageshow", FmMobile.imageTestPg.show);
                 $("#cellphoneLoginPg").live("pageinit", FmMobile.cellphoneLoginPg.init);
                 $("#cellphoneLoginPg").live("pageshow", FmMobile.cellphoneLoginPg.show);
                 $("#fbLoginSuccessPg").live("pageinit", FmMobile.fbLoginSuccessPg.init);
                 $("#fbLoginSuccessPg").live("pageshow", FmMobile.fbLoginSuccessPg.show);
                 //$("#template_input_checkin").live("pageinit", FmMobile.template_input_checkin.init);
                 //$("#template_input_checkin").live("pageshow", FmMobile.template_input_checkin.show);
                 $("#settingTocPg").live("pageinit", FmMobile.settingTocPg.init);
                 $("#settingTocPg").live("pageshow", FmMobile.settingTocPg.show);
                 $("#settingTermPg").live("pageinit", FmMobile.settingTermPg.init);
                 $("#settingTermPg").live("pageshow", FmMobile.settingTermPg.show);
                 $("#settingFaqPg").live("pageinit", FmMobile.settingFaqPg.init);
                 $("#settingFaqPg").live("pageshow", FmMobile.settingFaqPg.show);
                 $("#facebookSharePg").live("pageinit", FmMobile.facebookSharePg.init);
                 $("#facebookSharePg").live("pageshow", FmMobile.facebookSharePg.show);
                // $("#template_sub_cultural_Pg").live("pageinit", FmMobile.template_sub_cultural_Pg.init);
                 //$("#template_sub_cultural_Pg").live("pageshow", FmMobile.template_sub_cultural_Pg.show);
                 
                 
                 

               
                                 
                 $.mobile.page.prototype.options.addBackBtn = true;
//                  $.mobile.page.prototype.options.addBackBtn = true;
                 /*
                 TemplateMgr.getInstance(function(err, _templateMgr){
                                         //alert("templatmgr");
                                         if (!err) {
                                         templateMgr = _templateMgr;
                                         FmMobile.mycount=templateMgr.getTemplateList().length;
                                         }
                                         else {
                                         console.log("Fail to get templateMgr: "+err);
                                         }
                                         });
                 */
                 
                 setTimeout(function(){
                            navigator.splashscreen.hide();
                            },3000);
                 
                 
                 FM_LOG("<----------------- LOAD JQM and INIT ----------------->");
                 
                 });




FmMobile.videoWorks = [];  //deprecated
FmMobile.profile = null;
FmMobile.ga = null;
FmMobile.pushNotification = null;

FmMobile.selectedTemplateBarImg=null;

FmMobile.selectedTemplate = null;  //the main template that the user chooses, such as "miix_it", "cultural_and_creative", "mood", or "check_in"
FmMobile.selectedSubTemplate = null; //the sub-template that the user chooses. It must be "text", "picture", "text_picture", "check_in",or "video"
FmMobile.userContent = {
		text: null,
		picture: {
			urlOfOriginal: null, //the URL of the original picture that the user chooses
			urlOfOriginalIsFromAndroidAlbum: false, //A flag to indicate that the picture is from Android album.  This is used to overcome the problem that photos taken from Android photo album does not contnet any file extension
			urlOfCropped: null, //the URL of the picture that the user crops. (It is normally a base64 string got from canvas.toDataURL() )
			//url:null,
			crop: {_x:0, _y:0, _w:0, _h:0},  // _x=x_crop/width_picture; _y=y_crop/height_picture; _w=width_crop/width_picture;  _h=height_crop/height_picture
		},
		thumbnail:{
			url:'https://graph.facebook.com/'+localStorage.fb_userID+'/picture?width=200&height=200'
    
		}
};
FmMobile.imageUgc = null;
FmMobile.videoUgc = null;

//For my_ugc contents
FmMobile.myContents = null;
FmMobile.myLiveContents = null;
//For screen contents
FmMobile.highlightContents = [];

//For push notification
FmMobile.pushMessage = null;
FmMobile.isResume = false;

FmMobile.init = {
    
onBodyLoad: function(){
    
    FM_LOG("[Init.onDeviceReady]");
   // document.addEventListener("deviceready", FmMobile.init.platformRotate, true);
    document.addEventListener("deviceready", FmMobile.analysis.init, true);
    document.addEventListener("deviceready", FmMobile.gcm.init, true);
    document.addEventListener("deviceready", FmMobile.apn.init, true);
    document.addEventListener("deviceready", FmMobile.init.isFBTokenValid, true);
    
    document.addEventListener("resume", FmMobile.init.onResume, false);
    document.addEventListener("pause", FmMobile.init.onPause, false);
    document.addEventListener("push-notification", function(event){
//                              FmMobile.ajaxNewVideos();
//                              FmMobile.ajaxNewStoryVideos();
                              FM_LOG("push-notification:");
                              console.dir(event);
                              FmMobile.pushMessage = JSON.parse(JSON.stringify(event.notification));
                              FmMobile.pushNotificationHandler(FmMobile.pushMessage.aps.alert);
                              //TODO:If device received the push notification and show the page
//                              FmMobile.apn.getPendingNotification();
                              //alert(event);
    });
//    localStorage.pixelRatio = window.devicePixelRatio;
    //TODO:
    //document.addEventListener("touchmove", function(e){ e.preventDefault(); }, true);
    
    // Metadata for TEST.
    /*
     localStorage._id = "50c9afd0064d2b8412000013"; // feltmeng.idv: "50b34c4a8198caec0e000001";
     localStorage.fb_accessToken = "AAABqPdYntP0BAOj2VmPf8AVllT1TArJKN3eD9UbzJtzig6oap4aPA5Sx5Ahbl5ypzycr9O09Mbad3NEcPlqZAi8ZBl0Es7A8VXrdavSoLdIVZBMRNVh";
     localStorage.fb_name="Gabriel Feltmeng";
     localStorage.fb_userID = "100004053532907";
     localStorage.verified = false;
     localStorage.fb_name = "Gabriel Feltmeng";
     localStorage.fb_user_pic = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/371504_100004053532907_620345447_q.jpg";
     
     metadata = {
     "id": "100004053532907",
     "name": "Gabriel Feltmeng",
     "first_name": "Gabriel",
     "last_name": "Feltmeng",
     "link": "http://www.facebook.com/gabriel.feltmeng",
     "username": "gabriel.feltmeng",
     "location": {
     "id": "110765362279102",
     "name": "Taipei, Taiwan"
     },
     "gender": "male",
     "timezone": 8,
     "locale": "en_US",
     "verified": true,
     "updated_time": "2013-02-19T07:38:19+0000"
     };
     $.jStorage.set("fb_profile", metadata);*/
    
    
},

/*
platformRotate:function(){
	if(device.platform == "Android"){
		FmMobile.rotateValue=null;
		}else{
			FmMobile.rotateValue=null;
		}
		   // alert(FmMobile.rotateValue);
	
},
    */
onResume: function(){
    FM_LOG("[Init.onResume]");
//    FmMobile.checkNetwork();
    if(localStorage.fb_userID && FmMobile.checkNetwork()){
//      FmMobile.ajaxNewVideos();
//      FmMobile.ajaxNewStoryVideos();
//    	FmMobile.ajaxContents();
//    	FmMobile.ajaxLiveContents();
//    	FmMobile.ajaxHighlightContents();
        
      if((device.platform == "iPhone") || (device.platform == "iPad") || (device.platform == "iPod touch")){
    	  FmMobile.isResume = true;
      	FmMobile.apn.getPendingNotification();
//      	recordUserAction("resumes MiixCard app");
//          $.mobile.changePage("my_ugc.html");
      }else if(device.platform == "Android"){
          
      }
        FmMobile.init.isFBTokenValid();
    }
},
    
onPause: function(){
    if(localStorage.fb_userID){
//        recordUserAction("pauses MiixCard app");
    }
},
    
    isFBTokenValid: function(){
        if(FmMobile.checkNetwork()){
            if(!localStorage.fb_userID)
                return;
            
            var url = remotesite + "/members/fb_token_validity";
            var data = {
                "_id": localStorage._id,
                "fb_id": localStorage.fb_userID,
                "miixToken": localStorage.miixToken,
                "timestamp": Date.now(),
            };
            
            
            $.get(url, data, function(response){
                  if(response.error){
                      console.log("[isFBTokenValid] error: " + JSON.stringify(response.error) );
                  FmMobile.authPopup.FBLogout();
                  
                  }else{
                      console.log("[isFBTokenValid] " + response.message);
                  
                      // Force logout to gain valid user access_token if invalid.
                      if(response.message !== true){
                          FmMobile.authPopup.FBLogout();
                      }
                  }
            });
        }
        
    },
};

//deprecated
FmMobile.addProcessingWork = function(pid){
    
    var url = remotesite + "/miix/videos/miix_videos";
    var data = {
        "_id": localStorage._id,
        "userID": localStorage.fb_userID,
        "pid": pid,
        "miixToken": localStorage.miixToken,
        "timestamp": Date.now()
    };
    
    var processingWorks = ($.jStorage.get("processingWorks")) ? $.jStorage.get("processingWorks") : {};
    processingWorks[pid] = "NoN";
    $.jStorage.set("processingWorks", processingWorks);
    
    $.post(url, data, function(response){
           //var processingWorks = ($.jStorage.get("processingWorks")) ? $.jStorage.get("processingWorks") : {};
           createdOn = new Date(response.createdOn).getTime();
           processingWorks[response.projectId] = createdOn;
           $.jStorage.set("processingWorks", processingWorks);
           });
};
FmMobile.ajaxContents = function(){
    FM_LOG("[ajaxContents]");
    
    var url = starServerURL + "/miix/members/" + localStorage._id + "/ugcs";
//    FmMobile.myUgcPg.myContents = new Array();
    var myContents = new Array();
    
    $.ajax({
           url: url,
           dataType: 'json',
           data:{ miixToken: localStorage.miixToken },
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
                    myContents.push(data);
                          console.log("[contentData] " + data);
                    });
               }else{
                   console.log("[error] : " + response.error);
               }
           }
   });
    
    FmMobile.myContents = myContents;

};

FmMobile.ajaxLiveContents = function(){
    FM_LOG("[ajaxLiveContents]");
    
    //API : /miix/members/:memberId/live_contents
    myLiveContents = new Array();
    var urlLiveContents = remotesite + "/miix/members/" + localStorage._id + "/live_contents";
    $.ajax({
           url: urlLiveContents,
           dataType: 'json',
           data:{ miixToken: localStorage.miixToken },
           success: function(response){
                       if(response){
                           $.each(response, function(i, item){
                              var data ={
                                  ProjectId: item.projectId,
                                  Genre: item.genre,
                                  Url : item.url,
                              }
                              myLiveContents.push(data);
                              });
                       }else{
                           console.log("[error] : " + response.error);
                       }
                   }
   });
    
//    return myLiveContents;
    FmMobile.myLiveContents = myLiveContents;


};


FmMobile.ajaxHighlightContents = function(){
	FM_LOG("[ajaxHighlightContents]");
	highlightContents = new Array();
    $.ajax({
        	url: url,
        	dataType: 'json',
        	data:{ miixToken: localStorage.miixToken },
        	success: function(response){
                        if(response){
                            $.each(response, function(i, item){
                                   var data ={
                                       OwnerId: item.ownerId,
                                       Name: item.fb_userName,
                                       Genre: item.genre,
                                       Url : item.url,
                       
                           }
                           highlightContents.push(data);
                       });
                }else{
                    console.log("[error] : " + response.error);
                }
            }
        });
    FmMobile.highlightContents = highlightContents;
},
//Deprecated
FmMobile.ajaxNewVideos = function(){
    FM_LOG("[ajaxNewVideos]");
    var videoWorks = ($.jStorage.get("videoWorks")) ? $.jStorage.get("videoWorks") : [];
    var processingWorks = ($.jStorage.get("processingWorks")) ? $.jStorage.get("processingWorks") : {};
    var url = domain + "/miix/videos/new_videos";
    var after = -1;
    
    if(!$.isEmptyObject(processingWorks) || $.isEmptyObject(videoWorks)){
        for(var pid in processingWorks){
            if( processingWorks[pid] > after)
                after = processingWorks[pid];
        }
        if(after == -1)
            after = 0;
        
        var query = {
            "_id": localStorage._id,
            "accessToken": localStorage.fb_accessToken,
            "userID": localStorage.fb_userID,
            "timestamp": Date.now(),
            "after": after,
            "miixToken": localStorage.miixToken,
            "genre": 'miix'
        };
        
        // Query if Processing Videos exists .
        $.get(url, query, function(res){
              
              if(res.videoWorks){
              var newVideos = res.videoWorks;
              
              if(newVideos.length > 0){
              FM_LOG("[New videoWorks Available]: " + JSON.stringify(newVideos) );
              
              //var length = videoWorks.length;
              
              for(var i=newVideos.length-1; i > -1; i--){
              //Add new video into videoWorks storage, remove it in processingWorks storage if completed video.
              //if(newVideos[i].fb_id){
              videoWorks.unshift(newVideos[i]);
              if(processingWorks[newVideos[i].projectId])
              delete processingWorks[newVideos[i].projectId];
              
              videoListAdapter.updateDummy(newVideos[i].projectId, newVideos[i]);
              //}
              }
              
              $.jStorage.set("videoWorks", videoWorks);
              $.jStorage.set("processingWorks", processingWorks);
              
              }else{
              FM_LOG("[New Videos are not ready yet!]");
              }
              
              }else{
              FM_LOG("Server Response Error!");
              }
              });
        
    }else{
        FM_LOG("[No More Processing Video!]");
    }
};
//Deprecated
FmMobile.ajaxNewStoryVideos = function(){
    
    FM_LOG("[ajaxNewStoryVideos]");
    var streetVideos = ($.jStorage.get("streetVideos")) ? $.jStorage.get("streetVideos") : [];
    var after = -1;
    var url = remotesite + "/miix/videos/new_videos";
    
    if(!$.isEmptyObject(streetVideos)){
        after = new Date(streetVideos[0].createdOn).getTime(); // First - Newest
        after += 1;
    }else{
        after = 0;
    }
    
    var query = {
        "_id": localStorage._id,
        "accessToken": localStorage.fb_accessToken,
        "userID": localStorage.fb_userID,
        "timestamp": Date.now(),
        "after": after,
        "miixToken": localStorage.miixToken,
        "genre": 'miix_story'
    };
    
    $.get(url, query, function(res){
          
          if(res.videoWorks && res.videoWorks.length > 0){
          
          var newStreeVideos = res.videoWorks;
          
          streetVideos = newStreeVideos.concat(streetVideos);
          FM_LOG("[StoryVideos] " + JSON.stringify(streetVideos));
          $.jStorage.set("streetVideos", streetVideos);
          
          }else{
          if(res.error)
          FM_LOG("[ajaxNewStoryVideos] error: " + res.error);
          else
          FM_LOG("[No New StreetVideo]");
          }
          });
    
};


FmMobile.dooh = function(evt){
    
    var pid = evt.target.parentElement.parentElement.parentElement.parentElement.id;
    FM_LOG("[submitDooh] pid: " + pid);
    if(pid){
        $.jStorage.set("dooh_pid", pid);
        
        if(localStorage.verified == 'true'){
            FmMobile.submitDooh();
            
        }else{
            FmMobile.authentication.verification();
        }
    }else{
        console.log("Wrong pid of Dooh Video.");
    }
    
};

FmMobile.submitDooh = function(){
    var pid = $.jStorage.get("dooh_pid");
    var url = remotesite + "/miix/videos/videos_on_dooh";
    
    var query = {
        "_id": localStorage._id,
        "accessToken": localStorage.fb_accessToken,
        "userID": localStorage.fb_userID,
        "timestamp": Date.now(),
        "miixToken": localStorage.miixToken,
        "pid": pid
    };
    
    $.post(url, query, function(res){
           if(res.message){
           navigator.notification.alert(res.message);
           $.jStorage.set("dooh_pid", null);
           }else {
           navigator.notification.alert('申請登上大螢幕失敗');
           console.log("[submitDooh]"+JSON.stringify(res));
           }
           });
};

/** Google Push Service */
FmMobile.gcm = {
		gcmregid: null,
		senderid: "701982981612",	//project_rId(MiixCard)	
		//project_rId(gcm_test) = 367333162680
		
		init: function(){
			FM_LOG("[GCM.init]");
			if(device.platform == "Android"){
				if(window.plugins){
					window.plugins.GCM.register(FmMobile.gcm.senderid, "FmMobile.gcm.event", FmMobile.gcm.success, FmMobile.gcm.fail );
				}else{
					window.GCM.register(FmMobile.gcm.senderid, "FmMobile.gcm.event", FmMobile.gcm.success, FmMobile.gcm.fail );
				}
			}
			
		},
		
		event: function(e){
			FM_LOG("[GCM.event]");
			switch( e.event ){
			  case 'registered':
				// the definition of the e variable is json return defined in "GCMReceiver.java"
				// In my case on registered I have EVENT and REGID defined
				FmMobile.gcm.gcmregid = e.regid;
				if ( FmMobile.gcm.gcmregid.length > 0 ){
					FM_LOG("[GCM.Regid: " + e.regid + "]");
					localStorage.deviceToken = e.regid;
					
					if(localStorage._id){	//if exsits updated device token
						var url = remotesite + "/members/" + localStorage._id + "/device_tokens";
						var data = { 
							"userID": localStorage._id,
							"platform": device.platform,
							"deviceToken": localStorage.deviceToken,
							"miixToken": localStorage.miixToken
							};
						FM_LOG(JSON.stringify(data));
						$.ajax({
							type: 'PUT',
							url: url,
							data: data,
							success: function(response){
			                   if(response.message){
			                	   FM_LOG("[DeviceToken] from Server : " + response.message);	   
			                   }
			               }
						});
					}
				}
				
				break;

			  case 'message':
				// the definition of the e variable is json return defined in "GCMIntentService.java"
				// In my case on registered I have EVENT, MSG and MSGCNT defined
				FM_LOG("[GCM.message] " + JSON.stringify(e));
//				FmMobile.ajaxNewVideos();
                var jsonMessage = JSON.parse(JSON.stringify(e));
                if(jsonMessage.message){
                    FmMobile.pushNotificationHandler(jsonMessage.message);
                }

				break;

			  case 'error':
				FM_LOG("[GCM.error] " + JSON.stringify(e));
				break;

			  default:
				FM_LOG("[GCM.event] Unknown");
				break;
		    }
		},
		
		success: function(e){
			FM_LOG("[GCM.suceess] Register Successfully, waiting for RegId!");
			FM_LOG("[GCM.suceess] " + JSON.stringify(e));  //If success it returns "OK"
			
		},
		
		fail: function(e){
			FM_LOG("[GCM.Fail] Register Fail! " + JSON.stringify(e));
		},	
};

/** Check network status */
FmMobile.checkNetwork = function(){
    FM_LOG("[checkNetwork]");
//    var connectionType = null;
    /*	In cordova2.2, navigator.network.connection.type replace with navigator.connection.type.
     *	It works on iOS, but Android can't. We need use <2.2 API to handle these issue.
     */
//    if(device.platform == "Android"){
//    	connectionType = navigator.network.connection.type;
//    }else{
//    	connectionType = navigator.connection.type;
//    }

//    FM_LOG("[checkNetwork]Network Status : " + connectionType);
//    FM_LOG("[pixelRatio] : " + localStorage.pixelRatio);
    var connectServerStatus = false;
    $.ajax({
           url: remotesite + "/connectStarServer",
           dataType: 'json',
           success: function(response){
               if(response == 200)
                   connectServerStatus = true;
               
           }
    });
//    if((connectionType == "none") && (!connectServerStatus)){
	if(!connectServerStatus){
        FmMobile.showNotification("enableNetwork");
        return false;
    }else{
        return true;
    }
    


};

/** Apple Push Notification */
FmMobile.apn = {
    
    init: function(){
        FM_LOG("[APN.init]");
        if((device.platform == "iPhone") || (device.platform == "iPad") || (device.platform == "iPod touch")){
            FmMobile.pushNotification = window.plugins.pushNotification;
            FmMobile.apn.registerDevice();
            FmMobile.apn.getPendingNotification();
            //FmMobile.apn.getRemoteNotificationStatus();
            //FmMobile.apn.getDeviceUniqueIdentifier();
        }
    },
        
        
    /* registration on Apple Push Notification servers (via user interaction) & retrieve the token that will be used to push remote notifications to this device. */
    registerDevice: function(){
        FM_LOG("[APN.registerDevice]");
        FmMobile.pushNotification.registerDevice({alert:true, badge:true, sound:true}, function(status) {
                                                 
             /*  if successful status is an object that looks like this:
              *  {"type":"7","pushBadge":"1","pushSound":"1","enabled":"1","deviceToken":"blablahblah","pushAlert":"1"}
              */
             FM_LOG('registerDevice status: ' + JSON.stringify(status) );
             if(status && !localStorage.deviceToken){
                 localStorage.deviceToken = status.deviceToken;
             }
        });
    },
        
        
        /* it can only retrieve the notification that the user has interacted with while entering the app. Returned params applicationStateActive & applicationLaunchNotification enables you to filter notifications by type. */
    getPendingNotification: function(){
        FM_LOG("[APN.getPendingNotification]");
        FmMobile.pushNotification.getPendingNotifications(function(result) {
//            FM_LOG("[pushNotification] " + JSON.stringify(result));
              /* result:
                {"notifications":[{"messageFrom":"Miix.tv","applicationStateActive":"0","applicationLaunchNotification":"0","timestamp":1376554348.356165,"aps":{"alert":"您有一個新影片！","sound":"ping.aiff","badge":1}}]
               }

               */
            FM_LOG('getPendingNotifications: ' + JSON.stringify(['getPendingNotifications', result]) );
            //navigator.notification.alert(JSON.stringify(['getPendingNotifications', notifications]));
            //if(result.notifications.length > 0){
            FM_LOG("["+result.notifications.length + " Pending Push Notifications.]");
            if(result.notifications.length > 0){
                FmMobile.pushMessage = JSON.parse(JSON.stringify(result));
                FmMobile.pushNotificationHandler(FmMobile.pushMessage.notifications[0].aps.alert);
                                                          
            }
            FmMobile.apn.setApplicationIconBadgeNumber(0);
            //}
            //navigator.notification.alert('You have a new video!');

        });
    },
        
        
        /* registration check for this device.
         * {"type":"6","pushBadge":"0","pushSound":"1","enabled":"1","pushAlert":"1"}
         */
    getRemoteNotificationStatus: function(){
        FM_LOG("[APN.getRemoteNotificationStatus]");
        FmMobile.pushNotification.getRemoteNotificationStatus(function(status) {
                                                              FM_LOG('getRemoteNotificationStatus ' + JSON.stringify(status) );
                                                              //navigator.notification.alert(JSON.stringify(['getRemoteNotificationStatus', status]));
                                                              });
    },
        
        
        /* set the application badge number (that can be updated by a remote push, for instance, resetting it to 0 after notifications have been processed). */
    setApplicationIconBadgeNumber: function(badgeNum){
        FM_LOG("[APN.setApplicationIconBadgeNumber]");
        FmMobile.pushNotification.setApplicationIconBadgeNumber(badgeNum, function(status) {
                                                                FM_LOG('setApplicationIconBadgeNumber: ' + JSON.stringify(status) );
                                                                //navigator.notification.alert(JSON.stringify(['setBadge', status]));
                                                                });
    },
        
        
        /* clear all notifications from the notification center. */
    cancelAllLocalNotifications: function(){
        FM_LOG("[APN.cancelAllLocalNotifications]");
        FmMobile.pushNotification.cancelAllLocalNotifications(function() {
                                                              //navigator.notification.alert(JSON.stringify(['cancelAllLocalNotifications']));
                                                              });
    },
        
        
        //DEPRECATED
        /* retrieve the original device unique id. (@warning As of today, usage is deprecated and requires explicit consent from the user) */
    getDeviceUniqueIdentifier: function(){
        FM_LOG("[APN.getDeviceUniqueIdentifier]");
        pushNotification.getDeviceUniqueIdentifier(function(uuid) {
                                                   FM_LOG('getDeviceUniqueIdentifier: ' + uuid);
                                                   });
    },
};



/** Google Analytics
 *  Platform : Android and iOS 
 * */
FmMobile.analysis = {
	    
	    nativePluginResultHandler: function(result){
	        FM_LOG("[analysis.resultHandler] " + result);
	    },
	    
	    nativePluginErrorHandler: function(error){
	        FM_LOG("[analysis.errorHandler] " + error);
	    },
	    
	    init: function(){
	        FM_LOG("[analysis.init]");
	        var gaId = "UA-43771072-2"; 
	        //UA-37288251-4 : http://www.feltmeng.idv.tw
	        //UA-37288251-1 : http://www.miix.tv
	        FmMobile.ga = window.plugins.gaPlugin;
	        FmMobile.ga.init(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler, gaId, 10);
	    },
	    
	    goingAway: function(){
	    	FM_LOG("[analysis.goingAway]");
	        FmMobile.ga.exit(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler);
	    	
	    },
	    
	    trackEvent: function(category, action, label, value){
	    	FM_LOG("[analysis.trackEvent]");
	    	FM_LOG("[analysis.trackEvent] category : " + category);
	    	FM_LOG("[analysis.trackEvent] action : " + action);
	    	FM_LOG("[analysis.trackEvent] label : " + label);
	    	FM_LOG("[analysis.trackEvent] value : " + value);
	        FmMobile.ga.trackEvent(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler, category, action, label, 1);
	    },
	    
	    setVariable: function(key, value, index){
	    	FM_LOG("[analysis.setVariable]");
	        FmMobile.ga.setVariable(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler, key, value, index);
	    	
	    },
	    
	    trackPage: function(url){
	    	FM_LOG("[analysis.trackPage] url :" + url);
	    	FmMobile.ga.trackPage(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler, url);
	    },
	};



FmMobile.authPopup = {
PAGE_ID: "authPg",
    
fbStatusPolling: function(){ //DEPRECATED - used in early implementation to handle FB auth page
    
    FM_LOG("[Long Polling FB Status:]");
    
    var url = domain + "/api/fbStatus",
    query = {"timestamp": Date.now()};
    
    $.get(url, query, function(response){
          
          if(response.data){
          if(response.data.userID){
          FM_LOG("\nRes of [FB Status]: Connected....Redirect to Home Page");
          FM_LOG(JSON.stringify(response.data));
          
          localStorage.fb_userID = response.data.userID;
          localStorage.fb_accessToken = response.data.accessToken;
          localStorage._id = response.data._id;
         // localStorage.fb_user_pic=response.data.fb_user_pic;
          sessionStorage.sessionID = response.data.sessionID;
          
          if(localStorage.verified == 'true'){
          alert("gg");
          }else{
          $.mobile.changePage("verification.html");}
          
          }else{
          // Future - Handle FB Authentication Fail Here. - Popup something.
          }
          window.plugins.childBrowser.close();
          return;
          }
          
          FM_LOG("\nRes of [FB Status]: Keep Waiting.");
          // Repeat Polling until connected.
          FmMobile.authPopup.fbStatusPolling();
          });
},
    
init: function(){
    FM_LOG("[authPopup Init]");
    if(FmMobile.checkNetwork()){
    //miixcard metadata
    var client_id = "430008873778732";
    //var redir_url = ["http://www.miix.tv/welcome.html", "https://www.miix.tv/welcome.html"];
    
    
    var redir_url = ["http://www.ondascreen.com/welcome.html"];
    // watasistar metadata
    /*
     var client_id = "243619402408275";
     var redir_url = ["http://www.feltmeng.idv.tw/welcome.html", "https://www.feltmeng.idv.tw/welcome.html"];
     */
    var fb = FBConnect.install();
    fb.connect(client_id, redir_url[0], "touch");
    fb.onConnect = FmMobile.authPopup.onFBConnected;
    }
},
    
    onFBConnected: function(){
        FM_LOG("[onFBConnected]: ");
        // if(!localStorage.fb_userID)
        var url = remotesite + "/members/fb_info";
        data = {"authResponse": {
            "userID": localStorage.fb_userID,
            "userName": localStorage.fb_name,
            "email": localStorage.email,
            "accessToken": localStorage.fb_accessToken,
            "expiresIn":  localStorage.expiresIn,
            "deviceToken": localStorage.deviceToken,
            "devicePlatform": device.platform,
            "device": device.uuid,
            "timestamp": Date.now()
            }
        };
        FM_LOG(JSON.stringify(data));
        
        $.post(url, data, function(response){
            FM_LOG("[SignUp with FB]: ");
            if(response.data){
                localStorage._id = response.data._id;
                localStorage.miixToken = response.data.miixToken;
                //localStorage.fb_user_pic=response.data.fb_user_pic;
                localStorage.fb_accessToken = response.data.accessToken;
                localStorage.verified = (response.data.verified) ? response.data.verified : 'false';
                FmMobile.userContent.thumbnail.url='https://graph.facebook.com/'+localStorage.fb_userID+'/picture/';
               
                FmMobile.userContent.fb_name=localStorage.fb_name;
               //localStorage.verified='true';//此行為了測試電話認證！
                FM_LOG("localStorage" + JSON.stringify(localStorage));
               
                   // Each time of Login, pull all videos.
        //           FmMobile.ajaxNewVideos();
        //           FmMobile.ajaxNewStoryVideos();
               
                if(localStorage.verified == 'true'){
                    $.mobile.changePage("template-main_template.html");
               
                }else{
                    $.mobile.changePage("cellphone_login.html");
                }

                window.plugins.childBrowser.close();
               
    //           FmMobile.analysis.setVariable("Facebook_ID", localStorage.fb_userID, 1);
//                   recordUserAction("successfully logs in with FB");
            }else{
                   FM_LOG("[Sinup with FB failed!]");
            }
        });
        
    },
    
    FBLogout: function() {
        FmMobile.analysis.trackEvent("Button", "Click", "Logout", 5);
        recordUserAction("log out");
        var fb = FBConnect.install();
        delete localStorage._id;
        delete localStorage.miixToken;
        delete localStorage.fb_userID;
        delete localStorage.fb_name;
        delete localStorage.fb_accessToken;
        delete localStorage.fb_user_pic;
        //delete localStorage.verified;
        if(localStorage.email) delete localStorage.email;
        
        
      
        
        
        
        $.jStorage.set("videoWorks", []);
        $.jStorage.set("processingWorks", {});
        $.jStorage.set("streetVideos", []);
        $.jStorage.set("fb_profile", null);
        fb.Logout();
        $.mobile.changePage("fb_login.html");
        
    },
//deprecated
sendDeviceToken: function(){
    FM_LOG("[sendDeviceToken] ");
    var url = domain + "/members/device_tokens";
    var query = {"user":{
        "_id": localStorage._id,
        "accessToken": localStorage.fb_accessToken,
        "userID": localStorage.fb_userID,
        "deviceToken": localStorage.deviceToken,
        "devicePlatform": device.platfom,
        "device": device.uuid,
        "miixToken": localStorage.miixToken,
        "timestamp": Date.now()
    }};
    
    $.post(url, query, function(response){
           FM_LOG("[From Server]: " + response.message);
           });
},

  
postFbMessage:function(){
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        
    access_token: localStorage.fb_accessToken,
    message: FmMobile.userContent.text,
    link:FmMobile.srcForMyUgcViewer,
    name:"這是"+localStorage.fb_name+"的試鏡編號"+FmMobile.finishNumber+"作品，有機會在台北天幕LED播出。上大螢幕APP敬上。",
        //description:"上大螢幕APP 敬上。"
   //picture:FmMobile.srcForMyUgcViewer,
    //privacy:{'value':'SELF'},
    
    };
    $.post(url,params, function(response){
           //alert("已打卡！！");
           FmMobile.showNotification("share");
           var ugcProjectId=FmMobile.shareProjectID;
           
           $.ajax( starServerURL+"/miix/fb_ugcs/"+ugcProjectId, {
                  type: "PUT",
                  data: {
                      fb_postId:response.id,
                      miixToken: localStorage.miixToken
                  },
                  success: function(data, textStatus, jqXHR ){
                      console.log("Successfully upload projectID and FBpost id to server.");
                      callback(null);
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                      console.log("Failed to upload image UGC to server: "+errorThrown);
                      callback("Failed to upload image UGC to server: "+errorThrown);
                  }
                  
                  
                  });

           });
},
  
    
    
    
    
postFbMessage_live:function(){
    //------- handle time-----------
    
   var post_live_time=new Date(parseInt(FmMobile.liveTime));
    var post_year=post_live_time.getFullYear();
    var post_month=post_live_time.getMonth();
    var post_date=post_live_time.getDate();
    var post_hours=post_live_time.getHours();
    var post_pmAm;
    if(post_hours>12){
        post_pmAm="下午";
    }else{
        post_pmAm="上午";
    }
    var post_format_hour;
    if(post_hours>12){
        post_format_hour=post_hours-12;
    }else{
        post_format_hour=post_hours;
    }
    
   var post_minute= post_live_time.getMinutes();
    
    var timeString=post_year+"年"+post_month+"月"+post_date+"日"+post_pmAm+post_format_hour+":"+post_minute;
    var timeString_short=post_year+"年"+post_month+"月"+post_date+"日";
    //----- end of handle time
    
    var url_album = 'https://graph.facebook.com/me/albums';
    
    var params_album = {
    access_token: localStorage.fb_accessToken,
    name:"實況記錄："+timeString_short+"登上台北天幕LED",
    message:FmMobile.userContent.text
    };
    
    $.post(url_album,params_album, function(response){
           
           
           
           var ugcProjectId=FmMobile.shareProjectID;
           
           $.ajax( starServerURL+"/miix/fb_userLiveContents/"+ugcProjectId, {
                  type: "PUT",
                  data: {
                  fb_postId:response.id,
                  miixToken: localStorage.miixToken
                  },
                  success: function(data, textStatus, jqXHR ){
                  console.log("Successfully upload result image UGC to server.");
                  callback("haha");
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  console.log("Failed to upload image UGC to server: "+errorThrown);
                  callback("Failed to upload image UGC to server: "+errorThrown);
                  }
                  
                  
                  });
           
           //alert("create album！！");
           var album_id=response.id;
           var url_photo='https://graph.facebook.com/'+album_id+'/photos';
           
           var params_photo_1={
           access_token: localStorage.fb_accessToken,
           url:FmMobile.srcForMyUgcViewer,
           message:localStorage.fb_name+"於"+timeString+"，登上台北天幕LED，感謝他精采的作品！\n上大螢幕APP粉絲團：https://www.facebook.com/OnDaScreen"
           
           };
           var params_photo_2={
           access_token: localStorage.fb_accessToken,
           url:FmMobile.longPhoto,
            message:localStorage.fb_name+"於"+timeString+"，登上台北天幕LED，這是原始刊登素材，天幕尺寸：100公尺x16公尺。\n上大螢幕APP粉絲團：https://www.facebook.com/OnDaScreen"
           
           };
           
           $.post(url_photo,params_photo_1, function(response){
                 // alert("已打卡1！！");
                   FmMobile.showNotification("share");
                  
                  
                  var ugcProjectId=FmMobile.shareProjectID;
                  
                  $.ajax( starServerURL+"/miix/fb_userLiveContents/"+ugcProjectId, {
                         type: "PUT",
                         data: {
                         fb_postId:response.id,
                         miixToken: localStorage.miixToken
                         },
                         success: function(data, textStatus, jqXHR ){
                         console.log("Successfully upload result image UGC to server.");
                         callback("haha");
                         },
                         error: function(jqXHR, textStatus, errorThrown){
                         console.log("Failed to upload image UGC to server: "+errorThrown);
                         callback("Failed to upload image UGC to server: "+errorThrown);
                         }
                         
                         
                         });
                  
                  
                  
                  });
           
           $.post(url_photo,params_photo_2, function(response){
                 // alert("已打卡2！！");
                  
                  
                  var ugcProjectId=FmMobile.shareProjectID;
                  
                  $.ajax( starServerURL+"/miix/fb_userLiveContents/"+ugcProjectId, {
                         type: "PUT",
                         data: {
                         fb_postId:response.id,
                         miixToken: localStorage.miixToken
                         },
                         success: function(data, textStatus, jqXHR ){
                         console.log("Successfully upload result image UGC to server.");
                         callback("haha");
                         },
                         error: function(jqXHR, textStatus, errorThrown){
                         console.log("Failed to upload image UGC to server: "+errorThrown);
                         callback("Failed to upload image UGC to server: "+errorThrown);
                         }
                         
                         
                         });
                  
                  });
           
           });
    
},
    
    
postFbVideoMessage_live:function(){
    
    //------- handle time-----------
    
    var post_live_time=new Date(parseInt(FmMobile.liveTime));
    var post_year=post_live_time.getFullYear();
    var post_month=post_live_time.getMonth();
    var post_date=post_live_time.getDate();
    var post_hours=post_live_time.getHours();
    var post_pmAm;
    if(post_hours>12){
        post_pmAm="下午";
    }else{
        post_pmAm="上午";
    }
    var post_format_hour;
    if(post_hours>12){
        post_format_hour=post_hours-12;
    }else{
        post_format_hour=post_hours;
    }
    
    var post_minute= post_live_time.getMinutes();
    
    var timeString=post_year+"年"+post_month+"月"+post_date+"日"+post_pmAm+post_format_hour+":"+post_minute;
    var timeString_short=post_year+"年"+post_month+"月"+post_date+"日";
    //----- end of handle time
    
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        
    access_token: localStorage.fb_accessToken,
    message: FmMobile.userContent.text,
    link:FmMobile.youtubeVideoUrl,
    name:localStorage.fb_name+"於"+timeString+"，登上台北天幕LED，感謝他精采的作品！",
         description:"上大螢幕APP粉絲團：https://www.facebook.com/OnDaScreen"
        //picture:FmMobile.srcForMyUgcViewer,
    //privacy:{'value':'SELF'}
        
    };
    $.post(url,params, function(response){
           //           alert("已打卡！！");
           FmMobile.showNotification("share");
           
           var ugcProjectId=FmMobile.shareProjectID;
           
           $.ajax( starServerURL+"/miix/fb_userLiveContents/"+ugcProjectId, {
                  type: "PUT",
                  data: {
                  fb_postId:response.id,
                  miixToken: localStorage.miixToken
                  },
                  success: function(data, textStatus, jqXHR ){
                  console.log("Successfully upload result image UGC to server.");
                  callback("haha");
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  console.log("Failed to upload image UGC to server: "+errorThrown);
                  callback("Failed to upload image UGC to server: "+errorThrown);
                  }
                  
                  
                  });
           
           });
},
    
postFbVideoMessage:function(){
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        
    access_token: localStorage.fb_accessToken,
    message: FmMobile.userContent.text,
    link:FmMobile.youtubeVideoUrl,
        name:"這是"+localStorage.fb_name+"的試鏡編號"+FmMobile.finishNumber+"作品，有機會在台北天幕LED播出。上大螢幕APP敬上。"
   // description:"上大螢幕APP 敬上。"
        //picture:FmMobile.srcForMyUgcViewer,
        //privacy:{'value':'SELF'}
        
    };
    $.post(url,params, function(response){
//           alert("已打卡！！");
           FmMobile.showNotification("share");

           var ugcProjectId=FmMobile.shareProjectID;
           
           $.ajax( starServerURL+"/miix/fb_ugcs/"+ugcProjectId, {
                  type: "PUT",
                  data: {
                      fb_postId:response.id,
                      miixToken: localStorage.miixToken
                  },
                  success: function(data, textStatus, jqXHR ){
                      console.log("Successfully upload result image UGC to server.");
                      callback("haha");
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                      console.log("Failed to upload image UGC to server: "+errorThrown);
                      callback("Failed to upload image UGC to server: "+errorThrown);
                  }
                  
                  
                  });

           });
},
postCheckinMessage:function(){
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
    name:"路經貴寶地！"+localStorage.fb_name+"路過台北小巨蛋，他的打卡有機會在台北天幕LED播出，上大螢幕APP 敬上。",
    
    access_token: localStorage.fb_accessToken,
    //message: FmMobile.checkinTextForFB,
    link:FmMobile.check_in_pic,
    place:"157142054372631"
        //picture:FmMobile.srcForMyUgcViewer,
        //privacy:{'value':'SELF'},
        
    };
    $.post(url,params, function(response){
//           alert("已打卡！！");
           FmMobile.showNotification("checkIn");
           var ugcProjectId=FmMobile.shareProjectID;
           
           $.ajax( starServerURL+"/miix/fb_ugcs/"+ugcProjectId, {
                  type: "PUT",
                  data: {
                      fb_postId:response.id,
                      miixToken: localStorage.miixToken
                  },
                  success: function(data, textStatus, jqXHR ){
                      console.log("Successfully upload result image UGC to server.");
                      callback("haha");
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                      console.log("Failed to upload image UGC to server: "+errorThrown);
                      callback("Failed to upload image UGC to server: "+errorThrown);
                  }
                  
                  
                  });

           });
}

   
};
    


FmMobile.bindClickEventToNavBar = function(){
    $("#nav-bar > div").click(function(){
        if (this.id == "btnTemplate"){
          $(this).children("img").attr({src:"images/m1-active.png"});
          $("#btnMyUgc").children("img").attr({src:"images/m2.png"});
          $("#btnScreen").children("img").attr({src:"images/m3.png"});
          $("#btnSetting").children("img").attr({src:"images/m4.png"});
          $.mobile.changePage("template-main_template.html");
        }else if (this.id == "btnMyUgc") {
          $(this).children("img").attr({src:"images/m2-active.png"});
          $("#btnTemplate").children("img").attr({src:"images/m1.png"});
          $("#btnScreen").children("img").attr({src:"images/m3.png"});
          $("#btnSetting").children("img").attr({src:"images/m4.png"});
        $.mobile.changePage("my_ugc.html");
        }else if (this.id == "btnScreen") {
          $(this).children("img").attr({src:"images/m3-active.png"});
          $("#btnTemplate").children("img").attr({src:"images/m1.png"});
          $("#btnMyUgc").children("img").attr({src:"images/m2.png"});
          $("#btnSetting").children("img").attr({src:"images/m4.png"});
          $.mobile.changePage("screen.html");
        }else if (this.id == "btnSetting") {
          $(this).children("img").attr({src:"images/m4-active.png"});
          $("#btnTemplate").children("img").attr({src:"images/m1.png"});
          $("#btnMyUgc").children("img").attr({src:"images/m2.png"});
          $("#btnScreen").children("img").attr({src:"images/m3.png"});
          $.mobile.changePage("setting-main.html");
        }
    });
};

//Handle push notifications including APN and GCM

FmMobile.pushNotificationHandler = function(pushMsg){
    FM_LOG("[pushNotficationHandler]:");
    FM_LOG("[pushNotficationHandler] Platform : " + device.platform);
    FM_LOG("[pushNotficationHandler] Message : " + pushMsg);
    FM_LOG("[pushNotficationHandler] isResume : " + FmMobile.isResume);
    switch(pushMsg){
        case "您有一個新影片！":
            if(FmMobile.isResume && ($.mobile.activePage.attr('id') == "myUgcPg")){
                if(FmMobile.myUgcPg.Type == "content"){
                    //isResume and my_ugc_pg(content)
                    $.mobile.changePage("my_ugc.html", { reloadPage : true });
                    FmMobile.isResume = false;
                }else if(FmMobile.myUgcPg.Type == "live"){
                   FmMobile.isResume = false; 
                }
            }else if(FmMobile.isResume && ($.mobile.activePage.attr('id') != "myUgcPg")){
                //isResume but !my_ugc_pg
                FmMobile.myUgcPg.Type = "content";
                $.mobile.changePage("my_ugc.html");
                FmMobile.isResume = false;
            }else if(($.mobile.activePage.attr('id') == "myUgcPg")){
                if(FmMobile.myUgcPg.Type == "content"){
                    //my_ugc(content)
                    FmMobile.showNotification("newUgc");
                    $.mobile.changePage('my_ugc.html', { reloadPage : true });
                }else if(FmMobile.myUgcPg.Type == "live"){
                    FmMobile.showNotification("newUgc");
                }
                
            }else{
                FmMobile.showNotification("newUgc");
            }

        break;
        default:
            FM_LOG("[pushNotficationHandler] otherType :" + pushMsg);
            FmMobile.showNotification(pushMsg);
    }


    
},

FmMobile.Confirm = function(){
    //Just for FmMobile.showNotification
    //Do nothing.
};



FmMobile.showNotification = function(fun){
    FM_LOG("[showNotification] :" + fun );
    var appName = "上大螢幕";
    
    switch(fun){
        case "uploadUgc":
            navigator.notification.confirm("上傳完成！", FmMobile.Confirm(), appName, "確定");
            break;
        case "copyUrl":
            navigator.notification.confirm("已複製連結！", FmMobile.Confirm(), appName, "確定");
            break;
        case "error":
            navigator.notification.confirm("錯誤發生，請通知我們！", FmMobile.Confirm(), appName, "確定");
            break;
        case "moreWords":
            navigator.notification.confirm("超過每行限制字數!", FmMobile.Confirm(), appName, "確定");
            break;
        case "moreLines":
            navigator.notification.confirm("超過3行囉！", FmMobile.Confirm(), appName, "確定");
            break;
        case "nullText":
            navigator.notification.confirm("請輸入文字！", FmMobile.Confirm(), appName, "確定");
            break;
        case "newUgc":
            navigator.notification.confirm("您有一個新影片！", FmMobile.Confirm(), appName, "確定");
            break;
        case "informLiveTime":
            navigator.notification.confirm("您的投件即將上映！", FmMobile.Confirm(), appName, "確定");
            break;
        case "settingQaSend":
            navigator.notification.confirm("問題已送出！", FmMobile.Confirm(), appName, "確定");
            break;
        case "gpsDeny":
            navigator.notification.confirm("完全沒有定位, 想通時請至\n設定->隱私->定位服務\n交出你的坐標！", FmMobile.Confirm(), appName, "確定");
            break;
        case "gpsDenyAndroid":
            navigator.notification.confirm("I can't see you...\n 麻煩開啓一下GPS,或到空曠陰涼處,多謝！", FmMobile.Confirm(), appName, "確定");
            break;
        case "wrongPlace":
            navigator.notification.confirm("其實你不在小巨蛋對吧...\n臺北市松山區南京東路4段2號\n歡迎來打卡！\n(請移動到眼睛看得到天幕的地方)", FmMobile.Confirm(), appName, "確定");
            break;
        case "inAreaTextOver":
            navigator.notification.confirm("超過三行囉！第四行在天幕上看不到啦！", FmMobile.Confirm(), appName, "確定");
            break;
        case "enableNetwork":
            navigator.notification.confirm("本服務必須連接網路，請檢查您的網路環境。", FmMobile.Confirm(), appName, "確定");
            break;
        case "uploadFailed":
            navigator.notification.confirm("上傳失敗，請重新再試。", FmMobile.Confirm(), appName, "確定");
            break;
        case "share":
            navigator.notification.confirm("分享完成！", FmMobile.Confirm(), appName, "確定");
            break;
        case "checkIn":
            navigator.notification.confirm("已成功在小巨蛋打卡！", FmMobile.Confirm(), appName, "確定");
            break;
        case "sendCode":
            navigator.notification.confirm("認證碼已送出。", FmMobile.Confirm(), appName, "確定");
            break;
        case "reSendCode":
            navigator.notification.confirm("請於三分鐘後再發送一次認證碼請求,謝謝！", FmMobile.Confirm(), appName, "確定");
            break;
        case "wrongPhoneNumber":
            navigator.notification.confirm("手機號碼好像不是長這樣喔...請重新輸入", FmMobile.Confirm(), appName, "確定");
            break;
        case "inputWrongCode":
            navigator.notification.confirm("手機認證碼不太對喔...請重新輸入", FmMobile.Confirm(), appName, "確定");
            break;
        case "waitForCode":
            navigator.notification.confirm("手機號碼合格！即將發送認證碼4碼\n請稍候謝謝！", FmMobile.Confirm(), appName, "確定");
            break;
        case "codeVerifySuccess":
            navigator.notification.confirm("恭喜電話認證成功！\n準備上大螢幕吧！！", FmMobile.Confirm(), appName, "確定");
            break;
        default:
//            console.log("ShowNotification is not worked");
            navigator.notification.confirm(fun, FmMobile.Confirm(), appName, "確定");
    }
    
};

FmMobile.changePageToMyUgc = function(buttonIndex){
	//For FmMobile.showNotification to change page
	//In Cordova 2.2 navigator.notification.confirm has the bug
	
//	localStorage.button = button;
	alert('You selected ' + buttonIndex);
//	FM_LOG("[changePageToMyUgc] :" + buttonIndex);
//	if(button == "undefined"){
//		$.mobile.changePage("my_ugc.html");
//	}
};

//Open external website
FmMobile.openBrowser = function(url){
    FM_LOG("[openBrowser] url: " + url);
    if(FmMobile.checkNetwork()){
        window.plugins.childBrowser.showWebPage(url);
    }
};

//Set a dive under the Page
FmMobile.dummyDiv = function(){
//    FmMobile.analysis.trackPage("/dummyDiv");
    var paddingBottomDiv = $('[data-role="page"]').height() * 0.1847;
    $('[data-role="content"]').attr({style:"padding-bottom:" + paddingBottomDiv + "px;"});
};

//Hide keyboard for Android
FmMobile.hideKeyboard = function(){
	document.addEventListener("hidekeyboard", function() {
		if(device.platform == "Android"){
			$("#nav-bar").show();
		}
	}, false);
};

//Show keyboard for Android
FmMobile.showKeyboard = function(){
	document.addEventListener("showkeyboard", function() {
		if(device.platform == "Android"){
			$("#nav-bar").hide();
		}
	}, false);
};

//Hide back button for Android
FmMobile.hideBack = function(){
	if(device.platform == "Android"){
		$("#back_setting").hide();
	}
};

//Change setting background for Android
FmMobile.changeBackground = function(){
	if(device.platform == "Android"){
		$("div[class^='setting-content']").attr({class:"setting-content-android"});
	}
};

//Change introduce background for Android
FmMobile.changeIntroduceBackground = function(){
	if(device.platform == "Android"){
		$("div[class^='template_introduce']").attr({class:"template_introduce-android"});
	}
	
};
