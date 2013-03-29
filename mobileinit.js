var FmMobile = window.FmMobile || {};

var DEBUG = true,
    FM_LOG = (DEBUG) ? function(str){ console.log("\n[FM] "+str); } : function(str){} ;


var local = false,
    localhost = "http://localhost:3000",
    remotesite = starServerURL,
    domain = (local) ?  localhost : remotesite;
    

$(document).bind("mobileinit", function(){
                // Initialization Code here.
                // $.mobile.ns = "fm";
                $.mobile.allowCrossDomainPages = true;
                $.mobile.pushStateEnabled = true;
                
                //$.mobile.page.prototype.options.addBackBtn = true;
               
                /* pageinit executed after pagebeforecreate */
                $("#indexPg").live("pageinit", FmMobile.indexPg.init);
                $("#indexPg").live("pagebeforeshow", FmMobile.indexPg.beforeshow);
                $("#indexPg").live("pageshow", FmMobile.indexPg.show);
                $("#orie_1").live("pagebeforeshow", FmMobile.orientationPg.init);
                $("#orie_1").live("pageshow", FmMobile.orientationPg.show);
				$('div[id^="orie"]').live("swipeleft ", FmMobile.orientationPg.swipeleft);
				$('div[id^="orie"]').live("swiperight", FmMobile.orientationPg.swiperight);
                $("#myVideoPg").live("pagebeforecreate", FmMobile.myVideoPg.loadMyVideo);
				$("#myVideoPg").live("pageinit", FmMobile.myVideoPg.init);
                $("#myVideoPg").live("pagebeforeshow", FmMobile.myVideoPg.beforeshow);
                $("#settingPg").live("pageshow", FmMobile.settingPg.show);
                $("#tocPg").live("pageshow", FmMobile.tocPg.show);
                $("#fbLoginPg").live("pageshow", FmMobile.fbLoginPg.show); 
                $("#tocPg").live("pageinit", FmMobile.tocPg.init);
                 
                //$("#homePg").live("pageinit", FmMobile.homePg.init);
                //$("#videoPg").live("pagebeforecreate", FmMobile.videoPg.init);
                //$("#reservationPg").live("pagebeforeshow", FmMobile.reservationPg.loadMyVideo);
                //$("#"+FmMobile.censorshipPg.PAGE_ID).live("pagebeforeshow", FmMobile.censorshipPg.loadWaitingEvents);
                //$("#popup").live(); Popup must use "live"
                 
                mobileinitForMovieGen(); //GZ
                 
                setTimeout(function(){
                    navigator.splashscreen.hide();
                },3000);

                
                FM_LOG("<----------------- LOAD JQM and INIT ----------------->");
                 
});




FmMobile.videoWorks = [];
FmMobile.profile = null;
FmMobile.ga = null;
FmMobile.pushNotification = null;




