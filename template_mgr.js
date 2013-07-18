
TemplateMgr = (function(){
	var uInstance = null;
	var templates = {};
	
	var loadTemplate = function(loaded_cb){
		var templateList = null;
		async.series([
			function(cb1_series){
				var settings = {
						type: "GET",
						dataType: "json",
						success: function(data, textStatus, jqXHR ){
							//console.dir(data);
							templateList = data;
							cb1_series(null);
						},
						error: function(jqXHR, textStatus, errorThrown){
							cb1_series(errorThrown);
						}						
				};
				$.ajax('template/template_list.json',settings);
			},
			function(cb2_series){
				
				var iterator = function(aTemplate, cb_each){
					var settings = {
							type: "GET",
							dataType: "json",
							success: function(data, textStatus, jqXHR ){
								//console.dir(data);
								templates[aTemplate] = data;
								cb_each(null);
							},
							error: function(jqXHR, textStatus, errorThrown){
								cb_each(errorThrown);
							}						
					};
					$.ajax('template/'+aTemplate+'/template_description.json',settings);
				};
				async.eachSeries(templateList, iterator, function(err, results){
					cb2_series(err);
				});
			},
		], function (err, result) {
			if (!err){
				loaded_cb(null);
			}
			else {
				loaded_cb("Failed to read template json files: "+err);
			}
			//console.dir(templates);
		});
	};
	
	function constructor(cb_constructor){
		
		loadTemplate(function(err){
			if (!err){
				cb_constructor(null, {
					//=== public services of TemplateMgr ===
					getTemplateList: function(){
						var templateList = [];
						for(var template in templates){
							templateList.push(templates[template]);
						}
						return templateList;
					},
					
					getSubTemplateList: function(mainTemplateId){
						var subTemplateList = [];
						var subTemplates = templates[mainTemplateId].subTemplate;
						for(var subTemplate in subTemplates){
							//sort subTemplateList by name
							if (subTemplateList.length===0){
								subTemplateList.push(subTemplates[subTemplate]);
							}
							else if (subTemplates[subTemplate].name < subTemplateList[0]){
								subTemplateList.unshift(subTemplates[subTemplate]);
							}
							else {
								subTemplateList.push(subTemplates[subTemplate]);
							}
							
						}
						return subTemplateList;
					},
					
					getSubTemplate: function(mainTemplateId, subTemplateId){
						return templates[mainTemplateId].subTemplate[subTemplateId];
					}
			
				});
			}
			else {
				cb_constructor(err,null);
			}
		});
	}
	
	
	return {
		getInstance: function(got_cb){
			if(!uInstance){
				constructor(function(err, _uInstance){
					uInstance = _uInstance;
					got_cb(err, uInstance);
				});
            }
			else {
				got_cb(err, uInstance);
			}
		}
	};
})();