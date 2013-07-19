FmMobile.template_checkinPg = {
    PAGE_ID: "template_checkinPg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_checkinPg");
        recordUserAction("enters template_checkinPg");
    },
        
    init: function(){
		$('#nav-bar').hide();
        $('#show_sub').hide();
        $("#show_intro").show();
        
        $("#close").click(function(){
                      $("#show_intro").hide();
                           $('#show_sub').show();
                          $('#close').hide();
                          });
        
        $('#back_main').click(function(){
                  $.mobile.changePage("template-main_template.html");
                              
          });
        
        
        
        $('#next_step').click(function(){
      FmMobile.selectedSubTemplate=templateMgr.getSubTemplateList("miix_it")[2].id;

                              $.mobile.changePage("template-input_text_pic.html");
                              
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
