


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



function videoListAdapter(parent, data){
    var count = data.length;
    var videoListWgt = $("#videoList");
    var videoItems = [];
    
    //GZ
    var maxAllowableVideoNumber = 10;
    var actualNumberOfVideosToShow;
    var ii;
    
    if ( count>maxAllowableVideoNumber) {
        actualNumberOfVideosToShow = maxAllowableVideoNumber;
    }
    else {
        actualNumberOfVideosToShow = count;
    }
    
    //for(var i=0; i < count; i++){
    for(var i=0; i < actualNumberOfVideosToShow; i++){
        
        ii = count - i -1;
        
        var fb_id = data[ii].fb_id;
        var url = domain + "/api/fbGetComment";
        var query = {
            "accessToken": localStorage.fb_accessToken,
            "fb_id": fb_id
        };
        
        videoItems[fb_id] = new videoWgt(videoListWgt, data[ii], i);
        
        $.get(url, query, function(result){
            
            FM_LOG("[Comments]" + result.id + ":\n" + JSON.stringify(result));
			if(result.id){
				videoItems[result.id].setComments(result);
				$.jStorage.set(result.id, data);
			}
        });
    }
}


function videoWgt(parent, data, idx){
    var videoWgt;
    
    if(parent.attr("data-role") === 'listview'){
        videoWgt = $("<li>").attr({id: "video_"+idx, class: "fm_videoItem"});
    }else{
        videoWgt = $("<div>").attr({id: "video_"+idx, class: "fm_videoItem"});
    }
    var video = $("<iframe>").attr({
        src: data.url.youtube + "?rel=0&showinfo=0&modestbranding=1&controls=0",
        //width: (screen.width > 1280)? 1280: screen.width,
        //height: (screen.width > 1280)? 720: screen.width/4*3,
        class: "fm_video",
        frameborder: "0"
        
                            
    }).appendTo(videoWgt);
    
    //var bar = $("<div>").attr("class", "fm_bar").appendTo(videoWgt);
    //this.like = $("<span>").attr("class", "fm_like_num").appendTo(bar);
    //this.comment = $("<span>").attr("class", "fm_comment_num").appendTo(bar);
    
    
    this.commentWgt = new commentListWgt(videoWgt);
    videoWgt.appendTo(parent);
}

videoWgt.prototype.setComments = function(data){

    /*var like_count = (data.likes) ? data.likes.count : 0,
        comment_count = (data.comments.count) ? data.comments.count : 0;*/
    
    //this.like.html(like_count);
    //this.comment.html(comment_count);
    
    if(data.comments)
		this.commentWgt.setData(data);
};


function commentListWgt(parent, fb_id){

    this.collapseWgt = $("<div>").attr("data-role", "collapsible")
		.attr("data-iconpos", "right")
		.attr("data-theme", "a")
		.attr("data-collapsed-icon", "arrow-d")
		.attr("data-expanded-icon", "arrow-u")
		.attr("class", "fm_collapsible");
    this.header = $("<h2>").attr("class", "fm_comment_header").html("").appendTo(this.collapseWgt);
    this.listWgt = $("<ul>").attr("data-role", "listview").appendTo(this.collapseWgt);
    this.collapseWgt.appendTo(parent);
    
}


commentListWgt.prototype.setData = function(result){
    
    var like_count = (result.likes) ? result.likes.count : 0,
        commentcount = (result.comments.count) ? result.comments.count : 0;
    
    
    var commentIcon = '<img src="./images/icon/comment.png" class="fm_icon"></img>';//$("<img>").attr( {src: "./images/icon/comment.png", class: "fm_icon"});
    var likeIcon = '<img src="./images/icon/like.png" class="fm_icon"></img>';//$("<img>").attr({src: "./images/icon/like.png", class: "fm_icon"});
	var comment_count = $('span.ui-btn-text', this.header).html(commentcount + commentIcon +" "+like_count + likeIcon);
    var style_class = $('a.ui-collapsible-heading-toggle', this.header).attr("class") + " fm_collapsible_heading_toggle";
    $('a.ui-collapsible-heading-toggle', this.header).attr("class", style_class);
    
    
    if(result.comments.data){
        var data = result.comments.data;
        var thumbnails = [];
        for(var i=0; i < data.length; i++){
            var itemWgt = $("<li>").attr("class", "fm_listItem").appendTo(this.listWgt);
            //var commentWgt = $("<div>").appendTo(itemWgt);
            var thumbnail = $("<img>").attr("class", "fm_thumbnail").appendTo(itemWgt);
            thumbnails[data[i].id] = thumbnail;
            if( (i+1)%2 )
                var commentContent = $("<div>").attr("class", "fm_comment1").appendTo(itemWgt);
            else
                var commentContent = $("<div>").attr("class", "fm_comment2").appendTo(itemWgt);
            var name = data[i].from.name;
            var who = $("<span>").attr("class", "fm_txt").html(name).appendTo(commentContent);
            var arr = data[i].created_time.split(/[- T:]/);
            var date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]);
            var hour = date.getHours();
            var min = (date.getMinutes()>9) ? date.getMinutes() : "0"+date.getMinutes();
            var timeWgt = $("<span>").attr("class", "fm_txt_time").html(hour + ":" + min).appendTo(commentContent);
            var comment = data[i].message;        
            var commentTxt = $("<p>").attr("class", "fm_txt").html(comment).appendTo(commentContent);
            
            var url = domain + "/api/fbGetThumbnail";
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
