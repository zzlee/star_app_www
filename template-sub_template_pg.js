FmMobile.template_subTemplatePg = {
    PAGE_ID: "template_subTemplatePg",
        
    show: function(){
        FmMobile.analysis.trackPage("/template_subTemplatePg");
        recordUserAction("enters template_subTemplatePg");
    },
        
    init: function(){
		$('#nav-bar').show();
        //$('#show_sub').hide();
        $("#show_intro").show();
        
        $("#close").click(function(){
                      $("#show_intro").hide();
                           $('#show_sub').show();
                          $('#close').hide();
                          });
        
        
        
        $('#template_name').html(FmMobile.selectedTemplateName);

        $('#start_sub').html("");
        
        var start=$("#start_sub");
         
        for(var i=0;i<templateMgr.getSubTemplateList(FmMobile.selectedTemplate).length;i++){
            
                   var mainStyle = $("<div>").attr({class: "style"});
        var chooseMovieStyle = $("<div>").attr({class: "choose-movie-style"});
        var chooseMoviePic = $("<div>").attr({class: "choose-movie-pic"});
        var moviePicDummy = $("<div>").attr({class: "movie-pic-dummy"});
        var movieImg = $("<img>").attr({class: "movie-pic-img", src:"images/choose_movie.png"});
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
        
        //var fuck=$("#start_sub > div > div");
        //alert(fuck);
        $("#start_sub > div > div ~ div").click(function(){
                                                if(this.id=='text_only'){
                                                FmMobile.selectedSubTemplate=this.id;
                                                $.mobile.changePage("template-input_text.html");
                                                }else if(this.id=='picture_only'){
                                                 FmMobile.selectedSubTemplate=this.id;
                                                $.mobile.changePage("template-input_pic.html");
                                                }else if(this.id=='picture_plus_text'){
                                                 FmMobile.selectedSubTemplate=this.id;
                                                $.mobile.changePage("template-input_text_pic.html");
                                                }
                                    });

        //templateMgr.getSubTemplateList(FmMobile.selectedTemplate);
        //templateMgr.getSubTemplateList(FmMobile.selectedTemplate)[0].description
        
        
        
      //  var templatePic = $("<div>").attr({id:templateMgr.getTemplateList()[i].id, class: "choose-movie-pic"});
        
        
        var tem_mgr=templateMgr.getTemplateList();

        
        
        //$("#template_name").html('').append(tem_mgr[1].name);
        
        
       
        $("#sub_1").html('').append(tem_mgr[1].subTemplate.text_only.name).click(function(){
                    
       FmMobile.selectedSubTemplate=tem_mgr[1].subTemplate.text_only.selected;
                     $.mobile.changePage("template-input_text.html");
                     });
        $("#sub_2").html('').append(tem_mgr[1].subTemplate.picture_only.name).click(function(){
             
               FmMobile.selectedSubTemplate=tem_mgr[1].subTemplate.picture_only.selected;
               $.mobile.changePage("template-input_pic.html");
               });


        
       $("#sub_3").html('').append(tem_mgr[1].subTemplate.picture_plus_text.name).click(function(){
                 
                   FmMobile.selectedSubTemplate=tem_mgr[1].subTemplate.picture_plus_text.selected;
                   $.mobile.changePage("template-input_text_pic.html");
                   });


        
        
        
        /*
        console.dir(templateMgr.getTemplateList());

                
        alert(a[1].name);
       //templateMgr.getTemplateList();
        
      
        
*/
       
    },
};
