FmMobile.bookingChooseMoviePg = {
    PAGE_ID: "bookingChooseMoviePg",
 
    init: function(){
        FmMobile.bindClickEventToNavBar();
    },
    
    show: function(){
        FmMobile.analysis.trackPage("/bookingChooseMoviePg");
        recordUserAction("enters bookingChooseMoviePg");
    },
};

