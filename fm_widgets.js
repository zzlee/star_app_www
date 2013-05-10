




// Singleton.
var uploadingMgr = (function(){
                     
    // Static Private members.
     var uploadingArray = [];
                    
    // Static Private methods.
   
    
    function _onComplete(event, ui){
            
        FmMobile.videoWorks[this.id] = null;
        if(this.parentNode)
            $(this).remove();
        delete uploadingArray[this.id];
    }
                    
    
    return {    // Public members.
                
        addUpload: function(pid){
            var upload = new fm_progressBar(pid);
            
            uploadingArray[pid] = upload;
            upload.on("progressbarcomplete", _onComplete);
            //upload.start(); for TESTing
                
            return upload;
        },
                    
        removeUpload: function(pid, error){
            var upload = uploadingArray[pid];
            if(upload.parentNode)
                $(upload).remove();
            delete uploadingArray[pid];
        },
                
        show: function(container, pid){
            uploadingArray[pid].prependTo(container);
        },
        
        showAll: function(container){
            for(var pid in uploadingArray){
                uploadingArray[pid].prependTo(container);
            }
        },
    };
                    
})();



function fm_progressBar(pid){
    
    this.id = pid;
    //this.bar = $("#uploading").progressbar({ value: 0, max: 100 });
    this.bar = $("<div>").attr("id", pid).progressbar({ value: 0, max: 100 });
    //$("#contentArea", $("#myVideoPg")).prepend(this.bar);

}

fm_progressBar.prototype.setValue = function(value){
    this.bar.progressbar("option", "value", value);
};

fm_progressBar.prototype.on = function(event, cb){
    this.bar.on(event, cb);
};

fm_progressBar.prototype.prependTo = function(container){
    if(this.bar.parentNode)
        $(this.bar).remove();
    container.prepend(this.bar);
}

/*
fm_progressBar.prototype.onComplete = function(event, object){
    clearInterval(this.timer);
    $(this).remove();
};*/

fm_progressBar.prototype.progress = function(){
    var percentage = this.bar.progressbar("option", "value");
    if(++percentage != 101)
        this.bar.progressbar("option", "value", percentage);
};

// for TESTing
fm_progressBar.prototype.start = function(){
    var self = this;
    this.timer = setInterval(function(){ self.progress(); }, 100);
};

fm_progressBar.prototype.getValue = function(){
    return this.bar.progressbar("option", "value");
};



function trashtalk(){
    var videoListWgt = $("#videoList");
    var trash = {"trash": "talk", "projectId": "trashtalk"};
    //var widget = new videoWgt(videoListWgt, trash);
    //widget.setComments({"comments": {"count": "0"} });
    var widget = $("<div>").attr("id", "trashtalk").appendTo(videoListWgt);
    var noise = $("<div>").attr("class", "fm_trashtalk").appendTo(widget);
    var span = $("<span>").attr("class", "fm_txt_noise").html("休士頓...信號斷了嗎？<br>您什麼影片都沒做啊！").appendTo(widget);
    var makeBtn = $("<a>").attr({
            href: "#",
            class: "fm_yellowBtn_make_s",
            onclick: "$.mobile.changePage('movie_create.html');"
        }).attr("data-role", "button").html("立即製作影片").appendTo(widget);
}

trashtalk.prototype.remove = function(){
    $("#trashtalk").remove()
    //delete this.widget;
};


function videoGridAdapter(parent, data){
    var count = data.length;
    var videoGridWgt = $("<div>").attr("class", "ui-grid-a").appendTo(parent);
    
    for(var i=0; i < count; i++){
        var thumbnail = $("<div>");
        if(0 == i%2){
            thumbnail.attr("class", "ui-block-a").appendTo(videoGridWgt);
        }else{
            thumbnail.attr("class", "ui-block-b").appendTo(videoGridWgt);
        }
        var link = $("<a>").attr( "href", "video.html?idx=" + i).appendTo(thumbnail);
        var src = "thumbnail.jpg";
        var img = $("<img>").attr("src", src).appendTo(link);
        
    }
}

