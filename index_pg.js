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
        FmMobile.bindClickEventToNavBar();
        $('#nav-bar').hide();
    },
        
    show: function(){
        FM_LOG("[indexPg.show]");
        //recordUserAction("starts MiixCard app", true);
        
        /*
        if(localStorage.fb_userID){
            $.mobile.changePage("my_video.html");
            //$.mobile.changePage("movie_create.html"); //for temp test
        }
        else {
            //window.location.href = "orientation.html";
            $.mobile.changePage("orientation_1.html");
            //$.mobile.changePage("my_video.html");
            
        }
         */
        $.mobile.changePage("template-sub-checkin.html");
        
    },
        
    beforeshow: function(){
        FM_LOG("[indexPg.beforeshow]");
        //uploadingMgr.showAll($("#index_contentArea"));
        
    },
        
    
};
