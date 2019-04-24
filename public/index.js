/**
 * Returns a handler which will open a new tab when activated.
 */


function getClickHandler() {
  return function (info, tab) {
    const url = `http://regex.info/exif.cgi?imgurl=${info.srcUrl}`;

    chrome.tabs.create({ url });
  };
}


chrome.contextMenus.create({
  title: "Get image info via Jeffrey's Exif Viewer",
  type: 'normal',
  contexts: ['image'],
  onclick: getClickHandler(),
});
