FmMobile.template_checkinPg = {
    PAGE_ID: "template_checkinPg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_checkinPg");
        recordUserAction("enters template_checkinPg");
    },
        
    init: function(){
        
        var rightLocation=false;
        
        if (navigator.geolocation) {
            
            function errorHandler (error) {
                FmMobile.showNotification("gpsDeny");
                $.mobile.changePage("template-main_template.html");

                //alert('Attempt to get location failed: ' + error.message);
            }
            
            function successHandler (location) {
                var longitude_g;
                var latitude_g;
                //alert(location.coords.longitude);
                //alert(location.coords.latitude);
                longitude_g=location.coords.longitude;
                latitude_g=location.coords.latitude;
                //alert(typeof(latitude_g));
                var longitude_g=location.coords.longitude;
                var latitude_g=location.coords.latitude;
                //121.532<longitude_g && longitude_g<121.536) && (25.036<latitude_g && latitude_g<25.040
                if((121.532<longitude_g && longitude_g<121.536) && (25.036<latitude_g && latitude_g<25.040)){
                   // alert("在夢蝶");
                    rightLocation=true;
                }else{
                    //alert("不再夢蝶");
                    rightLocation=false;
                }
                
                
            }
            
            var options = {
            enableHighAccuracy: true,
            maximumAge: 60000,
            timeout: 45000
            };
            
            navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
            
            
        }
        
        
        
        //--------------------------------
		$('#nav-bar').show();
        
       
        
        //$("#show_intro").show();
        
        
        if(localStorage[FmMobile.selectedTemplate]=='hasReadHint'){
            $("#show_intro").hide();
            $("#close").hide();
        }else{
            $("#show_intro").show();
            
        }
        
        
        $("#close").click(function(){
                      $("#show_intro").hide();
                          $('#close').hide();
                          localStorage[FmMobile.selectedTemplate]='hasReadHint';

                          });
        
        $('#checkin_text_1').val("在下"+localStorage.fb_name);
         $('#checkin_text_2').val("各位有請了");
        
        
        /*
        $('#back_main').click(function(){
                  $.mobile.changePage("template-main_template.html");
                              
          });
        */
        
        
        $('#checkinPreview').click(function(){
                                   
                                   if($("#checkin_text_2").val().length==0 ||$("#ur_text").val()==" "){
                                   FmMobile.showNotification("nullText");
                                   return false;
                                   }
                                   
                                   if($("#checkin_text_1").val().length==0 ||$("#ur_text").val()==" "){
                                   FmMobile.showNotification("nullText");
                                   return false;
                                   }
                                   
                                   
                                   if(rightLocation==false){
                                   
                                   FmMobile.showNotification("wrongPlace");
                                   
                                   //alert("你不在附近...");
                                   return false;
                                   }
            var finalTextOfCheckin=$('#checkin_text_1').val()+"<n>路經貴寶地<n>"+$('#checkin_text_2').val();
            FmMobile.checkinTextForFB=$('#checkin_text_1').val()+"\n路經貴寶地\n"+$('#checkin_text_2').val();
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
