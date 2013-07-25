FmMobile.template_subTemplatePg = {
    PAGE_ID: "template_subTemplatePg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_subTemplatePg");
        recordUserAction("enters template_subTemplatePg");
    },
        
    init: function(){
		$('#nav-bar').show();
        $("#show_intro").show();
        
        $("#close").click(function(){
                      $("#show_intro").hide();
                          $('#close').hide();
                          });
        
        var tem_mgr=templateMgr.getTemplateList();

        
        
        $("#template_name").html('').append(tem_mgr[1].name);
        
        
       
        $("#sub_1").html('').append(tem_mgr[1].subTemplate.text_only.name).click(function(){
                    
       FmMobile.selectedSubTemplate=tem_mgr[1].subTemplate.text_only.selected;
                     $.mobile.changePage("template-input_text.html");
                     });
        $("#sub_2").html('').append(tem_mgr[1].subTemplate.picture_only.name).click(function(){
             
               FmMobile.selectedSubTemplate=tem_mgr[1].subTemplate.picture_only.selected;
               $.mobile.changePage("template-input_pic.html");
               });


        
       $("#sub_3").html('').append(tem_mgr[1].subTemplate.picture_plus_text.name).click(function(){
                 
                   FmMobile.selectedSubTemplate=tem_mgr[1].subTemplate.picture_plus_text.selected;
                   $.mobile.changePage("template-input_text_pic.html");
                   });


        
        
        
        /*
        console.dir(templateMgr.getTemplateList());

                
        alert(a[1].name);
       //templateMgr.getTemplateList();
        
      
        
*/
       
    },
};
