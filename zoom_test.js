

$(document).bind("mobileinit", function(){

                 $("#indexPg").live("pageinit", image_init);
                 $("#indexPg").live("pageinit", image_event);
});

var option = {
    source: { x: 0, y: 0 },
    scale: { w: 0, h: 0 },
    destination: { x: 0, y: 0 },
    scope: { w: 0, h: 0 }
};
var canvas, context, image;

var s_now = { x: 0, y: 0, status: 0 },
    p_before = { x: 0, y: 0, v: 0, status: 0 },
    p_now = { x: 0, y: 0, v: 0 };


image_init = function(){
    
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    image = new Image();
    
    //canvas.width = screen.availWidth;
    //canvas.height = canvas.width / ustomizableObjectDimensions[fileObjectID].width * customizableObjectDimensions[fileObjectID].height;

    image.onload = function(){

        option.scope.w = canvas.width;
        option.scope.h = image.height / image.width * canvas.width;

        context.drawImage(image,
                          option.destination.x, option.destination.y,
                          option.scope.w, option.scope.h);
    };
    image.src = 'img/darth-vader.jpg';
    //image.src = 'img/iphone_splash_retina_display.png';
};

image_event = function(){

    $$('#canvas').pinching(function(e){
                           if(e.type == 'pinching') {
 
                           p_now.x = (e.currentTouch[0].x + e.currentTouch[1].x) / 2 - canvas.offsetLeft;
                           p_now.y = (e.currentTouch[0].y + e.currentTouch[1].y) / 2 - canvas.offsetTop;

                           //var delta = Math.sqrt(Math.sqrt(Math.pow(e.iniTouch[0].x - e.iniTouch[1].x, 2) +
                           //                                Math.pow(e.iniTouch[0].y - e.iniTouch[1].y, 2) -
                           //                                Math.pow(e.currentTouch[0].x - e.currentTouch[1].x, 2) +
                           //                                Math.pow(e.currentTouch[0].y - e.currentTouch[1].y, 2)));
                           p_now.v = Math.pow(e.currentTouch[0].x - e.currentTouch[1].x, 2) + Math.pow(e.currentTouch[0].y - e.currentTouch[1].y, 2);
                           
                           //zoom in/out
                           
                           var n = Math.sqrt(p_now.v / p_before.v);

                           if (p_before.status){
                           
                           
                           //zoom limit: width * n
                           if(option.scope.w > image.width * 2 && n > 1) n = 1;
                           
                           option.scope.w *= n;
                           option.scope.h *= n;
                           
                           //center point mapping
                           option.destination.x = p_before.x - n * (p_before.x - option.destination.x) + (p_now.x - p_before.x);
                           option.destination.y = p_before.y - n * (p_before.y - option.destination.y) + (p_now.y - p_before.y);
                           
                           //zoom limit: width
                           if(option.scope.w < canvas.width) {
                           option.destination.x = 0;
                           option.destination.y = 0;
                           option.scope.w = canvas.width;
                           option.scope.h = image.height / image.width * canvas.width;
                           }
                           
                           showImage();
                           };

                           p_before.x = p_now.x;
                           p_before.y = p_now.y;
                           p_before.v = p_now.v;
                           p_before.status = 1;
                                
                           }
                           //console.log(option.source.x + ', ' + option.source.y);
                           });
    
    $$('#canvas').pinch(function(e){
                           p_before.status = 0;
                           });
    
    $$('#canvas').swiping(function(e){
                          
                            //console.log('[swiping]');
                          
                              if(!isNaN(e.iniTouch.x) && (e.type == 'swiping')) {
                              
                                  if(s_now.status == 0) {
                                    s_now.x = e.iniTouch.x;
                                    s_now.y = e.iniTouch.y;
                                    s_now.status = 1;
                                  }

                                      option.destination.x += e.currentTouch.x - s_now.x;
                                      option.destination.y += e.currentTouch.y - s_now.y;
                                      
                                      showImage();
                                      
                                      s_now.x = e.currentTouch.x;
                                      s_now.y = e.currentTouch.y;
                          
                              }
                          
                          });
     $$('#canvas').swipe(function(e){
                         //console.log('[swipe]');
                         s_now.status = 0;
                         });
    
    showImage = function(){
        
        //limit
        if(option.destination.x < canvas.width - option.scope.w) option.destination.x = canvas.width - option.scope.w;
        if(option.destination.y < canvas.height - option.scope.h) option.destination.y = canvas.height - option.scope.h;
        if(option.destination.x > 0) option.destination.x = 0;
        if(option.destination.y > 0) option.destination.y = 0;
        
        //clear and draw image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, option.destination.x, option.destination.y,
                          option.scope.w, option.scope.h);
    };

};



