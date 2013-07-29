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
                            var templatePicImg=$("<img>").attr({src:templateMgr.getTemplateList()[i].representingImageUrl,class: "movie-pic-img"});
                            var templateName=$("<div>").attr({class:"template_name"});


                            templatePic.appendTo(mainTemplate);
                            templatePicDummy.appendTo(templatePic);
                            templatePicImg.appendTo(templatePic);
                            templateName.html(templateMgr.getTemplateList()[i].name);
                            templateName.appendTo(mainTemplate);
                            mainTemplate.appendTo(parent);
                        }
                                    
                            $("#booking_list > div").click(function(){
                                      
                                     FmMobile.selectedTemplateName=this.title;
                                     FmMobile.selectedTemplate=this.id;
                                                 
                                        if(FmMobile.selectedTemplate=='check_in'){
                                            $.mobile.changePage("template-sub-checkin.html");
                                        }else{
                                            $.mobile.changePage("template-sub_template.html");
                                        }
                                });
                }else{
                    console.log("Fail to get templateMgr: "+err);
                }
            });
                       
		$('#nav-bar').show();
        
    },
};
