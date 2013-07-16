FmMobile.myUgcPg = {
    PAGE_ID: "myUgcPg",
    
    init: function(){
        FM_LOG("[myUgcPg] pageinit");
        $('#nav-bar').show();
        
        $("#btnMiixMovie").click(function(){
//            $("#btnMiixMovie>img").attr("src","images/a-my_video.png");
//            $("#btnLiveMovie>img").attr("src","images/e-dooh.png");
//            FmMobile.myVideoPg.loadMyVideo();
//             FmMobile.myUgcPg.loadMyVideo();
        });
        $("#btnLiveMovie").click(function(){
//            $("#btnMiixMovie>img").attr("src","images/e-my_video.png");
//            $("#btnLiveMovie>img").attr("src","images/a-dooh.png");
//            FmMobile.myVideoPg.loadMyStreetVideo();
//             FmMobile.myUgcPg.loadMyStreetVideo();
        });
        
    },
    
    show: function(){
        FM_LOG("[myUgcPg] pageshow");
    },
    
    
};
