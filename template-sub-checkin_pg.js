FmMobile.template_checkinPg = {
    PAGE_ID: "template_checkinPg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_checkinPg");
        recordUserAction("enters template_checkinPg");
    },
        
    init: function(){
		$('#nav-bar').show();
        $("#show_intro").show();
        
        $("#close").click(function(){
                      $("#show_intro").hide();
                          $('#close').hide();
                          });
        
        $('#checkin_text_1').val("在下"+localStorage.fb_name);
         $('#checkin_text_2').val("各位有請了");
        
        
        /*
        $('#back_main').click(function(){
                  $.mobile.changePage("template-main_template.html");
                              
          });
        */
        
        
        $('#checkinPreview').click(function(){
            var finalTextOfCheckin=$('#checkin_text_1').val()+"\n路經貴寶地\n"+$('#checkin_text_2').val();
                                //   alert(finalTextOfCheckin);
      FmMobile.selectedSubTemplate=templateMgr.getSubTemplateList("check_in")[0].id;
                                   FmMobile.userContent.text=finalTextOfCheckin;
                             $.mobile.changePage("template-preview.html");
                              
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
