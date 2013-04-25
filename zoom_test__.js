

$(document).bind("mobileinit", function(){

                 $("#indexPg").live("pageinit", image_init);
                 $("#indexPg").live("pageinit", image_event);
                 //$("#indexPg").live("pageinit", image_pinch);
});

var option = {
    source: { x: 0, y: 0 },
    scale: { w: 300, h: 300 },
    destination: { x: 0, y: 0 },
    scope: { w: 320, h: 320 }
};
var canvas, context, image;
var draw_count = 0;


var center = { x: 0, y: 0 }
  , now = { x: 0, y: 0 };


image_init = function(){
    
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    image = new Image();

    image.onload = function(){
        /*
         context.drawImage(image, option.source.x, option.source.y,
         option.scale.w, option.scale.h,
         option.destination.x, option.destination.y,
         option.scope.w, option.scope.h);
         */
        context.drawImage(image, 0, 0,
                          image.width, image.height,
                          option.destination.x, option.destination.y,
                          option.scope.w, option.scope.h);
    };
    //image.src = 'img/darth-vader.jpg';
    image.src = 'img/iphone_splash_retina_display.png';
};

image_event = function(){

    
    $$('#canvas').pinching(function(e){
                           if(e.type == 'pinching') {
                           
                               center.x = (e.iniTouch[0].x + e.iniTouch[1].x) / 2 - canvas.offsetLeft;
                               center.y = (e.iniTouch[0].y + e.iniTouch[1].y) / 2 - canvas.offsetTop;
                           
                           now.x = center.x / option.scope.w;
                           now.y = center.y / option.scope.h;
                           
                           center.x = center.x / option.scope.w * option.scale.w;
                           center.y = center.y / option.scope.h * option.scale.h;
                           
                               var delta = Math.sqrt(Math.pow(e.currentTouch[0].x - e.currentTouch[1].x, 2) +
                                                     Math.pow(e.currentTouch[0].y - e.currentTouch[1].y, 2)) -
                               Math.sqrt(Math.pow(e.iniTouch[0].x - e.iniTouch[1].x, 2) +
                                         Math.pow(e.iniTouch[0].y - e.iniTouch[1].y, 2));
                               
                               var zoom = Math.pow(Math.abs(delta) / 10, delta >= 0 ? 1 : -1);
                           
                                //console.log('delta: ' + delta + ', zoom: ' + zoom);
                               
                               //zoom in/out
                           
                           if(delta >= 0){
                           option.scale.w -= 2;
                           option.scale.h -= 2;
                           }
                           else{
                           option.scale.w += 2;
                           option.scale.h += 2;
                           }
                           
                               /*
                               if((option.scope.w / option.scale.w) > 2) option.scale.w = option.scope.w / 2;
                               if((option.scope.w / option.scale.w) < 0.5) option.scale.w = option.scope.w * 2;
                               if((option.scope.h / option.scale.h) > 2) option.scale.h = option.scope.h / 2;
                               if((option.scope.h / option.scale.h) < 0.5) option.scale.h = option.scope.h * 2;
                                */
                           if((option.scope.w < option.scale.w) || (option.scope.h < option.scale.h)){
                               option.scale.w = option.scope.w - 1;
                               option.scale.h = option.scope.h - 1;
                           //console.log(option.scale.h + ', ' + option.source.y);
                           }
                           if((option.scope.w / option.scale.w) < 0.5) option.scale.w = option.scope.w * 2;
                           if((option.scope.h / option.scale.h) < 0.5) option.scale.h = option.scope.h * 2;
                           
                           //console.log(option.scale.w + ', ' + option.scale.h);
                           
                           console.log('before: ' + option.source.x + ', ' + option.source.y);
                           
                               //center point mapping
                               //option.source.x += center.x * (1 - option.scale.w / option.scope.w);
                               //option.source.y += center.y * (1 - option.scale.w / option.scope.w);
                           option.source.x = center.x - option.scale.w * now.x;
                           option.source.y = center.y - option.scale.h * now.y;
                           
                           console.log('now: ' + option.source.x + ', ' + option.source.y);
                           
                                
                               if(option.source.x < 0) option.source.x = 0;
                               if(option.source.y < 0) option.source.y = 0;
                               if((option.source.x + option.scale.w) > image.width) option.source.x = image.width - option.scale.w - 1;
                               if((option.source.y + option.scale.h) > image.height) option.source.y = image.height - option.scale.h - 1;
                           
                           console.log('next: ' + option.source.x + ', ' + option.source.y);
                                
                           
                           //console.log('0 ' + option.scale.h + ', ' + option.source.y);
                           /*
                           if((option.source.x < 0) && (option.source.y < 0)){
                           option.source.x = 0;
                           option.source.y = 0;
                           //console.log('1 ' + option.scale.h + ', ' + option.source.y);
                           }
                           else if((option.source.x <= 0) && ((option.source.y + option.scale.h) > image.height)){
                           option.source.x = 0;
                           option.source.y = image.height - option.scale.h - 1;
                           //console.log('2 ' + option.scale.h + ', ' + option.source.y);
                           }
                           else if(((option.source.x + option.scale.w) > image.width) && (option.source.y <= 0)){
                           option.source.x = image.width - option.scale.w - 1;
                           option.source.y = 0;
                           //console.log('3 ' + option.scale.h + ', ' + option.source.y);
                           }
                           else if(((option.source.x + option.scale.w + 1) > image.width) && ((option.source.y + option.scale.h + 1) > image.height)){
                           option.source.x = image.width - option.scale.w - 1;
                           option.source.y = image.height - option.scale.h - 1;
                           //console.log('4 ' + option.scale.h + ', ' + option.source.y);
                           }
                           */
                           //console.log('w: ' + image.width + ', ' + option.scale.w + ', ' + option.source.x +
                           //            '; h: ' + image.height + ', ' + option.scale.h + ', ' + option.source.y);
                           //console.log(option.source.x + ', ' + option.source.y);
                           
                               //delay
                                
                               if(draw_count != 0)
                                   draw_count += 1;
                               else {
                                   //console.log(option.source.x, option.source.y,
                                   //            option.scale.w, option.scale.h,
                                   //            option.destination.x, option.destination.y,
                                   //            option.scope.w, option.scope.h);
                               
                                   context.drawImage(image, option.source.x, option.source.y,
                                                     option.scale.w, option.scale.h,
                                                     option.destination.x, option.destination.y,
                                                     option.scope.w, option.scope.h);
                                   draw_count = 0;
                               }
                                
                           }
                           //console.log(option.source.x + ', ' + option.source.y);
                           });
    
    $$('#canvas').swiping(function(e){
                          
                          if(!isNaN(e.iniTouch.x) && (e.type == 'swiping')) {
                              //console.log(option.source.x + ', ' + option.source.y);
                              
                          //option.source.x += Math.round((e.iniTouch.x - e.currentTouch.x) / 30) > 0 ? 3 : -3;
                          //    option.source.y += Math.round((e.iniTouch.y - e.currentTouch.y) / 30) > 0 ? 3 : -3;
                          //option.source.x += (e.iniTouch.x - e.currentTouch.x) * (option.scale.w * option.scale.h) / (screen.availWidth * screen.availHeight) / 8;
                          //option.source.y += (e.iniTouch.y - e.currentTouch.y) * (option.scale.w * option.scale.h) / (screen.availWidth * screen.availHeight) / 8;
                          
                          option.destination.x = e.currentTouch.x - e.iniTouch.x;
                          option.destination.y = e.currentTouch.y - e.iniTouch.y;
                          
                          /*
                              if(option.source.x < 0) option.source.x = 0;
                              if(option.source.y < 0) option.source.y = 0;
                              if((option.source.x + option.scale.w) > image.width) option.source.x = image.width - option.scale.w - 1;
                              if((option.source.y + option.scale.h) > image.height) option.source.y = image.height - option.scale.h - 1;
                          */
                          context.clearRect();
                          context.drawImage(image, 0, 0,
                                            image.width, image.height,
                                            option.destination.x, option.destination.y,
                                            option.scope.w, option.scope.h);
                          
                          
                              //delay
                              if(draw_count != 0)
                              draw_count += 1;
                              else {
                          
                              draw_count = 0;
                              }
                          }
                          
                          });
     

};

