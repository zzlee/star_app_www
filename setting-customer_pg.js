FmMobile.customerQuestionPg = {
    PAGE_ID: "customerQuestionPg",
        
    show: function(){
        FmMobile.analysis.trackPage("/customerQuestionPg");
        recordUserAction("enters customerQuestionPg");
    },
        
    init: function(){
       var memberId = "123345";
        
        // post customer question
        
        $("#customer_button").click(function(){
                    var input_id=$("#input_id").val(); // input_id (影片代碼）
                    var question_text=$("#question_text").val(); //question_text 問題敘述
                    var select=$("#select option:selected").val(); //問題種類                                     
                                    
            $.ajax({
               type: "POST",
               url: starServerURL+"/members/"+memberId+"/questions",
               data: {"it":input_id,
                      "qt":question_text,
                      "select":select
                    }
               }).done(function( result ) {
                       alert(result);
                   });
              });

        //get answer
        //TODO: get token from other place
        //
        
        $.get(starServerURL+"/members/"+memberId+"/questions",{token:"53768608"},function(data,status){
              alert(status);
           
              $("#userQuesiotns").html('');
              
              for(var i=0;i<data.length;i++){
              
                          var _d= new Date(Number(data[i].question.date));
                          var _y=_d.getFullYear();
                          var _m=_d.getMonth()+1;
                          var dayOfmonth=_d.getDate();
                          var hour=_d.getHours();
                          var minute=_d.getMinutes();
                          var timeOutput_q=_y+"年"+_m+"月"+dayOfmonth+"號"+" "+hour+":"+minute;
                          
                          var a_d= new Date(Number(data[i].answer.date));
                          var a_y=a_d.getFullYear();
                          var a_m=a_d.getMonth()+1;
                          var a_dayOfmonth=a_d.getDate();
                          var a_hour=a_d.getHours();
                          var a_minute=a_d.getMinutes();
                          var a_timeOutput=a_y+"年"+a_m+"月"+a_dayOfmonth+"號"+" "+a_hour+":"+a_minute;
              
                  $("#userQuesiotns").append("<div class='question'>Question : "+
                                      data[i].question.description+"<br>"+"<div class='time'>"+
                                      timeOutput_q+"</div>"+"<br></div><div class='answer'>"+"Ans : "+
                                      data[i].answer.description+"<br>"+"<div class='time'>"+
                                      a_timeOutput+"</div>"+"<br></div>"+
                                      "<hr>");
                }
            });
        }
    };
