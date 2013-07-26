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
        
       // localStorage.fb_userID &&
        if(localStorage.fb_userID && localStorage.verified=='true'){
            $.mobile.changePage("template-main_template.html");
            //$.mobile.changePage("movie_create.html"); //for temp test
        }
        else {
            //window.location.href = "orientation.html";
            $.mobile.changePage("orientation_1.html");
            //$.mobile.changePage("my_video.html");
            
        }
         
        
       
        
    // $.mobile.changePage("login_toc.html");
        //$.mobile.changePage("image_test.html");
    },
        
    beforeshow: function(){
        FM_LOG("[indexPg.beforeshow]");
        //uploadingMgr.showAll($("#index_contentArea"));
        
    },
        
    
};