image_pinch = function(){
    
    var source = option.source;
    
    $$('#canvas').pinchOut(function(e){
                           console.log(source.x + ', ' + source.y);
                           });
    
    $$('#canvas').pinchIn(function(e){
                            //console.log(source.x + ', ' + source.y);
                        /*
                           center.x = (e.iniTouch[0].x + e.iniTouch[1].x) / 2 - canvas.offsetLeft;
                           center.y = (e.iniTouch[0].y + e.iniTouch[1].y) / 2 - canvas.offsetTop;
                           //console.log(e.iniTouch[0].x + ', ' + e.iniTouch[0].y);
                           //console.log(e.iniTouch[1].x + ', ' + e.iniTouch[1].y);
                        console.log(center.x + ', ' + center.y);
                           var delta = Math.sqrt(Math.pow(e.currentTouch[0].x - e.currentTouch[1].x, 2) +
                                                 Math.pow(e.currentTouch[0].y - e.currentTouch[1].y, 2)) -
                                       Math.sqrt(Math.pow(e.iniTouch[0].x - e.iniTouch[1].x, 2) +
                                                 Math.pow(e.iniTouch[0].y - e.iniTouch[1].y, 2));
                           
                           var zoom = Math.pow(1 + Math.abs(delta) / 2, delta > 0 ? 1 : -1);
                           
                           //zoom in/out
                           option.scale.w *= zoom;
                           option.scale.h *= zoom;
                           
                           if((option.scope.w / option.scale.w) > 2) option.scale.w = option.scope.w / 2;
                           if((option.scope.w / option.scale.w) < 0.5) option.scale.w = option.scope.w * 2;
                           if((option.scope.h / option.scale.h) > 2) option.scale.h = option.scope.h / 2;
                           if((option.scope.h / option.scale.h) < 0.5) option.scale.h = option.scope.h * 2;
                           
                           //center point mapping
                           //option.source.x += center.x * option.scope.w / option.scale.w;
                           //option.source.y += center.y * option.scope.h / option.scale.h;
                        
                        if(option.source.x < 0) option.source.x = 0;
                        if(option.source.y < 0) option.source.y = 0;
                        if((option.source.x + option.scale.w) > image.width) option.source.x = image.width - option.scale.w - 1;
                        if((option.source.y + option.scale.h) > image.height) option.source.y = image.height - option.scale.h - 1;
                        
                        //console.log(option.source.x + ', ' + option.source.y);
                        console.log(option.source.x + ', ' + center.x * option.scope.w / option.scale.w);
                        console.log(option.source.y + ', ' + center.y * option.scope.h / option.scale.h);
                         */
                           
    });
    
    /*
    $$('#canvas').pinching(function(e){
                           
                        center.x = (e.iniTouch[0].x - e.iniTouch[1].x) / 2 - canvas.offsetLeft;
                        center.y = (e.iniTouch[0].y - e.iniTouch[1].y) / 2 - canvas.offsetTop;
                        var delta = Math.sqrt(Math.pow(e.currentTouch[0].x - e.currentTouch[1].x, 2) +
                                              Math.pow(e.currentTouch[0].y - e.currentTouch[1].y, 2)) -
                                    Math.sqrt(Math.pow(e.iniTouch[0].x - e.iniTouch[1].x, 2) +
                                              Math.pow(e.iniTouch[0].y - e.iniTouch[1].y, 2));
                           console.log('delta: ' + delta);
                        
                        var zoom = Math.pow(1 + Math.abs(delta) / 2, delta > 0 ? 1 : -1);

                        //zoom in/out
                        option.scale.w *= zoom;
                        option.scale.h *= zoom;
                           
                        if((option.scope.w / option.scale.w) > 2) option.scale.w = option.scope.w / 2;
                        if((option.scope.w / option.scale.w) < 0.5) option.scale.w = option.scope.w * 2;
                        if((option.scope.h / option.scale.h) > 2) option.scale.h = option.scope.h / 2;
                        if((option.scope.h / option.scale.h) < 0.5) option.scale.h = option.scope.h * 2;
                        
                        //center point mapping
                        option.source.x += center.x * option.scope.w / option.scale.w;
                        option.source.y += center.y * option.scope.h / option.scale.h;
                    
                           //delay
                       if(draw_count != 5)
                           draw_count += 1;
                       else {
                           
                           context.drawImage(image, option.source.x, option.source.y,
                                             option.scale.w, option.scale.h,
                                             option.destination.x, option.destination.y,
                                             option.scope.w, option.scope.h);
                           draw_count = 0;
                       }
                        
                        //console.log(e);
    });
    */

};

