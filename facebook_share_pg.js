FmMobile.facebookSharePg = {
PAGE_ID: "facebookSharePg",
    
show: function(){
    FmMobile.analysis.trackPage("/facebookSharePg");
    recordUserAction("enters facebookSharePg");
},
    
init: function(){
    //test
            $("#nav-bar").show();
            $('#youtubePlay').hide();
            $('#shareFbPhoto').hide();

        if(FmMobile.shareFbType=="video"){
            $('#youtubePlay').attr({src:FmMobile.youtubeVideoUrl, style: "height: 90%;"});
            $('#youtubePlay').show();
        }else if(FmMobile.shareFbType=="image"){
            if(FmMobile.myUgcPg.Type == "live"){
                $('#shareFbPhoto').attr({src:FmMobile.srcForMyUgcViewer, style: "height: 90%;"});
            }else{
                var checkImgType = FmMobile.srcForMyUgcViewer.split('_');
                if(checkImgType[checkImgType.length - 1] != "preview.png"){
                    var shareContent = $("#share_content");
                    shareContent.html("");
                    var dummyDivLong = $("<div>").attr({class:"movie-pic-dummy-long"});
    //                var widget = $("<div>").attr({class: "content-movie-long"});
                    dummyDivLong.appendTo(shareContent);
                    
                    this.imageThumbnail = $("<img>").attr({
                                                          id: "shareFbPhoto",
                                                          src: FmMobile.srcForMyUgcViewer,
                                                          class: "content-movie-img-long"
                                                          });
                    
                    this.imageThumbnail.appendTo(shareContent);
                }else{
                    $('#shareFbPhoto').attr({src:FmMobile.srcForMyUgcViewer});
                }

//                $('#shareFbPhoto').attr({src:FmMobile.srcForMyUgcViewer});
            }
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