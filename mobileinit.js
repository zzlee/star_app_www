var FmMobile = window.FmMobile || {};

var DEBUG = true,
FM_LOG = (DEBUG) ? function(str){ console.log("\n[FM] "+str); } : function(str){} ;








var local = false,
localhost = "http://localhost:3000",
remotesite = starServerURL,
domain = (local) ?  localhost : remotesite;

var templateSelected;
var fileSelectedURI, fileProcessedForCropperURI;
var photoCroppedURI="./img/face.jpg";
var fileObjectID;
var projectID;
var croppedArea;
var customizableObjectDimensions = {};
var customizedContent = {};
var customizableObjects = [];
var fileSelected;
var myPhotoCropper;


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
                 
                 
                 $("#indexPg").live("pageinit", FmMobile.indexPg.init);
                 $("#indexPg").live("pagebeforeshow", FmMobile.indexPg.beforeshow);
                 $("#indexPg").live("pageshow", FmMobile.indexPg.show);
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
                 $("#photoCropperPg").live("pageinit", FmMobile.photoCropperPg.load);
                 $("#photoCropperPg").live("pageshow", FmMobile.photoCropperPg.show);
                 
                 
                 
                 $("#fullPageViewerPg").live("pageinit", FmMobile.fullPageViewerPg.load);
                 $("#fullPageViewerPg").live("pageshow", FmMobile.fullPageViewerPg.show);
                 
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
                 $("#template_input_checkin").live("pageinit", FmMobile.template_input_checkin.init);
                 $("#template_input_checkin").live("pageshow", FmMobile.template_input_checkin.show);
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
                  $.mobile.page.prototype.options.addBackBtn = true;
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




FmMobile.videoWorks = [];
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
			crop: {_x:0, _y:0, _w:1, _h:1},  // _x=x_crop/width_picture; _y=y_crop/height_picture; _w=width_crop/width_picture;  _h=height_crop/height_picture
		},
		thumbnail:{
			url:'https://graph.facebook.com/'+localStorage.fb_userID+'/picture/'
    
		}
};

//For my_ugc contents
FmMobile.myContents = null;
FmMobile.myLiveContents = null;
//For screen contents
FmMobile.highlightContents = [];

FmMobile.init = {
    
onBodyLoad: function(){
    
    FM_LOG("[Init.onDeviceReady]");
    
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
                              //navigator.notification.alert(JSON.stringify(['push-notification!', event]));
                              navigator.notification.alert('You have a new video!');
                              //alert(event);
                              });
    
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
    
