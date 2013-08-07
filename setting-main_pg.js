FmMobile.setting_MainPg = {
 
    init: function(){
    	$('#nav-bar').show();
        //console.dir(templateMgr.getTemplateList());
 
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
            }else if (this.id == "itemMailUs"){
            	$.mobile.changePage("setting-customer.html");
            }else if (this.id == "itemLogout") {
                FmMobile.authPopup.FBLogout();
            }
            else if (this.id == "ugcTest") {
            	$.mobile.changePage("image_test.html");
            }
        });

    },
    
    show: function(){
        FmMobile.analysis.trackPage("/settingPg");
        recordUserAction("enters settingPg");
    },
};

