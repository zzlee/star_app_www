FmMobile.template_previewPg = {
    PAGE_ID : "template_previewPg",

    show : function() {
        FmMobile.analysis.trackPage("/template_previewPg");
//        recordUserAction("enters template_previewPg");
        FmMobile.dummyDiv();
    },

    init : function() {
        $("#nav-bar").show();
        
        
        
                /*  點�跳�full screen  */
        $(".content-movie").bind('click',function(){
                                
            if(FmMobile.checkNetwork()){
               $.mobile.changePage("imgZoomViewer.html");
            }
        });
        /*
        $(".content-movie").click(function(){
                       $.mobile.changePage("fullPageViewer.html");
        });
         */
        /* ends of 點�跳�full screen */
        
        /* �斷��一步�哪一*/
        
        $("#cancelBtnToCropper").click(function() {
                              history.back();
                              return false;
                              });
        
        /*
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
         */
        
        /* ends of �斷��一步�哪一*/
    
        
        /* preview page title bar text 影�其他�一�/
        if(FmMobile.selectedTemplate == 'miix_it'){
            $('.header-text').html("�照模擬�覽");
            $('#afterSendText').html('��確�件徨�收�APP�推�知�是��第幾位試�者。若導�決�登��作�,��到APP�推��facebook��,�知�場����額��導��選��作�);
        }else if(FmMobile.selectedTemplate == 'check_in'){
            $('#clickImgEffect').html("點�放�);
            $('#afterSendText').html('��確�件徙張作�將��您�facebook�此外您將�到APP�推�知�目�第幾�試鏡�。若導�決�登��作�, ��到APP�推��facebook��,�知�場��。�額��導��選��作�);
        }
        else{
            $('#clickImgEffect').html('點�放�);
             $('#afterSendText').html('��確�件徨�收�APP�推�知�是��第幾位試�者。若導�決�登��作�,��到APP�推��facebook��,�知�場����額��導��選��作�');
        }
       /* ends of preview page title bar text 影�其他�一�/
        
        if(FmMobile.checkNetwork()){
            if (FmMobile.selectedTemplate == 'miix_it') {

                var videoUgc;
                //$.mobile.showPageLoadingMsg();
                VideoUgc.getInstance('miix_it', 'miix_one_image', FmMobile.userContent, function(err, _videoUgc) {
                    if (!err) {
                        videoUgc = _videoUgc;
                                     FmMobile.viewerBackFlag='backPreview';
                                     FmMobile.imgForFullPageViewer=videoUgc.getDoohPreviewImageUrl();
                        $("#show").attr("src", videoUgc.getDoohPreviewImageUrl());
                        //$.mobile.hidePageLoadingMsg();
                    }else{
                        console.log(err);
                    }
                });

                $('#btnTest').click(
                    function(){
                    $('#clickImgEffect').hide("normal");
                    $(".content-movie").unbind("click");
                    $('#afterClickBack').hide("normal");
                    $('#afterClickSent').hide("normal",function() {
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

                        videoUgc.askServerToGenerate(
                                 FmMobile.userContent,ugcInfo, function(err) {
                                                   //                                    console.log("err=" + err);
                                                    if (!err) {
                                                        // alert("success!");
                                                        FM_LOG("[templatePreview]Video uploads successfully.");
                                                        FmMobile.analysis.trackEvent("Content", "Upload", "video", 1 );	
                                                        FmMobile.myUgcPg.Type = "content";
                                                        FmMobile.showNotification("uploadUgc");
//                                                        $.mobile.hidePageLoadingMsg();
//                                                        $.mobile.changePage("my_ugc.html");
                                                     }else{
                                                         FmMobile.showNotification("uploadFailed");
                                                         $('#clickImgEffect').show("normal");
                                                         $('#afterClickBack').show("normal");
                                                         $('#afterClickSent').show("normal");
                                                         $.mobile.hidePageLoadingMsg();
                                                     }

                                                   });
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
                
                $('#btnTest').click(function(){
                    $('#clickImgEffect').hide("normal");
                    $(".content-movie").unbind("click");
                    $('#afterClickBack').hide("normal");
                    $('#afterClickSent').hide("normal",function() {
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
                                                                 data:{ miixToken: localStorage.miixToken },
                                                                 success: function(response){
                                                                     if(response){
                                                                     console.log(response[0].url.s3);
                                                                 FmMobile.check_in_pic= response[0].doohPreviewUrl;
                                                                     FmMobile.shareProjectID= response[0].projectId;
                                                                     FmMobile.authPopup.postCheckinMessage();
                                                                     
                                                                     }else{
                                                                     console.log("[error] : " + response.error);
                                                                     }
                                                                 }
                                                                 });
                                                  
                                                  
                                                        }//End of if
                                                        FM_LOG("[templatePreview]Image uploads successfully.");
                                                        FmMobile.analysis.trackEvent("Content", "Upload", "checkIn", 1 );	
                                                        FmMobile.myUgcPg.Type = "content";
                                                        FmMobile.showNotification("uploadUgc");
//                                                        $.mobile.hidePageLoadingMsg();
//                                                        $.mobile.changePage("my_ugc.html");
                                                  
                                                  }else{
                                                      FmMobile.showNotification("uploadFailed");
                                                      $('#clickImgEffect').show("normal");
                                                      $('#afterClickBack').show("normal");
                                                      $('#afterClickSent').show("normal");
                                                      $.mobile.hidePageLoadingMsg();
                                                  }//End of if(!err)

                            });//End of ImageUgc
                          
                      });//End of afterClickSent
                });//End of btnTest
            }else {
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
                

                $('#btnTest').click(function(){
                    $('#clickImgEffect').hide("normal");
                    $(".content-movie").unbind("click");
                    $('#afterClickBack').hide("normal");
                    $('#afterClickSent').hide("normal",function() {
                        //$('#show').attr('disabled', 'disabled');
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
                //                                    console.log("err=" + err);
                                                    if (!err) {
                                                        FM_LOG("[templatePreview]Image uploads successfully.");
                                                        FmMobile.analysis.trackEvent("Content", "Upload", "image", 1 );	
                                                        FmMobile.myUgcPg.Type = "content";
                                                        FmMobile.showNotification("uploadUgc");
//                                                        $.mobile.hidePageLoadingMsg();
//                                                        $.mobile.changePage("my_ugc.html");
                                                    }else{
                                                        FmMobile.showNotification("uploadFailed");
                                                        $('#clickImgEffect').show("normal");
                                                        $('#afterClickBack').show("normal");
                                                        $('#afterClickSent').show("normal");
                                                        $.mobile.hidePageLoadingMsg();
                                                    }//end of if(!err)
                                                
                                                });//End of imageUgc
                                    
                    });//End of #afterClickSent
                    
                });//End of #btnTest

            }
        }//End of if CheckNetwork

    },
};
