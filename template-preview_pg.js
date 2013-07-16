FmMobile.template_previewPg = {
PAGE_ID: "template_previewPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_previewPg");
    recordUserAction("enters template_previewPg");
},
    
init: function(){
    $("#test").append(FmMobile.selectedTemplate,FmMobile.selectedSubTemplate);
    //$.mobile.changePage("template-preview");

 },
};
