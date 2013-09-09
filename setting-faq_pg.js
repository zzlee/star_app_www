FmMobile.settingFaqPg = {
PAGE_ID: "settingFaqPg",
    
show: function(){
    FmMobile.analysis.trackPage("/settingFaqPg");
//    recordUserAction("enters settingFaqPg");
},
    
init: function(){
    $('#nav-bar').show();
    $("#back_setting").click(function(){
                             $.mobile.changePage("setting-main.html");
                             });
}
};
