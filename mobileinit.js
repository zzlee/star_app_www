var FmMobile = window.FmMobile || {};

var DEBUG = true,
    FM_LOG = (DEBUG) ? function(str){ console.log("\n[FM] "+str); } : function(str){} ;


var local = false,
    localhost = "http://localhost:3000",
    remotesite = starServerURL, //"http://192.168.5.188", //"http://www.feltmeng.idv.tw",
    domain = (local) ?  localhost : remotesite;
    

$(document).bind("mobileinit", function(){
                // Initialization Code here.
                // $.mobile.ns = "fm";
                $.mobile.allowCrossDomainPages = true;
                $.mobile.pushStateEnabled = true;
                
                //$.mobile.page.prototype.options.addBackBtn = true;
               
                /* pageinit executed after pagebeforecreate */
                //$("#indexPg").live("pageinit", FmMobile.indexPg.init);
                $("#indexPg").live("pageshow", FmMobile.indexPg.show);
                $("#orie_1").live("pagebeforeshow", FmMobile.orientationPg.init);
                $("#orie_1").live("pageshow", FmMobile.orientationPg.show);
				$('div[id^="orie"]').live("swipeleft ", FmMobile.orientationPg.swipeleft);
				$('div[id^="orie"]').live("swiperight", FmMobile.orientationPg.swiperight);
                $("#myVideoPg").live("pagebeforecreate", FmMobile.myVideoPg.loadMyVideo);
				$("#myVideoPg").live("pageinit", FmMobile.myVideoPg.init);
                $("#settingPg").live("pageshow", FmMobile.settingPg.show);
                $("#tocPg").live("pageshow", FmMobile.tocPg.show);
                $("#fbLoginPg").live("pageshow", FmMobile.fbLoginPg.show); 
                 
                //$("#homePg").live("pageinit", FmMobile.homePg.init);
                //$("#videoPg").live("pagebeforecreate", FmMobile.videoPg.init);
                //$("#reservationPg").live("pagebeforeshow", FmMobile.reservationPg.loadMyVideo);
                //$("#"+FmMobile.censorshipPg.PAGE_ID).live("pagebeforeshow", FmMobile.censorshipPg.loadWaitingEvents);
                //$("#popup").live(); Popup must use "live"
                 
                mobileinitForMovieGen(); //GZ 
                
                FM_LOG("<----------------- LOAD JQM and INIT ----------------->");
                 
});




FmMobile.videoWorks = null;
FmMobile.profile = null;
FmMobile.ga = null;
FmMobile.pushNotification = null;




