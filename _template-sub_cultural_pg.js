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
        
        //var tem_mgr=templateMgr.getTemplateList();
        templateMgr.getSubTemplateList("cultural_and_creative")[0].id;
       
        $("#sub_1").html('').append(templateMgr.getSubTemplateList("cultural_and_creative")[0].name).click(function(){
//                     alert("hi");
            FmMobile.selectedSubTemplate=templateMgr.getSubTemplateList("cultural_and_creative")[0].id;
            $.mobile.changePage("template-input_text.html");
         });
        $("#sub_2").html('').append(templateMgr.getSubTemplateList("cultural_and_creative")[1].name).click(function(){
//               alert("hi");
            FmMobile.selectedSubTemplate=templateMgr.getSubTemplateList("cultural_and_creative")[1].id;;
            $.mobile.changePage("template-input_pic.html");
        });


        
        $("#sub_3").html('').append(templateMgr.getSubTemplateList("cultural_and_creative")[2].name).click(function(){
//                   alert("hi");
            FmMobile.selectedSubTemplate=templateMgr.getSubTemplateList("cultural_and_creative")[2].id;
            $.mobile.changePage("template-input_text_pic.html");
        });


        
        
        
        /*
        console.dir(templateMgr.getTemplateList());

                
        alert(a[1].name);
       //templateMgr.getTemplateList();
        
      
        
*/
       
    },
};
