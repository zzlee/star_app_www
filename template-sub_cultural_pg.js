FmMobile.template_sub_cultural_Pg = {
    PAGE_ID: "template_sub_cultural_Pg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_sub_cultural_Pg");
        recordUserAction("enters template_sub_cultural_Pg");
    },
        
    init: function(){
		$('#nav-bar').show();
        $('#show_sub').hide();
        $("#show_intro").show();
        
        $("#close").click(function(){
                      $("#show_intro").hide();
                           $('#show_sub').show();
                          $('#close').hide();
                          });
        
        var tem_mgr=templateMgr.getTemplateList();

       
        $("#sub_1").html('').append(tem_mgr[0].subTemplate.text_only.name).click(function(){
                     alert("hi");
       FmMobile.selectedSubTemplate=tem_mgr[0].subTemplate.text_only.selected;
                     $.mobile.changePage("template-input_text.html");
                     });
        $("#sub_2").html('').append(tem_mgr[0].subTemplate.picture_only.name).click(function(){
               alert("hi");
               FmMobile.selectedSubTemplate=tem_mgr[0].subTemplate.picture_only.selected;
               $.mobile.changePage("template-input_pic.html");
               });


        
       $("#sub_3").html('').append(tem_mgr[0].subTemplate.picture_plus_text.name).click(function(){
                   alert("hi");
                   FmMobile.selectedSubTemplate=tem_mgr[0].subTemplate.picture_plus_text.selected;
                   $.mobile.changePage("template-input_text_pic.html");
                   });


        
        
        
        /*
        console.dir(templateMgr.getTemplateList());

                
        alert(a[1].name);
       //templateMgr.getTemplateList();
        
      
        
*/
       
    },
};
