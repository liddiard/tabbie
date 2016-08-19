let idToFaviconMap = {};
let numbersDisplayed = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request) {
    case 'showNumbers':
      if (!numbersDisplayed) {
        numbersDisplayed = true;
        idToFaviconMap = {};
        chrome.tabs.query({}, tabs => {
          let tabId;
          tabs.forEach(tab => {
            idToFaviconMap[tab.id] = tab.favIconUrl;
            if (tab.index < 8) {
              chrome.tabs.sendMessage(tab.id, {favIconUrl: chrome.extension.getURL(`tab-icons/${tab.index+1}.png`)});
            } else if (tab.index === tabs.length - 1) {
              chrome.tabs.sendMessage(tab.id, {favIconUrl: chrome.extension.getURL(`tab-icons/9.png`)});
            }
          });
        });
      }
      return true;
    case 'showFavIcons':
      numbersDisplayed = false;
      chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, {favIconUrl: idToFaviconMap[tab.id]});
        });
      });
      return true;
    default:
      console.error('Unrecognized request: ' + request); 
      return false;
  }
});
