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
        FmMobile.bindClickEventToNavBar();
        $("#btnMiixMovie").click(function(){
            $("#btnMiixMovie>img").attr("src","images/a-my_video.png");
            $("#btnLiveMovie>img").attr("src","images/e-dooh.png");
            FmMobile.myVideoPg.loadMyVideo();
        });
        $("#btnLiveMovie").click(function(){
            $("#btnMiixMovie>img").attr("src","images/e-my_video.png");
            $("#btnLiveMovie>img").attr("src","images/a-dooh.png");
            FmMobile.myVideoPg.loadMyStreetVideo();
        });
        
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
        
    }
    
};
