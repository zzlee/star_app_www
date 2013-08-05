FmMobile.facebookSharePg = {
PAGE_ID: "facebookSharePg",
    
show: function(){
    FmMobile.analysis.trackPage("/facebookSharePg");
    recordUserAction("enters facebookSharePg");
},
    
init: function(){
    
            $("#nav-bar").show();
            $('#youtubePlay').hide();
            $('#shareFbPhoto').hide();

        if(FmMobile.shareFbType=="video"){
            $('#youtubePlay').attr({src:FmMobile.youtubeVideoUrl});
            $('#youtubePlay').show();
        }else if(FmMobile.shareFbType=="image"){
            $('#shareFbPhoto').attr({src:FmMobile.srcForMyUgcViewer});
            $('#shareFbPhoto').show();
        }
    
            $('#go_preview').click(function(){
                FmMobile.userContent.text=$('#ur_text').val();
                                   if(FmMobile.shareFbType=="video"){
                                   FmMobile.authPopup.postFbVideoMessage();
                                   }else if(FmMobile.shareFbType=="image"){
                                   FmMobile.authPopup.postFbMessage();
                                   
                                   }
                $.mobile.changePage('my_ugc.html');
            });
   },
};