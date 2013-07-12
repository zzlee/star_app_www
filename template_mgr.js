
TemplateMgr = (function(){
	var uInstance = null;
	
	var loadTemplate = function(){
		
		async.waterfall([
			function(callback){
				$.get('template/template_list.json', function(data) {
					callback(null, JSON.parse(data));
				});
			},
			function(templateList, callback){
				console.dir(templateList);
			    callback(null, 'three');
			    },
		], function (err, result) {
			   // result now equals 'done'    
		});
	};
	
	function constructor(){
		
		loadTemplate();
		
		
		
		return{
			
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