FmMobile.orientationPg = {
    PAGE_ID: "orie_1",
    idx: 1,
    max: 5,
        
    swipeleft: function(){
        if( ++FmMobile.orientationPg.idx > FmMobile.orientationPg.max){
            //FmMobile.orientationPg.idx = FmMobile.orientationPg.max;
            
            /* test for setting flow, so change "if(!localStorage._id)" to
            "if(localStorage._id)", 
            */
             if (localStorage._id) {
                $.mobile.changePage("login_toc.html", {transition: "slide"});
            }
            else {
                $.mobile.changePage("setting-main.html");
            }
        }else{
            $.mobile.changePage( ("orientation_" + FmMobile.orientationPg.idx+".html"), {transition: "slide"});
        }
    },
        
    swiperight: function(){
        if( --FmMobile.orientationPg.idx < 1){
            FmMobile.orientationPg.idx = 1;
        }else{
            $.mobile.changePage(("orientation_" + FmMobile.orientationPg.idx+".html")
                                , { transition: "slide",
                                reverse: true});
        }
    },
        
    init: function(){
        FmMobile.orientationPg.idx = 1;
        $('#nav-bar').hide();

        
    },
        
    show: function(){
        //FmMobile.analysis.trackPage("/orientationPg");
        //FmMobile.push.registerDevice();
    },
};
