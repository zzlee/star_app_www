FmMobile.cellphoneLoginPg = {
PAGE_ID: "cellphoneLoginPg",
    
init: function(){
    FmMobile.bindClickEventToNavBar();
    $("#change_fb").click(function(){
                          FmMobile.authPopup.FBLogout();
                          });
    
    $("#verify").click(function(){
                       $.mobile.changePage('phone_num_input.html');
                       });
},
    
show: function(){
    FmMobile.analysis.trackPage("/cellphoneLoginPg");
    recordUserAction("enters cellphoneLoginPg");
},
};