var videoListAdapter = (function(){
    
    //var videoListWgt = $("<ul>").attr("data-role", "listview").attr({id: "videoList", class: "fm_videoList"});
    var videoListWgt = null;
    var count = 0;
    var videoItems = null;
    var dummyItems = null;
                        
    var bindClickEventToThumbnail = function(){
        console.log('[click on video list: ]'+this);
        
        var callPlayer = function (frame_id, func, args) {
            if (window.jQuery && frame_id instanceof jQuery){
                frame_id = frame_id.get(0).id;
            }
            var iframe = document.getElementById(frame_id);
            if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
                iframe = iframe.getElementsByTagName('iframe')[0];
            }
            if (iframe) {
                // Frame exists,
                iframe.contentWindow.postMessage(JSON.stringify({
                                                                "event": "command",
                                                                "func": func,
                                                                "args": args || [],
                                                                "id": frame_id
                                                                }), "*");
            }
        };
        var divID = this.parentElement.id;
        var tempUrlArray = this.src.split('/');
        var ytVideoID = tempUrlArray[tempUrlArray.length-2];
        var videoFrame = $("<iframe>").attr({
                                            id: ytVideoID,
                                            src: "http://www.youtube.com/embed/" +ytVideoID + "?rel=0&showinfo=0&modestbranding=1&controls=0&autoplay=1",
                                            class: "fm_movievideo",
                                            frameborder: "0"
                                            }).load(function(){
                                                    //TODO: find a better way to have callPlayer() called after videoFrame is prepended
                                                    setTimeout(function(){
                                                               callPlayer(ytVideoID,'playVideo');
                                                               }, 1500);
                                                    });
        
        $('#'+divID).prepend(videoFrame);
        $('#'+this.id).remove();
    };

    
    return {
        
        init: function(parent, data, dummy){
            videoListWgt = $("#my-video-list");
            videoListWgt.html("");
                        
            if(videoItems)
                delete videoItems;
            if(dummyItems)
                delete dummyItems;
                        
            videoItems = {};
            dummyItems = {};
                        
            if($("#trashtalk")){
                $("#trashtalk").remove();
                delete FmMobile.trashItem;
                FmMobile.trashItem = null;
            }
            
                        
            for(var pid in dummy){
                var d_item = new videoWgt(videoListWgt, {"projectId":pid}, false);
                dummyItems[pid] = d_item;
                d_item.setComments({"comments": {"count": "0"} });
            }
                        
            for(var i=0; i < data.length; i++){
                
                
                var url = domain + "/fb/comment";
                var query = {
                    "accessToken": localStorage.fb_accessToken,
                    "fb_id": fb_id
                };
                var v_item = new videoWgt(videoListWgt, data[i], true);
                //v_item.setComments({"comments": {"count": "0"} }, data[i].no);
                
                if(!data[i].fb_id)
                    continue;
                else
                    var fb_id = data[i].fb_id;
                        
                if(fb_id){
                    videoItems[fb_id] = v_item;
                    $.get(url, query, function(result){
                          
                          FM_LOG("[Comments]" + result.id + ":\n" + JSON.stringify(result));
                          if(videoItems[result.id]){
                              videoItems[result.id].setComments(result);
                              $.jStorage.set(result.id, result);
                          }
                    });
                }
            }
                        
            //listen to click event
            /*
            $("div [class='fm_bar']").click(function(){
                $(this.parentElement.parentElement.children[1]).toggle();
            });
             */
            $('#videoList>div>img').click(function(){
                console.log('[click on video list: ]'+this);
                
                var callPlayer = function (frame_id, func, args) {
                    if (window.jQuery && frame_id instanceof jQuery){
                        frame_id = frame_id.get(0).id;
                    }
                    var iframe = document.getElementById(frame_id);
                    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
                        iframe = iframe.getElementsByTagName('iframe')[0];
                    }
                    if (iframe) {
                        // Frame exists, 
                        iframe.contentWindow.postMessage(JSON.stringify({
                        "event": "command",
                        "func": func,
                        "args": args || [],
                        "id": frame_id
                        }), "*");
                    }
                };
                var divID = this.parentElement.id;
                var tempUrlArray = this.src.split('/');
                var ytVideoID = tempUrlArray[tempUrlArray.length-2];
                var videoFrame = $("<iframe>").attr({
                    id: ytVideoID,
                    src: "http://www.youtube.com/embed/" +ytVideoID + "?rel=0&showinfo=0&modestbranding=1&controls=0&autoplay=1",
                    class: "content-movie-img",
                    frameborder: "0"
                }).load(function(){
                    //TODO: find a better way to have callPlayer() called after videoFrame is prepended
                    setTimeout(function(){
                        callPlayer(ytVideoID,'playVideo');
                    }, 1500);
                });
                                          
                $('#'+divID).prepend(videoFrame);
                $('#'+this.id).remove();
            });

        },
                        
        freshCommentbar: function(){
            if(!$.isEmptyObject(videoItems)){
                for(var fb_id in videoItems){
                    videoItems[fb_id].setComments({"comments": {"count": "0"} });
                }
            }
            
            if(!$.isEmptyObject(dummyItems)){
                for(var pid in dummyItems){
                    dummyItems[pid].setComments({"comments": {"count": "0"} });
                }
            }
        },
        
        updateDummy: function(pid, videoWork){
            
            var temp=null;
            if(dummyItems && dummyItems[pid]){
                temp = dummyItems[pid];
                dummyItems[pid].setSrc(videoWork.url.youtube);
                
                var url = domain + "/fb/comment";
                var query = {
                    "accessToken": localStorage.fb_accessToken,
                    "fb_id": fb_id,
                    "projectId": pid
                };
                
                /*
                if(!videoWork.fb_id){
                    temp.setComments({"comments": {"count": "0"} }, videoWork.no);
                    return;
                }
                 */
                
                var fb_id = videoWork.fb_id;
                
                if(fb_id){
                    
                    $.get(url, query, function(result){
                          
                          FM_LOG("[Comments]" + result.id + ":\n" + JSON.stringify(result));
                          if(result.id){
                              temp.setComments(result, videoWork.no);
                              $.jStorage.set(result.id, result);
                          }
                    });
                }
            }
        },
        
        // Workaround for commentbar display correctly.
        setDummyComment: function(pid){
            dummyItems[pid].setComments({"comments": {"count": "0"} });
        },
          
    };
})();


