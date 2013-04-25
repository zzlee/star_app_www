var FmMobile = window.FmMobile || {};

var DEBUG = true,
FM_LOG = (DEBUG) ? function(str){ console.log("\n[FM] "+str); } : function(str){} ;


var local = false,
localhost = "http://localhost:3000",
remotesite = starServerURL, //"http://192.168.5.188", //"http://www.feltmeng.idv.tw",
domain = (local) ?  localhost : remotesite;



FmMobile.authentication = {
    
    init: function(){
        
        if(localStorage.verified == 'true'){
            $.mobile.changePage("my_video.html");
            
        }else{
            this.verification();
        }
        
    },
    
    
    verification: function(){
        $.mobile.changePage("verification.html");
    },
    
    
    getCode: function(){
        // TODO - $.get('codeGeneration', data, function(res){});
        var phoneNum = $("#phoneNum_input").attr("value");
        var phoneNum_int = parseInt(phoneNum);
        
        if(isNaN(phoneNum_int) || phoneNum_int < 900000000 || phoneNum_int > 999999999){
            $("#phoneNum_input").attr("value", "09XXXXXXXX");
            return;
        }
           
        var url = remotesite + "/members/authentication_code",
            data = {
                phoneNum: phoneNum,
                fb_userID: localStorage.fb_userID,
                userID: localStorage._id
            };
        
        $.get(url, data, function(res){
              
              if(res.message){
                  navigator.notification.alert(res.message);
                  $.mobile.changePage("codeInput.html");
              
              }else{
                navigator.notification.alert(res.error);
              }
        });
    },
    
    sendCode: function(){
        // TODO - $.post('codeVerification', data, function(res){});
        var code = $("#code_input").attr("value");
        var code_int = parseInt(code);
        
        if(isNaN(code_int) || code_int > 9999){
            $("#code_input").attr("value", "");
            return;
        }
        
        var url = remotesite + "/api/codeVerification",
            data = {
                code: code,
                userID: localStorage._id,
                fb_userID: localStorage.fb_userID
            };
        
        $.post(url, data, function(res){
           if(res.message){
               navigator.notification.alert(res.message, FmMobile.submitDooh, "認證");
               localStorage.verified = true;
               $.mobile.changePage("my_video.html");
               
           }else{
               navigator.notification.alert(res.error);
           }
        });
    },
};