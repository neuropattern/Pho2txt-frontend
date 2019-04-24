const menuItem = {
  id: 'phoToTxt',
  title: 'Get text',
  contexts: ['image'],
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
  const request = new XMLHttpRequest();

  request.open('POST', 'http://127.0.0.1:5000/files');
  request.setRequestHeader('Content-Type', 'multipart/form-data');
  request.send(clickData.srcUrl);
  request.onload = (...rest) => {
    // const message = JSON.parse(request.responseText).message;
    chrome.tabs.create({ url: `http://localhost:3001/?text=${clickData.srcUrl}` });
  };
});

chrome.storage.onChanged.addListener((changes, storageName) => {
  chrome.browserAction.setBadgeText({ text: changes.total.newValue.toString() });
});
