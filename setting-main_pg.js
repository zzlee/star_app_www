FmMobile.setting_MainPg = {
 
    init: function(){
        $('body').css({
                      "position":""
                      });
        FmMobile.myUgcScroll_y=0;
    	$('#nav-bar').show();
    	FmMobile.hideBack();
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
				if(device.platform == "Android"){
					$.mobile.changePage("orientation_1.html");
				}else{
					$.mobile.changePage("orientation_0.html");
				}
			}
                                  
            else if (this.id == "itemAboutMiixIt"){
                //$("#contentAboutMiixIt").toggle();
                                  $.mobile.changePage("setting-about.html");
            }else if (this.id == "itemMailUs"){
            	$.mobile.changePage("setting-customer.html");
            }else if (this.id == "itemLogout") {
                                  $.mobile.changePage("fb_logout.html");
                //FmMobile.authPopup.FBLogout();
            }
            else if (this.id == "ugcTest") {
            	$.mobile.changePage("image_test.html");
            }
        });

    },
    
    show: function(){
        FmMobile.analysis.trackPage("/setting_MainPg");
//        recordUserAction("enters setting_MainPg");
    },
};

