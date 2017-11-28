$(function(){
    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    })

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        //alert(limit);
        if (limit){
          chrome.storage.sync.set({'limit':limit}, function(){
            close();
          });
        }
        
    })

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0}, function(){ 
            var notifOptions = {
                type:'basic',
                iconUrl: 'icon.png',
                title: 'Reset Total',
                message: 'Oh Why bro, why u reset Total?',
            };
            chrome.notifications.create('limitNotif', notifOptions);
        });
    })
})
