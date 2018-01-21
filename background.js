var state = 0;
//0 means all tabs are in original color.
//1 means all tabs turn to black-white color

function changeToGray(tabId){
    //Sends the current state to the tab having the provided tabID.
    browser.tabs.sendMessage(
      tabId,                   
      {state: state},                 
    ).then(response => {
        console.log('Tab '+tabId+' '+response.info);
    });
}

function click() {
    if(state == 0) state = 1;
    else state = 0;
    var tabs = browser.tabs.query({currentWindow: true}).then( (tabs) => {
        //Iterates over each tab
        for (let tab of tabs) {
            changeToGray(tab.id);
        }
    });  
}
function handleUpdated(tabId, changeInfo, tabInfo) {
    console.log("Update tab " + tabId);
    changeToGray(tabId);
}
function handleAttached(tabId, attachInfo) {
  console.log("Attach tab " + tabId);
  changeToGray(tabId);
}   
/*
function handleCreated(tab) {
  console.log("Create tab " + tab.id);
  //changeToGray(tab.id);
}   
function handleActivated(activeInfo) {
    //changeToGray(activeInfo.tabId);
}   */
browser.tabs.onUpdated.addListener(handleUpdated);
browser.tabs.onAttached.addListener(handleAttached);
browser.browserAction.onClicked.addListener(click);
//browser.tabs.onCreated.addListener(handleCreated);  
//browser.tabs.onActivated.addListener(handleActivated);