FmMobile.init = {
    
    onBodyLoad: function(){
        
        FM_LOG("[Init.onDeviceReady]");
        
        document.addEventListener("deviceready", FmMobile.analysis.init, true);
        document.addEventListener("deviceready", FmMobile.apn.init, true);
        
        document.addEventListener("resume", FmMobile.init.onResume, false);
        document.addEventListener("pause", FmMobile.init.onPause, false);
        document.addEventListener("push-notification", function(event){
          FM_LOG("push-notification");
          navigator.notification.alert(JSON.stringify(['push-notification!', event]));
        });
        
        //TODO: 
        //document.addEventListener("touchmove", function(e){ e.preventDefault(); }, true);
        
        /*
        localStorage.fb_accessToken = "AAABqPdYntP0BAFi1xrndqwD1v8AZAvYEZBNAxk31y0TDmIXWqKC8ZA5zQwN5NGPZBUsqe8DKvMYG4xWtsrbpVZAZCsPrXbPJO4MPwoRlCUAsULv5zZADH4e";
        
        localStorage.fb_userID = "100004053532907"; */
        
    },
    onResume: function(){
        FM_LOG("[Init.onResume]");
        recordUserAction("resumes MiixCard app");
        FmMobile.apn.getPendingNotification();
    },
    onPause: function(){
        recordUserAction("pauses MiixCard app");
    },
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
    
    
    getPushNotification: function(event){
        FM_LOG("[APN.getPushNotification]" + event );
        
        navigator.notification.alert(JSON.stringify(['push-notification!', event]));
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
                FmMobile.apn.setApplicationIconBadgeNumber(0);
            //}
        });
    },
    
    
    /* registration check for this device. 
     * {"type":"6","pushBadge":"0","pushSound":"1","enabled":"1","pushAlert":"1"}
     */
    getRemoteNotificationStatus: function(){
        FM_LOG("[APN.getRemoteNotificationStatus]");
        FmMobile.pushNotification.getRemoteNotificationStatus(function(status) {
            FM_LOG('getRemoteNotificationStatus ' + JSON.stringify(status) );
            navigator.notification.alert(JSON.stringify(['getRemoteNotificationStatus', status]));
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
            navigator.notification.alert(JSON.stringify(['cancelAllLocalNotifications']));
        });
    },
    
    
    /* retrieve the original device unique id. (@warning As of today, usage is deprecated and requires explicit consent from the user) */
    getDeviceUniqueIdentifier: function(){
        FM_LOG("[APN.getDeviceUniqueIdentifier]");
        pushNotification.getDeviceUniqueIdentifier(function(uuid) {
            FM_LOG('getDeviceUniqueIdentifier: ' + uuid);
            navigator.notification.alert(JSON.stringify(['getDeviceUniqueIdentifier', uuid]));
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
        FmMobile.ga.init(FmMobile.analysis.nativePluginResultHandler, FmMobile.analysis.nativePluginErrorHandler                , "UA-36431108-1", 10);
        
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
    
    show: function() {
        if (localStorage._id) {
            $("#toc_menuBtn").show();
        }
        else {
            $("#toc_menuBtn").hide();
        }
        
    },
    
    buttonClicked: function(){
        //FmMobile.analysis.trackEvent("Button", "Click", "ToC", 11);
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
    
    fbStatusPolling: function(){
    
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
        
        var client_id = "116813818475773"; //Facebook APP_ID
        var redir_url = ["http://www.facebook.com/connect/login_success.html", "https://www.facebook.com/connect/login_success.html"];
        
        var fb = FBConnect.install();
        fb.connect(client_id, redir_url, "touch");
        fb.onConnect = FmMobile.authPopup.onFBConnected;
    },
        
    onFBConnected: function(){
        FM_LOG("[onFBConnected]: ");
       // if(!localStorage.fb_userID)
        var url = remotesite + "/api/signupwithFB";
            data = {"authResponse": {
                "userID": localStorage.fb_userID,
				"userName": localStorage.fb_name,
                "accessToken": localStorage.fb_accessToken,
                "expiresIn":  localStorage.expiresIn,
                "deviceToken": localStorage.deviceToken,
                "device": "iPhone",
                "timestamp": Date.now()
                }
            };
        FM_LOG(JSON.stringify(data));
            
        $.post(url, data, function(response){
            FM_LOG("[SignUp with FB]: ");
            if(response.data){
                localStorage._id = response.data._id;
                localStorage.fb_accessToken = response.data.accessToken;
                FM_LOG("localStorage" + JSON.stringify(localStorage));
                //$.mobile.changePage("orientation.html",{reloadPage:true});
                //window.location.href = "orientation.html";
                $.mobile.changePage("movie_create.html");
                window.plugins.childBrowser.close();
               
                FmMobile.analysis.setVariable("Facebook_ID", localStorage.fb_userID, 1);
                recordUserAction("successfully logs in with FB");
            }
        });
        
    },
    
    FBLogout: function() {
        FmMobile.analysis.trackEvent("Button", "Click", "Logout", 54);
        recordUserAction("logs out");
        var fb = FBConnect.install();
        delete localStorage._id;
        delete localStorage.fb_userID;
        delete localStorage.fb_name;
        delete localStorage.fb_accessToken;
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
                "device": "iPhone",
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
        
    },
    
    show: function(){
        FM_LOG("[indexPg.show]");
        //recordUserAction("starts MiixCard app", true);
        
        if(localStorage.fb_userID){
            $.mobile.changePage("myVideo.html");
        }
        else {
            window.location.href = "orientation.html";
        }
    },
};


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
    
    //  Page methods.
    loadMyVideo: function(event, data){
        FM_LOG("[myVideoPg] pagebeforecreate: loadMyVideoPg");
		
        //var videoWorks = $.jStorage.get("videos");
		//videoListAdapter($("#contentArea", $(this) ), videoWorks);
		
		
        var url = domain + "/api/profile";
        /*    query = {"user":{
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
                videoListAdapter($("#contentArea", $(this) ), videoWorks);
            }
        });*/
        
        $.ajax({
            type: "GET",
            url: url 
                + "?_id=" + localStorage._id
                + "&accessToken=" + localStorage.fb_accessToken
                + "&userID=" + localStorage.fb_userID
                + "&timestamp=" + Date.now(),
            success: function(res){
                if(res.videoWorks){
                    videoWorks = res.videoWorks;
                    FM_LOG("Gain videoWorks: " + JSON.stringify(videoWorks) );
                    $.jStorage.set("videos", videoWorks);
                    videoListAdapter($("#contentArea", $(this) ), videoWorks);
                }
            },
            async: false
        });
    },
    //  Initialization method. 
    init: function(){
		FM_LOG("[myVideoPg] pageinit");
        //FmMobile.analysis.trackPage("/myVideo");
        //recordUserAction("enters myVideoPg", true);
        
    },
};


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