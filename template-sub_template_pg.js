FmMobile.template_subTemplatePg = {
    PAGE_ID: "template_subTemplatePg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_subTemplatePg");
        recordUserAction("enters template_subTemplatePg");
    },
        
    init: function(){
		$('#nav-bar').show();
        
        var settings = {
        type: "GET",
        dataType: "html",
            
        success: function(data, textStatus, jqXHR ){
            $("#show_intro").html(data);
                        cb1_series(null);
        },
        error: function(jqXHR, textStatus, errorThrown){
            cb1_series(errorThrown);
        }
        };
        $.ajax("template/"+FmMobile.selectedTemplate+"/template_instruction.html",settings);
        
      
        $("#show_intro").show();
        $("#close").click(function(){
                      $("#show_intro").hide();
                          $('#close').hide();
                  });
        
        
        $('#template_top_img').attr({src:FmMobile.selectedTemplateBarImg});
        $('#start_subTemplate').html("");
        
        var start=$("#start_subTemplate");
        
        
        
        
        
        
        for(var i=0;i<templateMgr.getSubTemplateList(FmMobile.selectedTemplate).length;i++){
            var mainStyle = $("<div>").attr({class: "style"});
            var sub_number= $("<div>").attr({class: "buttonlong_text"});
            var sub__button_img = $("<img>").attr({class:"label-img",
                                                   src:"images/button_long2.png",
                                                   id:templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].id
                                                  });
            var sub_img = $("<img>").attr({class:"style-img",
                                           src:templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].representingImageUrlSub,
                                           id:templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].id
                                          
                                          });
            var sub_des = $("<div>").attr({class:"style_text"});
            var sub_line = $("<div>").attr({class:"hr_line_template"});
            sub_des.appendTo(mainStyle);
            sub_number.appendTo(mainStyle);
            sub__button_img.appendTo(mainStyle);
            sub_img.appendTo(mainStyle);
            
            sub_line.appendTo(mainStyle);
            mainStyle.appendTo(start);
            
            sub_number.html(templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].name);
            sub_des.html(templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].description);
            

        }
        
        $("#start_subTemplate > div > img").click(function(){
                                          if(this.id=='text_only'){
                                          FmMobile.selectedSubTemplate=this.id;
                                          $.mobile.changePage("template-input_text.html");
                                          }else if(this.id=='picture_only'){
                                          FmMobile.selectedSubTemplate=this.id;
                                          $.mobile.changePage("template-input_pic.html");
                                          }else if(this.id=='picture_plus_text'){
                                          FmMobile.selectedSubTemplate=this.id;
                                          $.mobile.changePage("template-input_text_pic.html");
                                          }else if(this.id=='miix_one_image'){
                                          FmMobile.selectedSubTemplate=this.id;
                                          $.mobile.changePage("template_input_miixit.html");
                                          
                                          }
                                          });
         /*
        for(var i=0;i<templateMgr.getSubTemplateList(FmMobile.selectedTemplate).length;i++){
            
                var mainStyle = $("<div>").attr({class: "style"});
                var chooseMovieStyle = $("<div>").attr({class: "choose-movie-style"});
                var chooseMoviePic = $("<div>").attr({class: "choose-movie-pic"});
                var moviePicDummy = $("<div>").attr({class: "movie-pic-dummy"});
                var movieImg = $("<img>").attr({class: "movie-pic-img", src:templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].representingImageUrlSub});
                var videoIcon = $("<div>").attr({class: "my-video-icon",id:templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].id});
                var buttonText = $("<div>").attr({class: "style_button_text" });
                var buttonImg = $("<img>").attr({class: "my-video-icon-img", src:"images/button.png"});
                var styleText = $("<div>").attr({class: "style_text"});

                moviePicDummy.appendTo(chooseMoviePic);
                movieImg.appendTo(chooseMoviePic);
                chooseMoviePic.appendTo(chooseMovieStyle);
                chooseMovieStyle.appendTo(mainStyle);
                buttonText.appendTo(videoIcon);
                buttonImg.appendTo(videoIcon);
                videoIcon.appendTo(mainStyle);
                styleText.appendTo(mainStyle);
                mainStyle.appendTo(start);
        
                buttonText.html( templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].name);
                styleText.html(templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[i].description);
        }
        
                
         
         */
   },
};
