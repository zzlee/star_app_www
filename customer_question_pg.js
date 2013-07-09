FmMobile.customerQuestionPg = {
    PAGE_ID: "customerQuestionPg",
        
    show: function(){
        FmMobile.analysis.trackPage("/customerQuestionPg");
        recordUserAction("enters customerQuestionPg");
    },
        
    init: function(){
       // alert("test");
        
        
        /*
        $.ajax({
               url:'http://192.168.5.129:80'
        }
        );
         */
        
        $.get("http://192.168.5.129/members/123415/questions",{token:"53768608"},function(data,status){
              alert(status);
            alert(data[0]._id);
              
              
              for(var i=0;i<data.length;i++){
                  $("#start_").append("<div class='question'>id:" 
                                      
                                     +data[i]._id+"<br>"+
                                      data[i].ugcReferenceNo+"<br>"+"genre :"+
                                      data[i].genre+"<br>"+"Q :"+
                                      data[i].question.description+"<br>"+"<div class='time'>"+
                                      data[i].question.date+"</div>"+"<br></div><div class='answer'>"+"Ans :"+
                                      data[i].answer.description+"<br>"+"<div class='time'>"+
                                      data[i].answer.date+"</div>"+"<br></div>"+
                                      "<hr>");
              
              }
              
              //var inappend="<div class='question'>tttt<div class='time'>20130911 14:30</div></div>";
        //$("#start_").append(inappend);
              });
        
        
                
    }
    
};
