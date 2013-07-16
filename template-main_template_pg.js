FmMobile.template_mainTemplatePg = {
PAGE_ID: "template_mainTemplatePg",
  
    show: function(){
        FmMobile.analysis.trackPage("/template_mainTemplatePg");
        recordUserAction("enters template_mainTemplatePg");
    },
        
    init: function(){
		$('#nav-bar').show();
       // console.dir(templateMgr.getTemplateList());
                 //$.mobile.changePage("template-sub_template.html");
       
        
      $("#go_mood").click(function(){
                            //alert("hi");
                          
                            $.mobile.changePage("template-sub_template.html");
                           FmMobile.selectedTemplate=templateMgr.getTemplateList()[1].selected;
                            }); 
       
       

        
    },
    
};
