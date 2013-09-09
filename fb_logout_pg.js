FmMobile.fbLogoutPg = {
PAGE_ID: "fbLogoutPg",
    
init: function(){
    
    $('#nav-bar').hide();
    $('#back_setting').click(function(){
                        $.mobile.changePage('setting-main.html');     
                             });
    $("#go_fb_logout").click(function(){
                             FmMobile.authPopup.FBLogout();

                             //  $.mobile.changePage('fb_login.html');
                            });
},
    
show: function(){
    FmMobile.analysis.trackPage("/fbLogoutPg");
//    recordUserAction("enters fbLogoutPg");
}
};
