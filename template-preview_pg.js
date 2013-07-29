FmMobile.template_previewPg = {
    PAGE_ID : "template_previewPg",

    show : function() {
        FmMobile.analysis.trackPage("/template_previewPg");
        recordUserAction("enters template_previewPg");
    },

    init : function() {
        $("#nav-bar").show();

        if (FmMobile.selectedTemplate == 'miix_it') {

            var videoUgc;
            VideoUgc.getInstance('miix_it', 'miix_one_image', function(err,
                    _videoUgc) {
                if (!err) {
                    videoUgc = _videoUgc;
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

        } else {
            var imageUgc;
            ImageUgc.getInstance(FmMobile.selectedTemplate,
                    FmMobile.selectedSubTemplate, FmMobile.userContent,
                    function(err, _imageUgc) {
                        console.log(err);
                        if (!err) {
                            imageUgc = _imageUgc;
                            console.log(err);
                            $("#show").attr("src", imageUgc.getImageUrl());
                            console.log(err);

                        } else {
                            console.log(err);
                        }
                    });

            $('#btnTest').click(
                    function() {
                        $.mobile.showPageLoadingMsg();
                        var mainTemplate = FmMobile.selectedTemplate;
                        var ownerId = localStorage._id; 
                        var ownerFbUserId = localStorage.fb_userID; 
                        var ugcProjectId = mainTemplate
                                + '-'
                                + ownerId
                                + '-'
                                + (new Date()).toISOString().replace(/[-:.]/g,
                                        "");
                        var ugcInfo = {
                            ownerId : {
                                _id : ownerId,
                                fbUserId : ownerFbUserId
                            },
                            contentGenre : mainTemplate,
                            title : "today's mood"
                        };

                        imageUgc.uploadToServer(ugcProjectId, ugcInfo,
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
