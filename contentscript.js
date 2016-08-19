let metaKeyDown = false;

document.addEventListener('keydown', event => {
  if (event.metaKey && !metaKeyDown) {
    metaKeyDown = true;
    chrome.runtime.sendMessage('showNumbers');
  }
  else if (metaKeyDown) {
    metaKeyDown = false; 
    chrome.runtime.sendMessage('showFavIcons');
  }
}, false);

document.addEventListener('keyup', event => {
  // console.log('keyUp', event.keyCode);
  if (metaKeyDown || event.keyCode === 91 || event.keyCode === 17) {
    metaKeyDown = false;
    chrome.runtime.sendMessage('showFavIcons');
  }
}, false);

document.addEventListener('visibilitychange', event => {
  console.log('visibility change');
  if (metaKeyDown) {
    metaKeyDown = false;
    chrome.runtime.sendMessage('showFavIcons');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  el = document.querySelectorAll('head link[rel*="icon"]');

  // Remove existing favicons
  Array.prototype.forEach.call(el, node => {
    node.parentNode.removeChild(node);
  });      
  // Create new favicon
  link      = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel  = 'icon';
  link.href = request.favIconUrl;

  document.getElementsByTagName('head')[0].appendChild(link);

  return true;
});
