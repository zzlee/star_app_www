FmMobile.template_miixitPg = {
PAGE_ID: "template_miixitPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_miixitPg");
    recordUserAction("enters template_miixitPg");
    //$('.content-movie-img').attr("height",$('.content-movie-img').width()/757*439);
},
    
init: function(){
    
    $('#nav-bar').show();
    
    if(localStorage[FmMobile.selectedTemplate]=='hasReadHint'){
        $("#show_intro").hide();
        $("#close").hide();
    }else{
        $("#show_intro").show();
    }
    
    if(device.platform == "Android"){
    	//replace the <video> with <iframe>
    	$("#video_iOS").hide();
    	$("#iframe_Android").show();
    }else if((device.platform == "iPhone") || (device.platform == "iPad") || (device.platform == "iPod touch")){
    	$("#video_iOS").show();
    	$("#iframe_Android").hide();
    }
    $("#close").click(function(){
              $("#show_intro").hide();
              $('#close').hide();
              localStorage[FmMobile.selectedTemplate]='hasReadHint';
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
