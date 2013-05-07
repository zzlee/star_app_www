FmMobile.settingPg = {
    PAGE_ID: "settingPg",
 
    init: function(){
        FmMobile.bindClickEventToNavBar();
    },
    
    show: function(){
        FmMobile.analysis.trackPage("/settingPg");
        recordUserAction("enters settingPg");
    },
};

