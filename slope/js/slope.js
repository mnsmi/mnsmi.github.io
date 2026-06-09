
var buildUrl = "unity/slope";
var loaderUrl = buildUrl + "/SlopeBuild.loader.js";
var config = {
  dataUrl: buildUrl + "/SlopeBuild.data.gz",
  frameworkUrl: buildUrl + "/SlopeBuild.framework.js.gz",
  codeUrl: buildUrl + "/SlopeBuild.wasm.gz",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "Y8",
  productName: "Slope",
  productVersion: "1.2",
};

var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var mobileWarning = document.querySelector("#unity-mobile-warning");


if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  container.className = "unity-mobile";
  // Avoid draining fillrate performance on mobile devices,
  // and default/override low DPI mode on mobile browsers.
  config.devicePixelRatio = 1;
  mobileWarning.style.display = "block";
  setTimeout(() => {
    mobileWarning.style.display = "none";
  }, 5000);
} else {
  canvas.style.width = "960px";
  canvas.style.height = "600px";
}
setTimeout(function () {
  document.getElementById("popupPlay").style.display = "none";
}, 6000);

function hiddenPopup() {
  document.getElementById("popupPlay").style.display = "none";
}

document.getElementById("popupPlay").addEventListener("click", hiddenPopup);
loadingBar.style.display = "block";
var myGameInstance = null;
var script = document.createElement("script");

script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  }).then((unityInstance) => {
    myGameInstance = unityInstance;
    loadingBar.style.display = "none";
    fullscreenButton.onclick = () => {
      unityInstance.SetFullscreen(1);
    };
  }).catch((message) => {
    alert(message);
  });
};
window.adsbygoogle = window.adsbygoogle || [];
const adBreak = adConfig = function (o) {
  adsbygoogle.push(o);
}
adConfig({
  preloadAdBreaks: 'off',
  sound: 'on', // This game has sound
  onReady: () => {
    console.log("ready");
  }, // Called when API has initialised and adBreak() is ready
});

function showNextAd() {
  console.log("showNextAd")
  adBreak({
    type: 'next', // ad shows at start of next level
    name: 'next-game',
    beforeAd: () => {
      console.log("beforeAd")
      passBeforeAdData()
    }, // You may also want to mute thegame's sound.
    afterAd: () => {
      console.log("afterAd")
    }, // resume the game flow.
    adBreakDone: (placementInfo) => {
      console.log("adBreak complete ");
      adBreakDoneData()
      console.log(placementInfo.breakType);
      console.log(placementInfo.breakName);
      console.log(placementInfo.breakFormat);
      console.log(placementInfo.breakStatus);
    },
  });
}

function passBeforeAdData() {
  myGameInstance.SendMessage('Canvas', 'pauseGame');
}

function adBreakDoneData() {
  myGameInstance.SendMessage('Canvas', 'resumeGame');
}
script.src = loaderUrl;
document.body.appendChild(script);