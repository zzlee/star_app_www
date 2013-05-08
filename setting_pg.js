FmMobile.settingPg = {
    PAGE_ID: "settingPg",
 
    init: function(){
        FmMobile.bindClickEventToNavBar();
        
        $("#contentAboutMiixIt").hide();
        $("#settingList a").click(function(){
            if (this.id == "itemAboutMiixIt"){
                $("#contentAboutMiixIt").toggle();
            }
            else if (this.id == "itemLogout") {
                FmMobile.authPopup.FBLogout();
            }
        });

    },
    
    show: function(){
        FmMobile.analysis.trackPage("/settingPg");
        recordUserAction("enters settingPg");
    },
};

