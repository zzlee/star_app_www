FmMobile.templateSelectPg = {
	//  Page constants.
    PAGE_ID: "templateSelectPg",
    
    //  Page methods.
    load: function(event, data){
        
        
        
        var getTemplateDescription_cb = function(xmlDoc) {
            var templateName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            var templateDesc = xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue;
            var templateID = xmlDoc.getElementsByTagName("ID")[0].childNodes[0].nodeValue;
            
            var templateNameHTML = '<b3>'+templateName+'</b3>';
            var templateDescHTML = '<p>'+templateDesc+'</p>';
            var itemLink = $('<a>').html(templateNameHTML+templateDescHTML);
            //itemLink.attr('href','movie_create.html?template_selected='+templateID);
            itemLink.attr('href','movie_create.html');
            var aListItem = $('<li>').html(itemLink);
            $('#template_list').append(aListItem).listview('refresh');
        }
        
        
        var getTemplateList_cb = function(xmlDoc) {
            
            var templateItems = xmlDoc.getElementsByTagName("template");
            for (var i=0; i<templateItems.length; i++) {
                var templateID = templateItems[i].childNodes[0].nodeValue;
                $.ajax({
                       url: './template/'+templateID+'/template_description.xml',
                       dataType: 'xml',
                       success: getTemplateDescription_cb
                       });
            }
        }
        
        
        $.ajax({
               url: './template/template_list.xml',
               dataType: 'xml',
               success: getTemplateList_cb		
               });
        
    }
}
