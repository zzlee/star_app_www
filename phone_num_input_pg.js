FmMobile.phoneNumInputPg = {
PAGE_ID: "phoneNumInputPg",
    
    init: function(){
        FmMobile.bindClickEventToNavBar();
        $("#phone_num").click(function(){
            FmMobile.authentication.getCode();
        });
    },
        
    show: function(){
        FmMobile.analysis.trackPage("/phoneNumInputPg");
        recordUserAction("enters phoneNumInputPg");
    },
};

