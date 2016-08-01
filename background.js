console.log('background js loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      console.log(tab.favIconUrl);
    });
  });
  return true;
});
