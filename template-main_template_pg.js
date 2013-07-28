FmMobile.template_mainTemplatePg = {
PAGE_ID: "template_mainTemplatePg",
  
    show: function(){
        FmMobile.analysis.trackPage("/template_mainTemplatePg");
        recordUserAction("enters template_mainTemplatePg");
    },
        
    init: function(){
            TemplateMgr.getInstance(function(err, _templateMgr){
            if (!err) {
                    templateMgr = _templateMgr;
                                    
                    var parent=$("#booking_list");
                    parent.html("");
                    var temp=$("<div>").attr({class: "template"});
                    parent.append(temp);


                    for(var i=0;i<templateMgr.getTemplateList().length;i++){
                            var mainTemplate = $("<div>").attr({id:templateMgr.getTemplateList()[i].id,class: "choose-movie", title:templateMgr.getTemplateList()[i].name});
                            var templatePic = $("<div>").attr({class: "choose-movie-pic"});
                            var templatePicDummy = $("<div>").attr({class: "movie-pic-dummy"});
                            var templatePicImg=$("<img>").attr({src:"images/choose_movie.png",class: "movie-pic-img"});
                            var templateName=$("<div>").attr({class:"template_name"});


                            templatePic.appendTo(mainTemplate);
                            templatePicDummy.appendTo(templatePic);
                            templatePicImg.appendTo(templatePic);
                            templateName.html(templateMgr.getTemplateList()[i].name);
                            templateName.appendTo(mainTemplate);
                            mainTemplate.appendTo(parent);
                        }
                                    
                            $("#booking_list > div").click(function(){
                                      
                          // var shit=$(".template_name");
                                //      alert(shit);
                                      //shit
                                     //alert(this.id);
                                    //alert(this.title);
                              FmMobile.selectedTemplateName=this.title;
                                                           //alert(shit[0].innerHTML);
                                     //alert(this.name);
                                     FmMobile.selectedTemplate=this.id;
                                                           
                                                          
                                                           
if(FmMobile.selectedTemplate=='check_in'){
$.mobile.changePage("template-sub-checkin.html");
}else if(FmMobile.selectedTemplate=='miix_it'){
$.mobile.changePage("template-sub-miixit.html");
}else{
$.mobile.changePage("template-sub_template.html");
}
                                    });
                }
            else {
            console.log("Fail to get templateMgr: "+err);
                }
            });
        
               
		$('#nav-bar').show();
        //alert(FmMobile.mycount);
        
       
        //console.log(templateMgr.getTemplateList().length);
                //alert(shit);
        //templateMgr.getTemplateList().length;
        //alert(FmMobile.mycount);
//       console.log(templateMgr.getTemplateList().length);
        /*
        var parent=$("#booking_list");
        parent.html("");
        var temp=$("<div>").attr({class: "template"});
        parent.append(temp);
        
        
       for(var i=0;i<FmMobile.mycount;i++){
           
        var mainTemplate = $("<div>").attr({class: "choose-movie"});
        var templatePic = $("<div>").attr({id:"go_cultural", class: "choose-movie-pic"});
        var templatePicDummy = $("<div>").attr({class: "movie-pic-dummy"});
        var templatePicImg=$("<img>").attr({src:"images/choose_movie.png",class: "movie-pic-img"});
        var templateName=$("<div>").attr({class:"template_name"});

        
                templatePic.appendTo(mainTemplate);
        templatePicDummy.appendTo(templatePic);
        templatePicImg.appendTo(templatePic);
        templateName.html("文創設計");
        templateName.appendTo(mainTemplate);
         mainTemplate.appendTo(parent);

        }
        */
        /*
        $("#go_cultural").click(function(){
                                alert( templateMgr.getTemplateList().length);
                                });

                $("#go_cultural").click(function(){
                $.mobile.changePage("template-sub_cultural.html");
                FmMobile.selectedTemplate=templateMgr.getTemplateList()[0].selected;
        });
        $("#go_mood").click(function(){
                $.mobile.changePage("template-sub_template.html");
                FmMobile.selectedTemplate=templateMgr.getTemplateList()[1].selected;
        });
        
        $("#go_checkin").click(function(){
                $.mobile.changePage("template-sub-checkin.html");
                FmMobile.selectedTemplate=templateMgr.getTemplateList()[2].selected;
        });
        
        $("#go_miixit").click(function(){
                $.mobile.changePage("template-sub-miixit.html");
                FmMobile.selectedTemplate=templateMgr.getTemplateList()[3].selected;
        });
       */
       

        
    },
    
};
