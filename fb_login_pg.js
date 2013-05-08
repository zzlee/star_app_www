FmMobile.fbLoginPg = {
    PAGE_ID: "fbLoginPg",
        
    init: function(){
        $("#login").click(function(){
            FmMobile.authPopup.init();
        });
    },

    show: function(){
        FmMobile.analysis.trackPage("/fbLoginPg");
        recordUserAction("enters fbLoginPg");
    }
};

