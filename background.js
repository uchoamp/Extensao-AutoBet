
var curr_tab_id

function compareUrl(url, tabid){
    if (url.match(/betfair\.com/)) {
        chrome.action.enable();
        curr_tab_id = tabid
    } else {
        chrome.action.disable();
    }
}


chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
    let url = tab.url
    if(tabId != curr_tab_id) compareUrl(url, tabId);    
});

chrome.tabs.onActivated.addListener(async function(e){
    let tab = await chrome.tabs.get(e.tabId);
    let url = tab.url
    compareUrl(url, e.tabId);    
});