function _videoListAdapter(parent, data){
    var count = data.length;
    var videoListWgt = $("#videoList");
    var videoItems = [];
    
    for(var i=0; i < count; i++){
        if(!data[i].fb_id)
            continue;
        else
            var fb_id = data[i].fb_id;
        
        var url = domain + "/fb/comment";
        var query = {
            "accessToken": localStorage.fb_accessToken,
            "fb_id": fb_id
        };
        
        videoItems[fb_id] = new videoWgt(videoListWgt, data[i], i);
        
        $.get(url, query, function(result){
            
            FM_LOG("[Comments]" + result.id + ":\n" + JSON.stringify(result));
			if(result.id){
				videoItems[result.id].setComments(result);
				$.jStorage.set(result.id, data);
			}
        });
    }
}


function videoWgt(parent, data, append){
    var widget;
    
    /*
    if(parent.attr("data-role") === 'listview'){
        widget = $("<li>").attr({id: data.projectId, class: "fm_videoItem"});
    }else{
        widget = $("<div>").attr({id: data.projectId, class: "fm_videoItem"});
    }
    */
    widget = $("<div>").attr({id: data.projectId, class: "content-movie"});
    
    var numberDiv = $("<div>").attr({class: "my-video-number"});
    var dummyDiv = $("<div>").attr({class: "movie-pic-dummy"});
    dummyDiv.appendTo(widget);
    
    if(data.url){
        /*
        this.videoFrame = $("<iframe>").attr({
            src: data.url.youtube + "?rel=0&showinfo=0&modestbranding=1&controls=0",
            class: "fm_movievideo",
            frameborder: "0"
        });
         */
        
        var ytVideoID = (data.url.youtube).split('/').pop();
        
        this.videoThumbnail = $("<img>").attr({
                                              id: 'img_'+ytVideoID,
                                              src: "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg",
                                              class: "content-movie-img"
                                             });
        
        numberDiv.html("NO."+data.no);
                
        
    }else if(data.trash){
        this.videoThumbnail = $("<div>").attr({
            class: "fm_trashtalk"
        });
        
    }else{
        this.videoThumbnail = $("<img>").attr({
            class: "content-movie-img",
            src:"images/waiting.png"
        });
    }
            
    
    //widget.html(this.videoThumbnail);
    this.videoThumbnail.appendTo(widget);
    
    
    //this.commentWgt = new commentListWgt(widget);
    
    if(append){
        widget.appendTo(parent); // Top First.
        if(data.url){
            numberDiv.appendTo(parent);
        }
    }
    else{
        if(data.url){
            numberDiv.prepend(parent);
        }
        parent.prepend(widget);  // Top Last.
    }
}

