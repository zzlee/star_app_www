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
        
        
        
        if(localStorage.fb_userID && localStorage.verified=='true'){
            $.mobile.changePage("template-main_template.html");
        }
        else {
            $.mobile.changePage("orientation_1.html");
        }
         
         

         
         
        
       
        
        //$.mobile.changePage("imgZoomViewer.html");
        //$.mobile.changePage("template_input_checkin.html");
       // $.mobile.changePage("template-sub-miixit.html");
        // $.mobile.changePage("template_input_miixit.html");
        //$.mobile.changePage("template-input_text_pic.html");

        
    },
        
    beforeshow: function(){
        /*
        TemplateMgr.getInstance(function(err, _templateMgr){
                                //alert("templatmgr");
                                if (!err) {
                                templateMgr = _templateMgr;
                                FmMobile.mycount=templateMgr.getTemplateList().length;
                                alert(FmMobile.mycount);
                                }
                                else {
                                console.log("Fail to get templateMgr: "+err);
                                }
                                });
*/
        FM_LOG("[indexPg.beforeshow]");
        //uploadingMgr.showAll($("#index_contentArea"));
        
    },
        
    
};
