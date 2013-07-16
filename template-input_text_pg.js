FmMobile.template_input_textPg = {
PAGE_ID: "template_input_textPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_input_textPg");
    recordUserAction("enters template_input_textPg");
},
    
init: function(){
   
    $("#go_preview").click(function(){
                           $.mobile.changePage("template-preview.html");
                           FmMobile.userContent.text=$('#ur_text').val();
                                                      
                           });
    
    
},
};
