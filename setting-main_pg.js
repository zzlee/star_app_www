FmMobile.setting_MainPg = {
 
    init: function(){
    	$('#nav-bar').show();
        
        $("#contentAboutMiixIt").hide();
        $("#settingList a").click(function(){
			if(this.id=="itemToc"){
				$.mobile.changePage("setting-toc.html");
			}else if(this.id=="itemTerm"){
				$.mobile.changePage("setting-term.html");
			}else if(this.id=="itemFAQ"){
				$.mobile.changePage("setting-faq.html");
			}else if (this.id == "itemOrientation") {
				$.mobile.changePage("orientation_1.html");
			}
                                  
            else if (this.id == "itemAboutMiixIt"){
                $("#contentAboutMiixIt").toggle();
            }
                                  else if (this.id == "itemMailUs"){
                                  $.mobile.changePage("setting-customer.html");
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

