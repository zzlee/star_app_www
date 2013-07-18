FmMobile.template_input_textPg = {
PAGE_ID: "template_input_textPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_input_textPg");
    recordUserAction("enters template_input_textPg");
},
    
init: function(){
    $("#nav-bar").show();
    
   
    $("#go_preview").click(function(){
                           if($("#ur_text").val().length==0 ||$("#ur_text").val()==" "){
                           alert("請輸入文字！");
                           }else{
                        
                           $.mobile.changePage("template-preview.html");
                           FmMobile.userContent.text=$('#ur_text').val();
                           }
                           });
    
  var text_limit=39;
    $("#ur_text").focusout(function(){
                     
                           if($("#ur_text").val().length>text_limit){
                               //alert("超過6個中文字囉！");
                               var num = $("#ur_text").val().substr(0, text_limit);
                               $("#ur_text").val(num);
                           }
                      $("#now").text(text_limit - $("#ur_text").val().length);
                           
                    });
    
    $("#ur_text").keyup(function(){                        
                    var curLength = $("#ur_text").val().length;
                if (curLength > text_limit) {
                        var num = $("#ur_text").val().substr(0,text_limit);
                        $("#ur_text").val(num);
                        alert("超過"+text_limit+"字數限制，多出的字將被移除！");
                        }
   });
 

  },
   // $('#ur_text').keyup(function() {alert("hy");});
    //$('#ur_text').bind('keyup', function() { alert('hi') } );
    
};