onResume: function(){
    FM_LOG("[Init.onResume]");
    if(localStorage.fb_userID){
//      FmMobile.ajaxNewVideos();
//      FmMobile.ajaxNewStoryVideos();
    	FmMobile.ajaxContents();
    	FmMobile.ajaxLiveContents();
    	FmMobile.ajaxHighlightContents();
      if(device.platform == "iPhone"){
      	FmMobile.apn.getPendingNotification();
//      	recordUserAction("resumes MiixCard app");
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
    if(!localStorage.fb_userID)
        return;
    
    var url = remotesite + "/members/fb_token_validity";
    var data = {
        "_id": localStorage._id,
        "fb_id": localStorage.fb_userID,
        "timestamp": Date.now(),
    };
    
    
    $.get(url, data, function(response){
          if(response.error){
          console.log("[isFBTokenValid] error: " + JSON.stringify(response.error) );
          
          }else{
          console.log("[isFBTokenValid] " + response.message);
          
          // Force logout to gain valid user access_token if invalid.
          if(response.message !== true){
          FmMobile.authPopup.FBLogout();
          }
          }
          });
    
},
};

//deprecated
FmMobile.addProcessingWork = function(pid){
    
    var url = remotesite + "/miix/videos/miix_videos";
    var data = {
        "_id": localStorage._id,
        "userID": localStorage.fb_userID,
        "pid": pid,
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
							"deviceToken": localStorage.deviceToken
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
//	            navigator.notification.alert('You have a video!');
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


/** Apple Push Notification */
FmMobile.apn = {
    
init: function(){
    FM_LOG("[APN.init]");
    if(device.platform == "iPhone"){
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
                                                      FM_LOG('getPendingNotifications: ' + JSON.stringify(['getPendingNotifications', result]) );
                                                      //navigator.notification.alert(JSON.stringify(['getPendingNotifications', notifications]));
                                                      //if(result.notifications.length > 0){
                                                      FM_LOG("["+result.notifications.length + " Pending Push Notifications.]");
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
	        var gaId = "UA-37288251-1"; 
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
    
    //miixcard metadata
    var client_id = "116813818475773";
    var redir_url = ["http://www.miix.tv/welcome.html", "https://www.miix.tv/welcome.html"];
    
    // watasistar metadata
    /*
     var client_id = "243619402408275";
     var redir_url = ["http://www.feltmeng.idv.tw/welcome.html", "https://www.feltmeng.idv.tw/welcome.html"];
     */
    var fb = FBConnect.install();
    fb.connect(client_id, redir_url[0], "touch");
    fb.onConnect = FmMobile.authPopup.onFBConnected;
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
           // $.mobile.changePage("movie_create.html");
           window.plugins.childBrowser.close();
           
//           FmMobile.analysis.setVariable("Facebook_ID", localStorage.fb_userID, 1);
           recordUserAction("successfully logs in with FB");
           }
           });
    
},
    
FBLogout: function() {
    FmMobile.analysis.trackEvent("Button", "Click", "Logout", 54);
    recordUserAction("log out");
    var fb = FBConnect.install();
    delete localStorage._id;
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
   //picture:FmMobile.srcForMyUgcViewer,
    //privacy:{'value':'SELF'},
    
    };
    $.post(url,params, function(response){
           alert("已打卡！！");
           });
},
    
postFbVideoMessage:function(){
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        
    access_token: localStorage.fb_accessToken,
    message: FmMobile.userContent.text,
    link:FmMobile.youtubeVideoUrl,
        //picture:FmMobile.srcForMyUgcViewer,
        //privacy:{'value':'SELF'},
        
    };
    $.post(url,params, function(response){
           alert("已打卡！！");
           });
},
   
};
    


FmMobile.bindClickEventToNavBar = function(){
    $("#nav-bar > div").click(function(){
                              if (this.id == "btnTemplate"){
                                  $(this).children("img").attr({src:"images/m1-active.png"});
                                  $("#btnMyUgc").children("img").attr({src:"images/m2.png"});
                                  $("#btnScreen").children("img").attr({src:"images/m3.png"});
                                  $("#btnSetting").children("img").attr({src:"images/m4.png"});
                                  $.mobile.changePage("template-main_template.html");
                              }
                              else if (this.id == "btnMyUgc") {
                                  $(this).children("img").attr({src:"images/m2-active.png"});
                                  $("#btnTemplate").children("img").attr({src:"images/m1.png"});
                                  $("#btnScreen").children("img").attr({src:"images/m3.png"});
                                  $("#btnSetting").children("img").attr({src:"images/m4.png"});
                              $.mobile.changePage("my_ugc.html");
                              }
                              else if (this.id == "btnScreen") {
                                  $(this).children("img").attr({src:"images/m3-active.png"});
                                  $("#btnTemplate").children("img").attr({src:"images/m1.png"});
                                  $("#btnMyUgc").children("img").attr({src:"images/m2.png"});
                                  $("#btnSetting").children("img").attr({src:"images/m4.png"});
                                  $.mobile.changePage("screen.html");
                              }
                              else if (this.id == "btnSetting") {
                                  $(this).children("img").attr({src:"images/m4-active.png"});
                                  $("#btnTemplate").children("img").attr({src:"images/m1.png"});
                                  $("#btnMyUgc").children("img").attr({src:"images/m2.png"});
                                  $("#btnScreen").children("img").attr({src:"images/m3.png"});
                                  $.mobile.changePage("setting-main.html");
                              }
                              });
};

FmMobile.Confirm = function(){
    //Just for FmMobile.showNotification
    //Do nothing.
};

FmMobile.showNotification = function(fun){
    FM_LOG("[showNotification]");
    var appName = "登大螢幕";
    
    switch(fun){
        case "copyUrl":
            navigator.notification.confirm("已複製連結", FmMobile.Confirm(), appName, "確定");
            break;
        case "error":
            navigator.notification.confirm("錯誤發生，請通知我們", FmMobile.Confirm(), appName, "確定");
            break;
        default:
            console.log("ShowNotification is not worked");
    }
    
};
