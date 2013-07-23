FmMobile.template_mainTemplatePg = {
PAGE_ID: "template_mainTemplatePg",
  
    show: function(){
        FmMobile.analysis.trackPage("/template_mainTemplatePg");
        recordUserAction("enters template_mainTemplatePg");
    },
        
    init: function(){
        
         //document.addEventListener("deviceready", onDeviceReady, false);
       // var aa=device.name;
        //alert(aa);
		$('#nav-bar').show();
        
       // alert(FmMobile.my_phone);
        //alert( device.platform);
       // console.dir(templateMgr.getTemplateList());
                 //$.mobile.changePage("template-sub_template.html");
       
       // $("#mood_img").attr("src",templateMgr.getTemplateList()[1].representingImageUrl);
        
        $("#go_cultural").click(function(){
                            $.mobile.changePage("template-sub_cultural.html");
                            FmMobile.selectedTemplate=templateMgr.getTemplateList()[0].selected;
                            });

        
        
        $("#go_mood").click(function(){
                $.mobile.changePage("template-sub_template.html");
                FmMobile.selectedTemplate=templateMgr.getTemplateList()[1].selected;
        });
        
        $("#go_checkin").click(function(){
                $.mobile.changePage("template-sub-checkin.html");
                FmMobile.selectedTemplate=templateMgr.getTemplateList()[2].selected;
        });
        
        $("#go_miixit").click(function(){
                $.mobile.changePage("template-sub-miixit.html");
                FmMobile.selectedTemplate=templateMgr.getTemplateList()[3].selected;
        });
       
       

        
    },
    
};