/*
 var now = { x: null, y: null },
 next = { x: null, y: null },
 before = { x: null, y: null },
 centor = { x: null, y: null };
 
 var canvas = document.getElementById('canvas')
 , context = canvas.getContext('2d')
 , image = new Image();
 
 var option = {
 source: { x: 0, y: 0 },
 scale: { w: 200, h: 200 },
 destination: { x: 0, y: 0 },
 scope: { w: 320, h: 320 }
 };
 alert('123');
 $$("#indexPg").live("pageinit", imageset);
 
 var draw_count = 0;
 
 $$("#canvas").swiping(function(e){
 //move vector
 option.source.x = e.iniTouch.x - e.currentTouch.x;
 option.source.y = e.iniTouch.y - e.currentTouch.y;
 //scope limitation
 if(option.source.x < 0) option.source.x = 0;
 if((option.source.x + option.scale.w) > image.width) option.source.x = image.width - option.scale.w - 1;
 if(option.source.y < 0) option.source.y = 0;
 if((option.source.y + option.scale.h) > image.height) option.source.y = image.height - option.scale.h - 1;
 //delay
 if(draw_count != 3)
 draw_count += 1;
 else {
 context.drawImage(image, option.source.x, option.source.y,
 option.scale.w, option.scale.h,
 option.destination.x, option.destination.y,
 option.scope.w, option.scope.y);
 draw_count = 0;
 }
 });
 
 imageset = function(){
 
 image.onload = function(){
 context.drawImage(image, option.source.x, option.source.y,
 option.scale.w, option.scale.h,
 option.destination.x, option.destination.y,
 option.scope.w, option.scope.y);
 };
 image.src = 'img/darth-vader.jpg';
 
 };
 */

/*
 
 
 
 photo.process = (function(){
 var uInstance;
 
 function(){
 var option = {
 source: { x: 0, y: 0 },
 scale: { w: 200, h: 200 },
 destination: { x: 0, y: 0 },
 scope: { w: 320, h: 320 }
 };
 
 var canvas = document.getElementById('canvas')
 , context = canvas.getContext('2d')
 , image = new Image();
 
 image.src = 'img/darth-vader.jpg';
 
 return {
 init: function(){
 alert('123');
 context.drawImage(image, option.source.x, option.source.y,
 option.scale.w, option.scale.h,
 option.destination.x, option.destination.y,
 option.scope.w, option.scope.h);
 },
 };
 }
 return {
 getInstance: function(){
 if(!uInstance){
 uInstance = constructor();
 }
 return uInstance;
 }
 };
 })();

 */