FmMobile.settingTocPg = {
PAGE_ID: "settingTocPg",
    
show: function(){
    FmMobile.analysis.trackPage("/settingTocPg");
//    recordUserAction("enters settingTocPg");
},
    
init: function(){
    $('#nav-bar').show();
    $("#back_setting").click(function(){
         $.mobile.changePage("setting-main.html");
        });
}
};
