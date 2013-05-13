FmMobile.bookingChooseMoviePg = {
    PAGE_ID: "bookingChooseMoviePg",
 
    init: function(){
        FmMobile.bindClickEventToNavBar();
    },
    
    show: function(){
        
        var videoWorks = ($.jStorage.get("videoWorks")) ? $.jStorage.get("videoWorks") : [];
        
        var i = 0;
        
        while(i < videoWorks.length) {
            
            if(videoWorks[i].url) {
                /*
                 source:
                 <div class="choose-movie">
                    <div class="choose-movie-pic">
                        <div class="movie-pic-dummy"></div>
                        <img class="movie-pic-img" src="images/choose_movie.png"></img>
                    </div>
                    <div class="choose-movie-number">NO.12345</div>
                </div>
                 */
                
                var booking_pid = videoWorks[i].projectId,
                    booking_no = videoWorks[i].no,
                    booking_img = 'http://img.youtube.com/vi' + videoWorks[i].url.youtube.slice(videoWorks[i].url.youtube.lastIndexOf("/")) + '/mqdefault.jpg';
                
                var choose = $('<div>').attr({ id: booking_pid, class: 'choose-movie' }).appendTo('#booking_list');
                var choose_pic = $('<div>').attr('class', 'choose-movie-pic').appendTo(choose);
                $('<div>').attr({ class: 'movie-pic-dummy' }).appendTo(choose_pic);
                $('<img>').attr({ class: 'movie-pic-img', src: booking_img }).appendTo(choose_pic);
                $('<div>').attr('class', 'choose-movie-number').html('NO.' + booking_no).appendTo(choose);
                //submit dooh
                choose.click(function(){ bookingDooh(this.id); });
            }
            
            i++;
        }
        
        var bookingDooh = function(pid){
            $.jStorage.set("dooh_pid", pid);
            FmMobile.submitDooh();
        };
        
        FmMobile.analysis.trackPage("/bookingChooseMoviePg");
        recordUserAction("enters bookingChooseMoviePg");
    },
};

