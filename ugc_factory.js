
ugcFactory = (function(){
	

    function constructor(){
        
        return {
        	//== public services ==
        	makeImageUgc: function(template, userContent, cb) {
        		
        	},
        	
        	uploadImggeUgcToServer: function() {
        		
        	},
        	
        	makeVideoUgc: function(template, userContent) {
        		
        	}

        };//end return
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
