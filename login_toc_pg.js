FmMobile.loginTocPg = {
PAGE_ID: "loginTocPg",
    
	init: function(){
		FM_LOG("[loginTocPg.init]")
		FmMobile.bindClickEventToNavBar();
		$("#go_verify").click(function(){
                      $.mobile.changePage('fb_login.html');

        });
    
	},
    
	show: function(){
		FmMobile.analysis.trackPage("/loginTocPg");
//    recordUserAction("enters loginTocPg");
	},
};

