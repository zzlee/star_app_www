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
    
  
    $("#now").html($("#ur_text").val().length);

    
    
    $("#ur_text").keyup(function(){
                       
                        var curLength = $("#ur_text").val().length;
                        if (curLength > 5) {
                        var num = $("#ur_text").val().substr(0, 5);
                        $("#ur_text").val(num);
                        alert("超過字數限制，多出的字將被移除！");
                        } else {
                        //curLength = $("#ur_text").val().length;
                        $("#textCount").text(5 - $("#ur_text").val().length);
                                                }
                        
                       });

  },
   // $('#ur_text').keyup(function() {alert("hy");});
    //$('#ur_text').bind('keyup', function() { alert('hi') } );
    
};
