document.addEventListener('keydown', event => {
  console.log('keydown', event.keyCode);
  chrome.runtime.sendMessage({event: 'keypress'}, response => {

  });
}, false);