videoWgt.prototype.setSrc = function(src){
    //this.videoFrame.attr("src", src+"?rel=0&showinfo=0&modestbranding=1&controls=0").attr("class", "fm_video");
    var ytVideoID = (src).split('/').pop();
    this.videoThumbnail.attr("src", "http://img.youtube.com/vi/"+ytVideoID+"/mqdefault.jpg").attr("class", "content-movie-img").attr("id", "dummy_"+ytVideoID);
}

videoWgt.prototype.setComments = function(data, sequence_num){

    /*var like_count = (data.likes) ? data.likes.count : 0,
        comment_count = (data.comments.count) ? data.comments.count : 0;*/
    
    //this.like.html(like_count);
    //this.comment.html(comment_count);
    
    if(data.comments && this.commentWgt)
		this.commentWgt.setData(data, sequence_num);
};


function commentListWgt(parent, fb_id){

    /*
    this.collapseWgt = $("<div>").attr("data-role", "collapsible")
		.attr("data-iconpos", "right")
		.attr("data-theme", "a")
		.attr("data-collapsed-icon", "arrow-d")
		.attr("data-expanded-icon", "arrow-u")
		.attr("class", "fm_collapsible");
    */
    this.collapseWgt = $("<div>").attr("class", "fm_collapsible"); //GZ
    
    //this.header = $("<h2>").attr("class", "fm_comment_header").html("").appendTo(this.collapseWgt);
    this.header = $("<div>").attr("class", "fm_moviedb").html("").appendTo(this.collapseWgt); //GZ
    this.header.height( window.innerWidth/1.77778/9 ); //GZ  //TODO:: have a cleanner way to set height (such as manipulating CSS
    
    //this.listWgt = $("<ul>").attr("data-role", "listview").appendTo(this.collapseWgt);
    this.listWgt = $("<div>").attr("id", "div_comment_list").appendTo(this.collapseWgt); //GZ
    this.collapseWgt.appendTo(parent);
    
    
    //GZ
    this.header.html("");
    this.div_likenb = $("<div>").attr("class", "fm_likenb").appendTo(this.header);
    this.div_like = $("<div>").attr("class", "fm_like").appendTo(this.header);
    this.div_commentnb = $("<div>").attr("class", "fm_commentnb").appendTo(this.header);
    this.div_comment = $("<div>").attr("class", "fm_comment").appendTo(this.header);
    //var div_booking = $("<div>").attr("class", "fm_booking").html("預約戶外螢幕").appendTo(this.header);
    this.div_bar = $("<div>").attr("class", "fm_bar").html("").appendTo(this.header);
    this.div_video_id = $("<div>").attr("class", "fm_videonumber").appendTo(this.header);
    this.div_booking_btn = $("<div>").attr("class", "fm_screenbtn").appendTo(this.header);
    if($(".ui-btn-active", $("div:jqmData(role='navbar')")).attr("id") == "miix-link"){
        this.div_booking_btn.html('<img src="./images/screen.png" style="width:100%"></img>');
        this.div_booking_btn.click(FmMobile.dooh);
    }
    
    this.header.append('<br>');
    
}


