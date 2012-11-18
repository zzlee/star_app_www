
var recordUserAction = function( userAction ){
    
    var aAnalyticsRecord = {
        action: userAction,
        time: (new Date()).getTime(),
        user_id: localStorage._id,
        os: device.platform,
        os_version: device.version,
        device_uuid: device.uuid
    };
    
    var analyticsRecordsToSend;
    if ( localStorage.unsentAnalyticsRecords) {
        analyticsRecordsToSend = JSON.parse(localStorage.unsentAnalyticsRecords);
    }
    else {
        analyticsRecordsToSend = new Array();
    }
    analyticsRecordsToSend.push(aAnalyticsRecord);

    $.post(starServerURL+'/record_user_action', aAnalyticsRecord, function(result){
        if ( !result.err ) {
           localStorage.unsentAnalyticsRecords = null;
        }
        else {
           localStorage.unsentAnalyticsRecords = JSON.stringify(analyticsRecordsToSend);
        }
    });
    
}