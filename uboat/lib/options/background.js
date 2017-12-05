chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "/lib/options/options.html";
    chrome.tabs.create({ url: newURL });
});
