FmMobile.fbLoginPg = {
    PAGE_ID: "fbLoginPg",
        
    init: function(){
        FM_LOG("[fbLoginPg.init]");
        $("#go_fb_login").click(function(){
            FmMobile.authPopup.init();

        });
        
        $('#nav-bar').hide();
    },

    show: function(){
        FmMobile.analysis.trackPage("/fbLoginPg");
//        recordUserAction("enters fbLoginPg");
    }
};

