chrome.storage.local.get("polyfill", (d) => {
  if (!d || !d.hasOwnProperty("polyfill")) return;
  const { polyfill } = d;
  if (polyfill) {
    document.documentElement.setAttribute('data-polyfill', polyfill);
    let e = document.createElement("script");
    e.src = chrome.runtime.getURL("js/browser-polyfill.js");
    e.onload = () => document.documentElement.removeChild(e);
    document.documentElement.appendChild(e);
  }
});
chrome.runtime.sendMessage("getPolyfills", () => {

});

