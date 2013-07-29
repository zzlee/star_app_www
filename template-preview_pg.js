FmMobile.template_previewPg = {
PAGE_ID: "template_previewPg",
    
show: function(){
    FmMobile.analysis.trackPage("/template_previewPg");
    recordUserAction("enters template_previewPg");
},
    
init: function(){
    $("#nav-bar").show();
    
    if(FmMobile.selectedTemplate=='miix_it'){
                
        var videoUgc;
        VideoUgc.getInstance('miix_it', 'miix_one_image', function(err, _videoUgc){
            if (!err){
                videoUgc = _videoUgc;
            }
        });
        
        $('#btnTest').click(function(){
            alert("已傳送,請等待頁面跳轉");
            var mainTemplate = FmMobile.selectedTemplate;
            var ownerId = localStorage._id; //Gance's
            var ownerFbUserId = localStorage.fb_userID; //Gance's
            var ugcInfo = {
                ownerId:{_id:ownerId, fbUserId:ownerFbUserId },
                title: "My Miix move!!"
            };
            
            videoUgc.askServerToGenerate(FmMobile.userContent, ugcInfo, function(err){
                console.log("err="+err);
                if(!err){
                    alert("success!");
                                         }else{
                                         alert(err);
                                         }

                $.mobile.changePage("my_ugc.html");
            });
        });
         

        
    }else if(FmMobile.selectedTemplate=='check_in'){
        var imageUgc;
        ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent,function(err, _imageUgc){
                             console.log(err);
                             if (!err){
                             imageUgc = _imageUgc;
                             console.log(err);
                             $("#show").attr("src", imageUgc.getImageUrl() );
                             console.log(err);
                             
                             }else{
                             console.log(err);
                             }
                             });
        
        
        
        $('#btnTest').click(function(){
                            
 
                            alert("請等待頁面跳轉");
                           
                            var mainTemplate = FmMobile.selectedTemplate;
                            var ownerId = localStorage._id; //Gance's
                            var ownerFbUserId = localStorage.fb_userID; //Gance's
                            var ugcProjectId = mainTemplate +'-'+ ownerId +'-'+ (new Date()).toISOString().replace(/[-:.]/g, "");
                            var ugcInfo = {
                            ownerId:{_id:ownerId, fbUserId:ownerFbUserId },
                            contentGenre: mainTemplate,
                            title: "today's mood"
                            };
                            
                            imageUgc.uploadToServer(ugcProjectId, ugcInfo, function(err){
                                                    console.log("err="+err);
                                                    // FmMobile.authPopup.postMessage("打卡～～～");
                                                    if(!err){
                                                    
                                        var url = starServerURL + "/miix/members/" + localStorage._id + "/ugcs";
                                                    $.ajax({
                                                           url: url,
                                                           dataType: 'json',
                                                           success: function(response){
                                                           if(response){
                                                           console.log(response[0].url.s3);
                                                           FmMobile.check_in_pic=response[0].url.s3;
                                                           FmMobile.authPopup.postFbMessage();
                                                           }else{
                                                           console.log("[error] : " + response.error);
                                                           }
                                                           }
                                                           });
                                                    alert("success!");
                                                   // FmMobile.authPopup.postMessage("打卡～～～");


                                                    }else{
                                                    alert(err);
                                                    }

                                
                                                    
                                                    $.mobile.changePage("my_ugc.html");
                                                    });
                            
                            });

    }
    else{
    var imageUgc;
    ImageUgc.getInstance(FmMobile.selectedTemplate, FmMobile.selectedSubTemplate, FmMobile.userContent,function(err, _imageUgc){
                         console.log(err);
                         if (!err){
                         imageUgc = _imageUgc;
                         console.log(err);
                             $("#show").attr("src", imageUgc.getImageUrl() );
                         console.log(err);

                         }else{
                         console.log(err);
                         }
                         });

    
    
    $('#btnTest').click(function(){
                        
                        alert("請等待頁面跳轉");
                            var mainTemplate = FmMobile.selectedTemplate;
                            var ownerId = localStorage._id; //Gance's
                            var ownerFbUserId = localStorage.fb_userID; //Gance's
                            var ugcProjectId = mainTemplate +'-'+ ownerId +'-'+ (new Date()).toISOString().replace(/[-:.]/g, "");
                            var ugcInfo = {
                                ownerId:{_id:ownerId, fbUserId:ownerFbUserId },
                                contentGenre: mainTemplate,
                                title: "today's mood"
                            };
                        
                        imageUgc.uploadToServer(ugcProjectId, ugcInfo, function(err){
                                                console.log("err="+err);
                                           if(!err){
                                                alert("success!");
                                            }else{
                                                alert(err);
                                                }
                                   $.mobile.changePage("my_ugc.html");
                            });
                        
                        });

    }
        
 },
};
