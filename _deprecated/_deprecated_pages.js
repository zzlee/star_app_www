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
