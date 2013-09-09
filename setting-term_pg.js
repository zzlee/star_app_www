FmMobile.settingTermPg = {
PAGE_ID: "settingTermPg",
    
show: function(){
    FmMobile.analysis.trackPage("/settingTermPg");
//    recordUserAction("enters settingTermPg");
},
    
init: function(){
    $('#nav-bar').show();
    $("#back_setting").click(function(){
             $.mobile.changePage("setting-main.html");
                     });
    
}
};