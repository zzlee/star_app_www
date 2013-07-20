FmMobile.fbLoginPg = {
    PAGE_ID: "fbLoginPg",
        
    init: function(){
        
        $('#nav-bar').hide();
        FM_LOG("[fbLoginPg.init]");
        $("#go_fb_login").click(function(){
            FmMobile.authPopup.init();

        });
        
       // $('#nav-bar').hide();
    },

    show: function(){
        FmMobile.analysis.trackPage("/fbLoginPg");
//        recordUserAction("enters fbLoginPg");
    }
};

