FmMobile.template_previewPg = {
    PAGE_ID : "template_previewPg",

    show : function() {
        FmMobile.analysis.trackPage("/template_previewPg");
        recordUserAction("enters template_previewPg");
    },

    init : function() {
        $("#nav-bar").show();
        /* 判斷按上一步要回哪一頁 */
        if(FmMobile.selectedSubTemplate=='text_only'){
            $('#cancelBtnToCropper').click(function(){
                                  $.mobile.changePage("template-input_text.html");
                                  });

        }else{
        $('#cancelBtnToCropper').click(function(){
                     $.mobile.changePage("template-photo_cropper.html");         
                  });
        }
        /* ends of 判斷按上一步要回哪一頁 */

        
        /* preview page title bar text 影片根其他不一樣*/
        if(FmMobile.selectedTemplate == 'miix_it'){
            $('.header-text').html("劇照模擬預覽");
        }else{
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
                                    console.log("err=" + err);
                                    if (!err) {
                                        // alert("success!");
                                    }
                                    $.mobile.hidePageLoadingMsg();
                                    $.mobile.changePage("my_ugc.html");
                                });
                    });

        }
        else if(FmMobile.selectedTemplate == 'check_in'){
            var imageUgc;
            ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent, function(err, _imageUgc) {
                                 if (!err) {
                                 imageUgc = _imageUgc;
                                 $("#show").attr("src", imageUgc.getDoohPreviewImageUrl());
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
                                contentGenre : mainTemplate,
                                title : "today's mood"
                                };
                                
                                imageUgc.uploadToServer(ugcInfo,
                                                        function(err) {
                                                        console.log("err=" + err);
                                                        
                                                        if (!err) {
                                                        //alert("success!");
                                                        }
                                                        $.mobile.hidePageLoadingMsg();
                                                        $.mobile.changePage("my_ugc.html");
                                                        });
                                
                                });
        }
        else {
            var imageUgc;
            ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent, function(err, _imageUgc) {
                if (!err) {
                    imageUgc = _imageUgc;
                    $("#show").attr("src", imageUgc.getDoohPreviewImageUrl());
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
                            contentGenre : mainTemplate,
                            title : "today's mood"
                        };

                        imageUgc.uploadToServer(ugcInfo,
                                function(err) {
                                    console.log("err=" + err);

                                    if (!err) {
                                        //alert("success!");
                                    }
                                    $.mobile.hidePageLoadingMsg();
                                    $.mobile.changePage("my_ugc.html");
                                });

                    });

        }

    },
};
