FmMobile.template_previewPg = {
    PAGE_ID : "template_previewPg",

    show : function() {
        FmMobile.analysis.trackPage("/template_previewPg");
        recordUserAction("enters template_previewPg");
    },

    init : function() {
        $("#nav-bar").show();
        
        
        
        /*  點下去跳到full screen  */
        $(".content-movie").click(function(){
           $.mobile.changePage("fullPageViewer.html");
        });
        /* ends of 點下去跳到full screen */
        
        /* 判斷按上一步要回哪一頁 */
        if(FmMobile.selectedSubTemplate=='text_only' && FmMobile.selectedTemplate != "check_in"){
            $('#cancelBtnToCropper').click(function(){
                $.mobile.changePage("template-input_text.html");
            });

        }else if(FmMobile.selectedTemplate=="check_in"){
            $('#cancelBtnToCropper').click(function(){
                $.mobile.changePage("template-sub-checkin.html");
            });

        }else{
            $('#cancelBtnToCropper').click(function(){
                 $.mobile.changePage("template-photo_cropper.html");
            });
        }
        /* ends of 判斷按上一步要回哪一頁 */

        
        /* preview page title bar text 影片根其他不一樣*/
        if(FmMobile.selectedTemplate == 'miix_it'){
            $('#clickImgEffect').html("劇照模擬預覽");
            $('#afterSendText').html('按下確定投件後,您將會收到APP的推 播,通知您是目前第幾位試鏡者。若導 演決定刊登您的作品,您會收到APP的 推播與facebook預告,通知登場日期時 間。名額稀少,導演優先挑選創意作品。');
        }else if(FmMobile.selectedTemplate == 'check_in'){
            $('#clickImgEffect').html("點擊可放大");
            $('#afterSendText').html('按下確定投件後,這張作品將會發佈於您 的facebook。此外您將會收到APP的推播,通知您 是目前第幾位試鏡者。若導演決定刊登您的作品, 您會收到APP的推播與facebook預告,通知登場日 期時間。名額稀少,導演優先挑選創意作品。');
        }
        else{
            $('#clickImgEffect').html('點擊可放大');
             $('#afterSendText').html('按下確定投件後,您將會收到APP的推 播,通知您是目前第幾位試鏡者。若導 演決定刊登您的作品,您會收到APP的 推播與facebook預告,通知登場日期時 間。名額稀少,導演優先挑選創意作品');
        }
       /* ends of preview page title bar text 影片根其他不一樣*/
        
        
        if (FmMobile.selectedTemplate == 'miix_it') {

            var videoUgc;
            //$.mobile.showPageLoadingMsg();
            VideoUgc.getInstance('miix_it', 'miix_one_image', FmMobile.userContent, function(err, _videoUgc) {
                if (!err) {
                    videoUgc = _videoUgc;
                    $("#show").attr("src", videoUgc.getDoohPreviewImageUrl());
                    //$.mobile.hidePageLoadingMsg();
                }
                else {
                    console.log(err);
                }
            });

            $('#btnTest').click(
                    function() {
                        $.mobile.showPageLoadingMsg();
                        var mainTemplate = FmMobile.selectedTemplate;
                        var ownerId = localStorage._id; 
                        var ownerFbUserId = localStorage.fb_userID; 
                        var ugcInfo = {
                            ownerId : {
                                _id : ownerId,
                                fbUserId : ownerFbUserId
                            },
                            title : "My Miix move!!"
                        };

                        videoUgc.askServerToGenerate(FmMobile.userContent,
                                ugcInfo, function(err) {
//                                    console.log("err=" + err);
                                    if (!err) {
                                        // alert("success!");
                                        FM_LOG("[templatePreview]Video uploads successfully.");
                                        FmMobile.showNotification("uploadUgc");
                                    }
                                    $.mobile.hidePageLoadingMsg();
                                    FmMobile.myUgcPg.Type = "content";
                                    $.mobile.changePage("my_ugc.html");
                                });
                    });

        }else if(FmMobile.selectedTemplate == 'check_in'){
            var imageUgc;
            ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent, function(err, _imageUgc) {
                if (!err) {
                    imageUgc = _imageUgc;
                    FmMobile.viewerBackFlag='backPreview';
                    FmMobile.imgForFullPageViewer=imageUgc.getDoohPreviewImageUrl();

                    $("#show").attr("src", imageUgc.getDoohPreviewImageUrl());
                }else {
                    console.log(err);
                }
            });
            
            $('#btnTest').click(function() {
                $.mobile.showPageLoadingMsg();
                var mainTemplate = FmMobile.selectedTemplate;
                var ownerId = localStorage._id;
                var ownerFbUserId = localStorage.fb_userID;
                var ugcInfo = {
                        ownerId : {
                            _id : ownerId,
                            fbUserId : ownerFbUserId
                        },
                        contentGenre : mainTemplate,
                        title : "today's mood"
                    };
                                
                imageUgc.uploadToServer(ugcInfo,function(err) {
                    if (!err) {
                        if(FmMobile.selectedTemplate=="check_in"){
                            var url = starServerURL + "/miix/members/" + localStorage._id + "/ugcs";
                        
                            $.ajax({
                                   url: url,
                                   dataType: 'json',
                                   success: function(response){
                                       if(response){
                                            console.log(response[0].url.s3);
                                            FmMobile.check_in_pic=response[0].url.s3;
                                            FmMobile.shareProjectID= response[0].projectId;
                                            FmMobile.authPopup.postCheckinMessage();
                   
                                       }else{
                                            console.log("[error] : " + response.error);
                                   }
                               }
                           });
                        

                        }//End of if
                        FM_LOG("[templatePreview]Image uploads successfully.");
                        FmMobile.showNotification("uploadUgc");
        
                    }//End of if(!err)
                    $.mobile.hidePageLoadingMsg();
                    FmMobile.myUgcPg.Type = "content";
                    $.mobile.changePage("my_ugc.html");
                });
                                
            });
        }
        else {
            var imageUgc;
            $.mobile.showPageLoadingMsg();
            ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent, function(err, _imageUgc) {
                $.mobile.hidePageLoadingMsg();
                if (!err) {
                    imageUgc = _imageUgc;
                    FmMobile.viewerBackFlag='backPreview';
                    FmMobile.imgForFullPageViewer=imageUgc.getDoohPreviewImageUrl();
                    $("#show").attr("src", imageUgc.getDoohPreviewImageUrl());
                    
                    $('#btnTest').click(function() {
                        $.mobile.showPageLoadingMsg();
                        var mainTemplate = FmMobile.selectedTemplate;
                        var ownerId = localStorage._id; 
                        var ownerFbUserId = localStorage.fb_userID; 
                        
                        var ugcInfo = {
                            ownerId : {
                                _id : ownerId,
                                fbUserId : ownerFbUserId
                            },
                            contentGenre : mainTemplate,
                            title : "today's mood"
                        };
            
                        imageUgc.uploadToServer(ugcInfo,function(err) {
                            if (!err) {
                                FM_LOG("[templatePreview]Image uploads successfully.");
                                FmMobile.showNotification("uploadUgc");
                            }
                            $.mobile.hidePageLoadingMsg();
                            FmMobile.myUgcPg.Type = "content";
                            $.mobile.changePage("my_ugc.html");
                        });

                    });

                }else {
                    console.log(err);
                }
            });
            


        }

    },
};