FmMobile.init = {
    
    onBodyLoad: function(){
        
        FM_LOG("[Init.onDeviceReady]");
        
        document.addEventListener("deviceready", FmMobile.analysis.init, true);
        document.addEventListener("deviceready", FmMobile.apn.init, true);
        document.addEventListener("deviceready", FmMobile.init.isFBTokenValid, true);
        
        document.addEventListener("resume", FmMobile.init.onResume, false);
        document.addEventListener("pause", FmMobile.init.onPause, false);
        document.addEventListener("push-notification", function(event){
            FmMobile.ajaxNewVideos();
            FmMobile.ajaxNewStoryVideos();
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
            FmMobile.ajaxNewVideos();
            FmMobile.ajaxNewStoryVideos();
            FmMobile.apn.getPendingNotification();
            recordUserAction("resumes MiixCard app");
            FmMobile.init.isFBTokenValid();
        }
    },
    
    onPause: function(){
        if(localStorage.fb_userID){
            recordUserAction("pauses MiixCard app");
        }
    },
    
    isFBTokenValid: function(){
        if(!localStorage.fb_userID)
            return;
        
        var url = remotesite + "/api/member.isFBTokenValid";
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


FmMobile.addProcessingWork = function(pid){
    
    var url = remotesite + "/api/submitAVideo";
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


FmMobile.ajaxNewVideos = function(){
    FM_LOG("[ajaxNewVideos]");
    var videoWorks = ($.jStorage.get("videoWorks")) ? $.jStorage.get("videoWorks") : [];
    var processingWorks = ($.jStorage.get("processingWorks")) ? $.jStorage.get("processingWorks") : {};
    var url = domain + "/api/newVideoList";
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

FmMobile.ajaxNewStoryVideos = function(){
    
    FM_LOG("[ajaxNewStoryVideos]");
    var streetVideos = ($.jStorage.get("streetVideos")) ? $.jStorage.get("streetVideos") : [];
    var after = -1;
    var url = remotesite + "/api/newVideoList";
    
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
    var url = remotesite + "/api/submitDooh";
    
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
       }else{
           console.log("[submitDooh]"+JSON.stringify(res));
       }
    });
};



FmMobile.apn = {
    
    init: function(){
        FM_LOG("[APN.init]");
        FmMobile.pushNotification = window.plugins.pushNotification;
        FmMobile.apn.registerDevice();
        FmMobile.apn.getPendingNotification();
        //FmMobile.apn.getRemoteNotificationStatus();
        //FmMobile.apn.getDeviceUniqueIdentifier();
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
            //navigator.notification.alert(JSON.stringify(['getDeviceUniqueIdentifier', uuid]));
        });
    },
};


FmMobile.analysis = {
    
    nativePluginResultHandler: function(result){
        FM_LOG("[ga.resultHandler] " + result);
    },
    
    nativePluginErrorHandler: function(error){
        FM_LOG("[ga.errorHandler] " + error);
    },
    
    init: function(){
        FM_LOG("[analysis.init]");
        
        FmMobile.ga = window.plugins.gaPlugin;
        FmMobile.ga.init(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler                , "UA-37288251-1", 10); // UA-37288251-1 for Web.
        
    },
    
    
    goingAway: function(){
        FmMobile.ga.exit(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler);
    },
    
    trackEvent: function(category, action, label, value){
        FmMobile.ga.trackEvent(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler, category, action, label, 1);
    },
    
    setVariable: function(key, value, index){
        FmMobile.ga.setVariable(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler, key, value, index);
    },
    
    trackPage: function(url){
        FmMobile.ga.trackPage(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler
                              , url);
    },
};

FmMobile.settingPg = {
    PAGE_ID: "settingPg",
    
    show: function(){
        FmMobile.analysis.trackPage("/settingPg");
        recordUserAction("enters settingPg");
    },
};

FmMobile.fbLoginPg = {
    PAGE_ID: "fbLoginPg",
        
    show: function(){
        FmMobile.analysis.trackPage("/fbLoginPg");
        recordUserAction("enters fbLoginPg");
    },
};


FmMobile.tocPg = {
    PAGE_ID: "tocPg",
    
    show: function(){
        FmMobile.ajaxNewVideos();
        FmMobile.ajaxNewStoryVideos();
    },
    
    init: function(){
        if (localStorage._id) {
            $("#toc_menuBtn").show();
        }
        else {
            $("#toc_menuBtn").hide();
        }
    },
    
    buttonClicked: function(){
        FmMobile.analysis.trackEvent("Button", "Click", "ToC", 11);
        $.mobile.changePage("toc.html");
    },
};



