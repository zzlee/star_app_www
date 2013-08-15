FmMobile.settingAboutPg = {
PAGE_ID: "settingAboutPg",
    
show: function(){
    FmMobile.analysis.trackPage("/settingAboutPg");
    recordUserAction("enters settingAboutPg");
},
    
init: function(){
    $('#nav-bar').show();
    $('#contentAboutMiixIt').click(function(){
                                   var ref=window.open('http://apache.org', '_blank', 'location=yes');

                                   
                                   ref.addEventListener('loadstart', function() { alert(event.url); });
                                   
                                                                      });
       $("#back_setting").click(function(){
                             $.mobile.changePage("setting-main.html");
                             });
    
}
};