commentListWgt.prototype.setData = function(result, sequence_num){
    
    //$('li', this.listWgt).remove();
    this.listWgt.html("");
    
    var like_count = (result.likes) ? result.likes.count : 0,
        commentcount = (result.comments.count) ? result.comments.count : 0;
    
    
    /*
    var commentIcon = '<img src="./images/icon/comment.png" class="fm_icon"></img>';//$("<img>").attr( {src: "./images/icon/comment.png", class: "fm_icon"});
    var likeIcon = '<img src="./images/icon/like.png" class="fm_icon"></img>';//$("<img>").attr({src: "./images/icon/like.png", class: "fm_icon"});
	var comment_count = $('span.ui-btn-text', this.header).html(commentcount + commentIcon +" "+like_count + likeIcon);
     
    var style_class = $('a.ui-collapsible-heading-toggle', this.header).attr("class") + " fm_collapsible_heading_toggle";
    $('a.ui-collapsible-heading-toggle', this.header).attr("class", style_class);
    */
    
    //GZ
    /*this.header.html("");
    var div_likenb = $("<div>").attr("class", "fm_likenb").appendTo(this.header);
    var div_like = $("<div>").attr("class", "fm_like").appendTo(this.header);
    var div_commentnb = $("<div>").attr("class", "fm_commentnb").appendTo(this.header);
    var div_comment = $("<div>").attr("class", "fm_comment").appendTo(this.header);
    //var div_booking = $("<div>").attr("class", "fm_booking").html("預約戶外螢幕").appendTo(this.header);
    var div_bar = $("<div>").attr("class", "fm_bar").html("").appendTo(this.header);
    var div_video_id = $("<div>").attr("class", "fm_videonumber").appendTo(this.header);
    var div_booking_btn = $("<div>").attr("class", "fm_screenbtn").appendTo(this.header);
    */
    if(sequence_num)
        this.div_video_id.html("No."+sequence_num);
    
    this.header.append('<br>');
    
    this.div_likenb.html( like_count.toString() );
    this.div_like.html('<img src="./images/icon/like.png" style="width:100%"></img>');
    this.div_commentnb.html( commentcount.toString() );
    this.div_comment.html('<img src="./images/icon/comment.png" style="width:100%"></img>');
    this.div_bar.html('<img src="./images/icon/expand_arrow.png" style="width:100%"></img>');
    this.listWgt.hide();    
    
    
    if(result.comments.data){
        var data = result.comments.data;
        var thumbnails = [];
        for(var i=0; i < data.length; i++){
            //var itemWgt = $("<li>").attr("class", "fm_listItem").appendTo(this.listWgt);
            var itemWgt = $("<div>").attr("class", "fm_fbcomment").appendTo(this.listWgt); //GZ
            
            //GZ
            var div_fbprofile = $("<div>").attr("class", "fm_fbprofile").appendTo(itemWgt);
            var div_arrow = $("<div>").attr("class", "fm_arrow").appendTo(itemWgt);
            
            //var thumbnail = $("<img>").attr("class", "fm_thumbnail").appendTo(itemWgt);
            var thumbnail = $("<img>").attr("style", "width:100%").appendTo(div_fbprofile); //GZ
            thumbnails[data[i].id] = thumbnail;
            /*
            if( (i+1)%2 )
                var commentContent = $("<div>").attr("class", "fm_comment1").appendTo(itemWgt);
            else
                var commentContent = $("<div>").attr("class", "fm_comment2").appendTo(itemWgt);
            */
            var commentContent = $("<div>").attr("class", "fm_fbwords").appendTo(itemWgt);
            
            var name = data[i].from.name;
            //var who = $("<span>").attr("class", "fm_txt").html(name).appendTo(commentContent);
            var who = $("<div>").attr("class", "fm_fbname").html(name).appendTo(commentContent);//GZ
            
            var arr = data[i].created_time.split(/[- T:]/);
            var date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]);
            var hour = (date.getHours()+8 < 24) ? date.getHours()+8 : date.getHours()+8-24;
            var min = (date.getMinutes()>9) ? date.getMinutes() : "0"+date.getMinutes();
            //var timeWgt = $("<span>").attr("class", "fm_txt_time").html(hour + ":" + min).appendTo(commentContent);
            var timeWgt = $("<div>").attr("class", "fm_fbtime").html(hour + ":" + min).appendTo(commentContent); //GZ
            var comment = data[i].message;        
            //var commentTxt = $("<p>").attr("class", "fm_txt").html(comment).appendTo(commentContent);
            var commentTxt = $("<div>").attr("class", "fm_fbw2").html(comment).appendTo(commentContent); //GZ
            
            var url = domain + "/fb/thumbnail";
            var query = {
                "accessToken": localStorage.fb_accessToken,
                "fb_id": data[i].id,
                "commenter": data[i].from.id
            };
            
            $.get(url, query, function(result){
                FM_LOG("[Thumbnail] " + result.id +"\n"+JSON.stringify(result));
                thumbnails[result.id].attr("src", result.picture.data.url);
            });
        }
    }
};
