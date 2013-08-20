FmMobile.template_input_textPg = {
PAGE_ID: "template_input_textPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_input_textPg");
    recordUserAction("enters template_input_textPg");
    FmMobile.dummyDiv();
},
    
init: function(){
    $("#nav-bar").show();
    
    $('#template_top_img_text').attr({src:FmMobile.selectedTemplateBarImg});    
    
    $("#back_main").click(function(){
                          $.mobile.changePage("template-sub_template.html");
                          });
    
    $("#go_preview").click(function(){
                           
                            
                           
                           if($("#ur_text").val().length==0 ||$("#ur_text").val()==" "){
                           FmMobile.showNotification("nullText");
                           }else{
                           var check_format= FmMobile.userContent.text.split("<n>");
                           //FmMobile.userContent.text=check_format;
                           if(check_format.length>3){
                           FmMobile.showNotification("moreLines");
                           return false;
                           //alert("more than 4 lines!");
                           }
                           
                           if(check_format[0].length >13){
                           
                           FmMobile.showNotification("moreWords");
                           return false;
                           
                           
                           }
                           if(check_format[1] != undefined){
                           if(check_format[1].length >13 ){
                           FmMobile.showNotification("moreWords");
                           return false;
                           
                           }
                           }
                           
                           if(check_format[2] != undefined){
                           if(check_format[2].length >13 ){
                           FmMobile.showNotification("moreWords");
                           return false;
                           
                           }
                           }

                        
                           $.mobile.changePage("template-preview.html");
                           FmMobile.userContent.picture.urlOfOriginal=null;
                           FmMobile.userContent.picture.crop._x=null;
                           FmMobile.userContent.picture.crop._y=null;

                           FmMobile.userContent.picture.crop._w=null;
                           FmMobile.userContent.picture.crop._h=null;
              
                           
                                              }
               
                           });
    
    var textForUgcUtility;

    $("#ur_text").bind("blur",function(){
                       textForUgcUtility= $("#ur_text").val().replace(/\n/g,"<n>");
                       FmMobile.userContent.text=textForUgcUtility;
                       });

    
    $("#ur_text").keyup(function(){
                        var moreLineInBox=$("#ur_text").val();
                        moreLineInBox=$("#ur_text").val().replace(/\n/g,"<n>");
                        var moreLineInBox_2=moreLineInBox.split("<n>");
                           if(moreLineInBox_2.length>3){
                                alert("小巨蛋電視牆沒那麼高喔...");
                                $("#ur_text").val(moreLineInBox_2[0]+"\n"+moreLineInBox_2[1]+"\n"+moreLineInBox_2[2]);
                                return false;
                        }
                        });

    /*
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
     */
    
    
    
 

  },
   // $('#ur_text').keyup(function() {alert("hy");});
    //$('#ur_text').bind('keyup', function() { alert('hi') } );
    
};
