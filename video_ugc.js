VideoUgc = (function(){
	
	function constructor(mainTemplate, subTemplate, userContent){
		
		return {
			//public services of VideoUgc
			generate: function(cb){
				
			},
			
			askServerToGenerate:function(serverUrl, cb){
				
			}
		};
	}
	
	return {
		getInstance: function(mainTemplate, subTemplate, userContent){
			return constructor(mainTemplate, subTemplate, userContent);
		}
	};
})();