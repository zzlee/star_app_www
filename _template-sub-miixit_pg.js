FmMobile.template_miixitPg = {
PAGE_ID: "template_miixitPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_miixitPg");
    recordUserAction("enters template_miixitPg");
},
    
init: function(){
    $('#nav-bar').show();
    $("#show_intro").show();
    
    $("#close").click(function(){
                      $("#show_intro").hide();
                      $('#close').hide();
                      });
    
    $('#back_main').click(function(){
              $.mobile.changePage("template-main_template.html");
                          
      });
    
    $('#next_step').click(function(){
                FmMobile.selectedSubTemplate=templateMgr.getSubTemplateList("miix_it")[0].id;
                          $.mobile.changePage("template_input_miixit.html");
                          });
    /*
     
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
