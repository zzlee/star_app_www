FmMobile.orientationPg = {
    PAGE_ID: "orie_1",
    idx: 1,
    max: 5,
        
    swipeleft: function(){
        if( ++FmMobile.orientationPg.idx > FmMobile.orientationPg.max){
            //FmMobile.orientationPg.idx = FmMobile.orientationPg.max;
            if (!localStorage._id) {
                $.mobile.changePage("fb_login.html", {transition: "slide"});
            }
            else {
                $.mobile.changePage("setting.html");
            }
        }else{
            $.mobile.changePage($("#orie_" + FmMobile.orientationPg.idx), {transition: "slide"});
        }
    },
        
    swiperight: function(){
        if( --FmMobile.orientationPg.idx < 1){
            FmMobile.orientationPg.idx = 1;
        }else{
            $.mobile.changePage($("#orie_" + FmMobile.orientationPg.idx)
                                , { transition: "slide",
                                reverse: true});
        }
    },
        
    init: function(){
        FmMobile.orientationPg.idx = 1;
        
    },
        
    show: function(){
        //FmMobile.analysis.trackPage("/orientationPg");
        //FmMobile.push.registerDevice();
    },
};
