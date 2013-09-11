FmMobile.settingAboutPg = {
    PAGE_ID: "settingAboutPg",
        
    show: function(){
        FmMobile.analysis.trackPage("/settingAboutPg");
//        recordUserAction("enters settingAboutPg");
    },
        
    init: function(){
    	FmMobile.changeBackground();
        $('#nav-bar').show();
        $("#back_setting").click(function(){
                                 $.mobile.changePage("setting-main.html");
         });
        FmMobile.hideBack();
        
//        $("#contentAboutMiixIt>a").click(function(){
//            FmMobile.openBrowser("http://www.feltmeng.com/");
//                                         
//        });
        
    }
};