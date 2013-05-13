FmMobile.codeInputPg = {
PAGE_ID: "codeInputPg",
    
    init: function(){
        FmMobile.bindClickEventToNavBar();
        $("#verify_code").click(function(){
            FmMobile.authentication.sendCode();
        });
    },
        
    show: function(){
        FmMobile.analysis.trackPage("/codeInputPg");
        recordUserAction("enters codeInputPg");
    },
};

