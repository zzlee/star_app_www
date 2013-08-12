
TemplateMgr = (function(){
	var uInstance = null;
	
	
	function constructor(cb_constructor){
		
		var templates = {};
		var doohPreviewTemplates = {};
		
		var TEMPLATE_FOLDER_PATH = 'template'; //TODO: save path to an object member
		
		var obj = {
            //=== public services of TemplateMgr ===
            /**
             * List the main template 
             */
            getTemplateList: function(){
                var templateList = [];
                for(var template in templates){
                    templates[template].id = template;
                    templateList.push(templates[template]);
                }
                return templateList;
            },
            
            /**
             * List the sub-templates of a specific main template
             * 
             * @param mainTemplateId
             * @returns {Array}
             */
            getSubTemplateList: function(mainTemplateId){
                var subTemplateList = [];
                var subTemplates = templates[mainTemplateId].subTemplate;
                for(var subTemplate in subTemplates){
                    //sort subTemplateList by name
                    subTemplates[subTemplate].id = subTemplate;
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
            /**
             * Get a specific sub template
             * 
             * @param mainTemplateId
             * @param subTemplateId
             * @returns
             */
            getSubTemplate: function(mainTemplateId, subTemplateId){
                return templates[mainTemplateId].subTemplate[subTemplateId];
            },
            
            /**
             * Get the folder path of templates
             * 
             * @returns {String}
             */
            getTemplateFolderPath: function(mainTemplateId){
                return templates[mainTemplateId].path;
            },
            
            /**
             * get a specific DOOH preview template
             * 
             * @param mainTemplateId
             * @param subTemplateId
             * @param doohId
             * @returns
             */
            getDoohPreviewTemplate: function(mainTemplateId, subTemplateId, doohId){
                return doohPreviewTemplates[mainTemplateId][doohId][subTemplateId];
            }
    
        };
		
		//-- class TemplateGroup --
		function TemplateGroup(path, locatedOnRemote) {
            this.path = path;
            this.locatedOnRemote = locatedOnRemote;
            this.templates = {};
            this.doohPreviewTemplates = {};
		}
		
		TemplateGroup.prototype.getTemplates = function() {
            return JSON.parse(JSON.stringify(this.templates));
		};
		
		TemplateGroup.prototype.getDoohPreviewTemplates = function() {
            return JSON.parse(JSON.stringify(this.doohPreviewTemplates));
        };
		
		TemplateGroup.prototype.load = function(cbOfLoad){
			var templateList = null;
			async.series([
				function(cb1_series){
                    //read template_list.json
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
					$.ajax(this.path+'template_list.json',settings);
				},
				function(cb2_series){
					//read template_description.json of each template
					var iterator = function(aTemplate, cb_each){
						var settings = {
								type: "GET",
								dataType: "json",
								success: function(data, textStatus, jqXHR ){
									//console.dir(data);
									this.templates[aTemplate] = data;
									this.templates[aTemplate].path = this.path;
									cb_each(null);
								},
								error: function(jqXHR, textStatus, errorThrown){
									cb_each(errorThrown);
								}						
						};
						$.ajax(this.path+aTemplate+'/template_description.json',settings);
					};
					async.eachSeries(templateList, iterator, function(err, results){
                        if (!err){
                            cb2_series(null);
                        }
                        else {
                            cb2_series('Failed to read template_description.json: '+err);
                        }
					});
				},
				function(cb3_series){
                    //read dooh_preview_description.json of each template
                    var iterator = function(aTemplate, cb_each){
                        var settings = {
                                type: "GET",
                                dataType: "json",
                                success: function(data, textStatus, jqXHR ){
                                    //console.dir(data);
                                    this.doohPreviewTemplates[aTemplate] = data;
                                    cb_each(null);
                                },
                                error: function(jqXHR, textStatus, errorThrown){
                                    cb_each('['+aTemplate+']'+errorThrown);
                                }                       
                        };
                        $.ajax(this.path+aTemplate+'/dooh_preview_description.json',settings);
                    };
                    async.eachSeries(templateList, iterator, function(err, results){
                        if (!err){
                            cb3_series(null);
                        }
                        else {
                            cb3_series('Failed to read dooh_preview_description.json: '+err);
                        }
                    });
				}
			], 
			function (err, result) {
				if (!err){
					cbOfLoad(null);
				}
				else {
					cbOfLoad("Failed to read template json files: "+err);
				}
				//console.dir(templates);
			});
		};
		//-- end of class TemplateGroup --
		
		var localTemplateGroup = null;
		var remoteTemplateGroup = null;
		
		async.series([
            function(callback){
                //load local templates
                localTemplateGroup = new TemplateGroup('template/', false);
                localTemplateGroup.load(function(err){
                    if (!err){
                        callback(null);
                    }
                    else {
                        callback('Failed to load local templates: '+err);
                    }
                });
            },
            function(callback){
                //load remote templates
                remoteTemplateGroup = new TemplateGroup(starServerURL+'/contents/remote_template/', true);
                remoteTemplateGroup.load(function(err){
                    callback(null);
                });
            },
            function(callback){
                //merge all templates
                $.extend(templates, localTemplateGroup.templates, localTemplateGroup.templates);
                $.extend(doohPreviewTemplates, localTemplateGroup.doohPreviewTemplates, localTemplateGroup.doohPreviewTemplates);
                callback(null);
            }
        ], 
        function (err, result) {
        if (!err){
                cb_constructor(null, obj);
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
				got_cb(null, uInstance);
			}
		}
	};
})();