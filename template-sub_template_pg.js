FmMobile.template_subTemplatePg = {
    PAGE_ID: "template_subTemplatePg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_subTemplatePg");
        recordUserAction("enters template_subTemplatePg");
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
        
        var a=templateMgr.getTemplateList();
        //b[1].subTemplate.text_only.name

       
        $("#sub_1").html('').append(a[0].subTemplate.text_only.name).click(function(){
                     alert("hi");
       FmMobile.selectedSubTemplate=templateMgr.getTemplateList()[1].subTemplate.text_only.description;
                     $.mobile.changePage("template-input_text.html");
                     });

        /*
        console.dir(templateMgr.getTemplateList());

                
        alert(a[1].name);
       //templateMgr.getTemplateList();
        
      
        
*/
       
    },
};
