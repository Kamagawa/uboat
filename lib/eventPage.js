var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};

function isInt(x) {
    var y = parseInt(x, 10);
    var res = !isNaN(y) && x == y && x.toString() == y.toString();
    alert (res);
    return res;
 }

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(data){
    if (data.menuItemId == "spendMoney" && data.selectionText){
        //alert('created ' + data.selectionText);
        
            //alert('isNumber' + data.selectionText);
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if (budget.total){
                    newTotal += parseInt(budget.total);
                } 

                //alert (newTotal);
                newTotal += parseInt (data.selectionText);
                //alert (newTotal);

                chrome.storage.sync.set({'total': newTotal}, function(){
                    
                    if (newTotal >= budget.limit){
                        var notifOptions = {
                            type:'basic',
                            iconUrl: 'icon.png',
                            title: 'Limit reached',
                            message: 'Ohshit, limit reached bro',
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                })

            })
        
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
})