FmMobile.orientationPg = {
	PAGE_ID: "orie_1",
	idx: 1,
	max: 4,
	
	swipeleft: function(){
		if( ++FmMobile.orientationPg.idx > FmMobile.orientationPg.max){
			//FmMobile.orientationPg.idx = FmMobile.orientationPg.max;
            if (!localStorage._id) {
                $.mobile.changePage("fb_login.html", {transition: "slide"});
            }
            else {
                $.mobile.changePage("setting.html");
            }
		}else{
			$.mobile.changePage($("#orie_" + FmMobile.orientationPg.idx), {transition: "slide"});
		}
	},
	
	swiperight: function(){
		if( --FmMobile.orientationPg.idx < 1){
			FmMobile.orientationPg.idx = 1;
		}else{
			$.mobile.changePage($("#orie_" + FmMobile.orientationPg.idx)
				, { transition: "slide",
					reverse: true});
		}
	},
    
    init: function(){
        FmMobile.orientationPg.idx = 1;
        
    },
    
    show: function(){
        //FmMobile.analysis.trackPage("/orientationPg");
        //FmMobile.push.registerDevice();
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
                    sessionStorage.sessionID = response.data.sessionID;
                    
                    $.mobile.changePage("home.html");
                    
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
        var url = remotesite + "/api/signupwithFB";
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
                localStorage.fb_accessToken = response.data.accessToken;
                localStorage.verified = (response.data.verified) ? response.data.verified : 'false';
                FM_LOG("localStorage" + JSON.stringify(localStorage));
                //$.mobile.changePage("orientation.html",{reloadPage:true});
                //window.location.href = "orientation.html";
               
                // Each time of Login, pull all videos.
                FmMobile.ajaxNewVideos();
                FmMobile.ajaxNewStoryVideos();
               
                $.mobile.changePage("movie_create.html");
                window.plugins.childBrowser.close();
               
                FmMobile.analysis.setVariable("Facebook_ID", localStorage.fb_userID, 1);
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
        delete localStorage.verified;
        if(localStorage.email) delete localStorage.email;
        
        $.jStorage.set("videoWorks", []);
        $.jStorage.set("processingWorks", {});
        $.jStorage.set("streetVideos", []);
        $.jStorage.set("fb_profile", null);
        fb.Logout();
        $.mobile.changePage("index.html");
        
    },
    
    sendDeviceToken: function(){
        FM_LOG("[sendDeviceToken] ");
        var url = domain + "/api/deviceToken";
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
};


// index.html
FmMobile.indexPg = {

    PAGE_ID: "indexPg",
    
    //  Page methods.
    init: function(){
        FM_LOG("[indexPg.init] ");
        // Query Availabe New Video in Background.
        if(localStorage.fb_userID){
            FmMobile.ajaxNewVideos();
            FmMobile.ajaxNewStoryVideos();
        }
    },
    
    show: function(){
        FM_LOG("[indexPg.show]");
        //recordUserAction("starts MiixCard app", true);
        
        if(localStorage.fb_userID){
            $.mobile.changePage("myVideo.html");
            //$.mobile.changePage("movie_create.html"); //for temp test
        }
        else {
            window.location.href = "orientation.html";
            //$.mobile.changePage("myVideo.html");
            
        }
                  
    },
    
    beforeshow: function(){
        FM_LOG("[indexPg.beforeshow]");
        //uploadingMgr.showAll($("#index_contentArea"));
        
    },
    

};

//DEPRECATED
FmMobile.homePg = {

    PAGE_ID: "homePg",
    
    //  Page methods.
    
    //  Initialization method.
    init: function(e){
        FM_LOG("\n[Home init]: " + JSON.stringify(location) );
        var url = domain + "/api/profile",
            query = {"user":{
                "_id": localStorage._id,
                "accessToken": localStorage.fb_accessToken,
                "userID": localStorage.fb_userID,
                "timestamp": Date.now()
            }};
            
        $.get(url, query, function(res){
        
            if(res.videoWorks){
                videoWorks = res.videoWorks;
                FM_LOG("Gain videoWorks: " + JSON.stringify(videoWorks) );
                $.jStorage.set("videos", videoWorks);
            }
        });
    },
};

//DEPRECATED
FmMobile.signinPg = {
    //  Page constants.
    PAGE_ID: "signinPg",
    
    //  Page methods.
    signinReq: function(){
        
        var member = new Object(),
            inputElements = $('input');
                
            
        var memberID,
            password,
            url = domain + "/api/signin",
            data = {};
                
        for( var i=0; i < inputElements.length; i++){
            member[inputElements[i].name] = inputElements[i].value;
        }
            
        data = { "member":member };   // JSON.stringify(data) is unnecessary.
        FM_LOG( "Sending: " + JSON.stringify(data) );
            
        $.post(url, data, function(res){
                
            if(res.videoWorks){
                profile = res.profile;
                videoWorks = res.videoWorks;
                 
                /*
                var path = location.pathname;
                path = path.substring(0, path.lastIndexOf("/")+1)+"home.html";
                location.pathname = path;
                location.hash = "";*/
                
                $.mobile.changePage("home.html", {
                    type: "get",
                    changeHash: true
                });
                
                //$.sessionStorage( "videoWorks", videoWorks);
                FM_LOG("profile: " + JSON.stringify(profile) );
                FM_LOG("videoWorks: " + JSON.stringify(videoWorks) );
                
            }else{
                $("#failPopup").popup("open");
            }
        });
	},
    
    testBtn: function(){
        $.mobile.changePage("home.html");
    },
};

//DEPRECATED
FmMobile.signupPg = {

    PAGE_ID: "signupPg",
    
    signupReq: function(){
    
        var member = new Object(),
            inputElements = $('input');
                
            
        var url = domain + "/api/signup",
            data = {};
                
        for( var i=0; i < inputElements.length; i++){
            member[inputElements[i].name] = inputElements[i].value;
        }
        
        if( member["password"] === member["repassword"] && member["password"] ){
        
            data = { "member":member };   // JSON.stringify(data) is unnecessary.
            FM_LOG( "Sending Data: " + JSON.stringify(member) );
                
            $.post(url, data, function(res){
                    
                if(res.videoWorks){
                    profile = res.profile;
                    videoWorks = res.videoWorks;
                            
                    $.mobile.changePage("home.html", {
                        type: "get",
                        changeHash: false,
                        dataUrl: "home.html"
                    });
                    
                    
                    //$.sessionStorage( "videoWorks", videoWorks);
                    FM_LOG("profile: " + JSON.stringify(profile) );
                    //FM_LOG("videoWorks: " + JSON.stringify(videoWorks) );
                    
                }else{
                    $("#failPopup").popup("open");
                }
            });
            
        }else{
            $("#password").attr("value", "");
            $("#repassword").attr("value", "");
        }
       
    },

};

//DEPRECATED
FmMobile.videoPg = {
    PAGE_ID: "videoPg",
    
    init: function(e){
        var thisPage = $(this);
        var thisUrl = thisPage.data("url");
        var thisIdx = thisUrl.split("=")[1];
        FM_LOG("[videoPg.init] index: ");
        
        videoWgt($("#contentArea", thisPage), FM.result.data[thisIdx], thisIdx);
    },
};

FmMobile.myVideoPg = {
   //  Page constants.
    PAGE_ID: "myVideoPg",
    
    trashItem: null,
    
    //  Page methods.
    loadMyVideo: function(event, data){
        FM_LOG("[myVideoPg] pagebeforecreate: loadMyVideoPg");
        //uploadingMgr.showAll($("#myVideo_contentArea"));
        /* TEST Data */
		/*var vWorks = [{"title":"MiixCard movie","projectId":"miixcard-50b82149157d80e80d000002-20121130T030443775Z","fb_id":"100004053532907_515809601771886","_id":"50b82288157d80e80d000003","__v":0,"ownerId":{"_id":"50b82149157d80e80d000002","userID":"100004053532907"},"url":{"youtube":"http://www.youtube.com/embed/VXH9PJWV5tg"}, "createdOn":"1354492800000"}
						  ,{"title":"MiixCard movie","projectId":"miixcard-50b82149157d80e80d000002-20121130T111930901Z","fb_id":"100004053532907_506201579401847","_id":"50b896861f5a59ec0c000009","__v":0,"ownerId":{"_id":"50b82149157d80e80d000002","userID":"100004053532907"},"url":{"youtube":"http://www.youtube.com/embed/iIV167g3AYo"}, "createdOn":"1354492800000"}];
		
		
		var pWork = "miixcard-50b82149157d80e80d000002-20121203T131446527Z";
        FmMobile.addProcessingWork(pWork);
		$.jStorage.set("videoWorks", vWorks);
        
        localStorage._id = "50b34c4a8198caec0e000001";
        localStorage.fb_accessToken = "AAABqPdYntP0BAOj2VmPf8AVllT1TArJKN3eD9UbzJtzig6oap4aPA5Sx5Ahbl5ypzycr9O09Mbad3NEcPlqZAi8ZBl0Es7A8VXrdavSoLdIVZBMRNVh";
         localStorage.fb_name="Gabriel Feltmeng"
        localStorage.fb_userID = "100004053532907"; */
        
        //$.jStorage.set("videoWorks", []);
        //$.jStorage.set("processingWorks", {});
		/* End of TEST Data */
		
		        
		var videoWorks = ($.jStorage.get("videoWorks")) ? $.jStorage.get("videoWorks") : [];
        var processingWorks = ($.jStorage.get("processingWorks")) ? $.jStorage.get("processingWorks") : {};
        
		
        if(videoWorks.length == 0 && $.isEmptyObject(processingWorks)){
            //Neither processed videos nor processing videos.
            //$("#fm_profile").hide();
            $("#fm_myvideobtn").hide();
            FmMobile.myVideoPg.trashItem = new trashtalk();
            
        }else{
            // Initialize VideoList with videos in storage.
            //$("#fm_profile").show();
            $("#fm_myvideobtn").show();
            videoListAdapter.init($("#myVideo_contentArea", $(this) ), videoWorks, processingWorks);
		}
    },
    
    
    loadMyStreetVideo : function(){
        
        
        var streetVideos = ($.jStorage.get("streetVideos")) ? $.jStorage.get("streetVideos") : [];
        
        videoListAdapter.init($("#myVideo_contentArea", $(this) ), streetVideos, {});
        
    },
    
    
    //  Initialization method. 
    init: function(){
		FM_LOG("[myVideoPg] pageinit");
        videoListAdapter.freshCommentbar();
        $("#myVideo_contentArea").height( window.innerHeight - $("div[data-role=header]").height() );
        
    },
    
    beforeshow: function(){
        FM_LOG("[myVideoPg] pagebeforeshow");
        //FmMobile.analysis.trackPage("/myVideo");
        //recordUserAction("enters myVideoPg");
        var profile = $.jStorage.get("fb_profile");
        $("#fb_user_pic > img").attr("src", localStorage.fb_user_pic);
        $("#fb_name").html(localStorage.fb_name);
        if(profile.location)
            $("#fb_user_location").html(profile.location.name);
        else
            $("#fb_user_location").html("Earth");
        
    },
    
};

//DEPRECATED
FmMobile.reservationPg = {
    PAGE_ID: "reservationPg",
    
    loadMyVideo: function(event, data){
            
        var url = domain + "/api/profile",
            query = {"user":{
                "_id": localStorage._id,
                "accessToken": localStorage.fb_accessToken,
                "userID": localStorage.fb_userID,
                "timestamp": Date.now()
            }};
        var thisPage = $(this);
        
        $.get(url, query, function(res){
        
            if(res.videoWorks){
                videoWorks = res.videoWorks;
                FM_LOG("Gain videoWorks: " + JSON.stringify(videoWorks) );
                
                
                for(var i=0; i < videoWorks.length; i++){
                    $("<option>").attr({value: i.toString()}).html(videoWorks[i].title).appendTo("#video_select");
                }
                $("#video_select").val("0").select("refresh");
                //$("#video_select").select("refresh");
            }
        });
                  
        FM_LOG("load reservationPg");
    },
    
    reserve: function(){
    
        var v_idx = parseInt($("#video_select").val(), 10);
        var year = parseInt($("#reserved_year").val(), 10),
            mon = parseInt($("#reserved_month").val(), 10),
            date = parseInt($("#reserved_date").val(), 10);
            
        var str = $("#reserved_time").val(),
            hr = parseInt(str.substring(0, 2), 10),
            min = parseInt(str.substring(2), 10);
            
        var slot = new Date(year, mon, date, hr, min);
        var url = domain + "/api/addEvent",
            data = {};
        
        var start = slot.getTime(),
            end = slot.getTime() + 5*60*1000,   //  Duration 5 mins
            ownerId = profile._id;
        
        var evt = {
                    "videoId": videoWorks[v_idx]._id,
                    "projectId": videoWorks[v_idx].projectId,
                    "ownerId": ownerId,
                    "start": start,
                    "end": end,
                    "videoUrl": videoWorks[v_idx].url.youtube,
                    "location": "小巨蛋",
                    "status": "waiting"
                  };
        data = { "event": evt };         
        FM_LOG("addEvent: " + start.toLocaleString()+ " to " + end.toLocaleString() +"\n" + JSON.stringify(evt) );
        
        $.post(url, data, function(res){
            $.mobile.changePage("#homePg", {reverse: true, transition: "slide"});
            FM_LOG("Rerserve: ");
            consoloe.dir(res);
        });
    },
};

//DEPRECATED
FmMobile.censorshipPg = {

    PAGE_ID: "censorshipPg",
    
    _waitingEvents: null,
    
    //  Page methods.
    loadWaitingEvents: function(){
    
        var url = domain + "/api/eventsOfWaiting",
            data = {"do": "nothing"};
        var thisPage = $(this);
        
        $.get(url, data, function(res){
            FM_LOG( "Get waitingEvents: " + JSON.stringify(res) );
            
            if(res.waitingEvents){
                _waitingEvents = res.waitingEvents;
                
                for(var i=0; i < _waitingEvents.length; i++){
                
                    var event = $("<div>").attr("id", "event"+i).appendTo($("#contentArea", thisPage));
                    var video = $("<iframe>").attr({
                        id: "video"+i,
                        src: _waitingEvents[i].videoUrl,
                        width: "560",
                        height: "315",
                        frameborder: "0",
                    }).appendTo(event);
                    
                    $("<br>").appendTo(event);
                    
                    var rejectBtn = $("<button>").attr("id", "rjt"+i).html("拒絕").on("click", FmMobile.censorshipPg.reject).appendTo(event);
                    var proveBtn = $("<button>").attr("id", "prv"+i).html("通過").on("click", FmMobile.censorshipPg.prove).appendTo(event);
                    
                }
            }
        });
    },
    
    reject: function(event){
    
        var idx = parseInt(event.target.id.substring(3), 10);
        var url = domain + "/api/reject",
            evtid = _waitingEvents[idx]._id,
            data = {"event": {"oid": evtid} };
            
        FM_LOG("Reject " + event.target.id + " events: "+ JSON.stringify(evtid) );  
        
        $("#event"+idx).remove();
        
        $.post(url, data, function(res){
            FM_LOG("Res of Reject: " + JSON.stringify(res) );
        })
    },

    prove: function(event){
    
        FM_LOG("Prove " + event.target.id);
        var idx = parseInt(event.target.id.substring(3), 10);
        var url = domain + "/api/prove",
            evtid = _waitingEvents[idx]._id,
            data = {"event": {"oid": evtid} };
            
        FM_LOG("Prove " + event.target.id + " events: "+ JSON.stringify(evtid) );
        
        $("#event"+idx).remove();
        
        $.post(url, data, function(res){
            FM_LOG("Res of Prove: "+ JSON.stringify(res) );
        })
    },
};
