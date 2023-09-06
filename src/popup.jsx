// let link = null;
// let clickCount = null;
// let execute = false;
// let isEventListenerAttached = false;

// const { setTimeout } = require("timers/promises");

// const linkElement = document.getElementById("link");
// const linkDisplayElement = document.getElementById("linkDisplay");
// const clickCountElement = document.getElementById("clickCount");
// const executeDisplayElement = document.getElementById("executeDisplay");

// function handleLinkClick(event) {
//   if (event.target.tagName === "A") {
//     link = event.target.href;
//     clickCount++;
//     linkDisplayElement.textContent = link;
//     clickCountElement.textContent = clickCount;
//     event.preventDefault();

//     if (!isEventListenerAttached) {
//       // Add the click event listener only if it's not already attached
//       linkElement.addEventListener("click", handleLinkClick);
//       isEventListenerAttached = true;
//     }

//     setTimeout(() => {
//       execute = true;
//       executeDisplayElement.textContent = "true";

//       if (clickCount === 1 && link) {
//         // window.open(link, "_blank");
//         window.open(link, "popup", "width=600,height=600");

//       } else if (clickCount > 1 && link) {
//         window.open(link, "popup", "width=600,height=600");
//       }

//       execute = false;
//       executeDisplayElement.textContent = "false";
//       clickCount = 0;
//       clickCountElement.textContent = clickCount;
//     }, 1000);
//   }
// }

// linkElement.addEventListener("click", handleLinkClick);

// let link = null;
// let clickCount = 0;
// let execute = false;
// let timeoutId = null;

// const handleLinkClick = (event) => {
//   if (event.target.tagName === "A") {
//     link = event.target.href;
//     clickCount++;
//     event.preventDefault();
//   }
//   clearTimeout(timeoutId);
//   timeoutId = setTimeout(() => {
//     execute = true;
//     if (clickCount === 1 && link) {
//       window.open(link, "_blank");
//     } else if (clickCount > 1 && link) {
//       window.open(link, "popup", "width=600,height=600");
//     }
//     updateUI();
//     execute = false;
//     clickCount = 0;
//   }, 500);
// };

// const updateUI = () => {
//   document.getElementById("link").textContent = `link: ${link}`;
//   document.getElementById("click-count").textContent = `click count: ${clickCount}`;
//   document.getElementById("execute").textContent = `execute: ${execute ? "true" : "false"}`;
// };

// document.getElementById("target-link").addEventListener("click", handleLinkClick);

// let link = null;
// let clickCount = 0;
// let execute = false;
// let timeoutId = null;

// const handleLinkClick = (event) => {
//   if (event.target.tagName === "A") {
//     link = event.target.href;
//     clickCount++;
//     event.preventDefault();

//     clearTimeout(timeoutId);

//     if (clickCount === 1) {
//       timeoutId = setTimeout(() => {
//         if (clickCount === 1 && link) {
//           execute = true;
//           window.open(link, "_blank");
//         }
//         updateUI();
//         execute = false;
//         clickCount = 0;
//       }, 500);
//     } else if (clickCount === 2 && link) {
//       execute = true;
//       window.open(link, "popup", "width=600,height=600");
//       updateUI();
//       execute = false;
//       clickCount = 0;
//     }
//   }
// };

// const updateUI = () => {
//   document.getElementById("link").textContent = `link: ${link}`;
//   document.getElementById("click-count").textContent = `click count: ${clickCount}`;
//   document.getElementById("execute").textContent = `execute: ${execute ? "true" : "false"}`;
// };

// document.body.addEventListener("click", handleLinkClick);

let link = null;
let clickCount = 0;
let execute = false;
let timeoutId = null;

const handleLinkClick = (event) => {
  if (event.target.tagName === "A") {
    link = event.target.href;
    clickCount++;
    event.preventDefault();

    clearTimeout(timeoutId);

    if (clickCount === 1) {
      timeoutId = setTimeout(() => {
        if (clickCount === 1 && link) {
          execute = true;
          openNewTab(link)
        }
        updateUI();
        execute = false;
        clickCount = 0;
      }, 500);
    } else if (clickCount === 2 && link) {
      execute = true;
      openNewPopup(link);
      updateUI();
      execute = false;
      clickCount = 0;
    }
  }
};

const openNewTab = (url) => {
  chrome.tabs.create({ url });
};

const openNewPopup = (url) => {
  // You can customize the popup window properties here
  const popupProperties = {
    url,
    width: 600,
    height: 600,
  };
  chrome.windows.create(popupProperties);
};

const updateUI = () => {
  document.getElementById("link").textContent = `link: ${link}`;
  document.getElementById("click-count").textContent = `click count: ${clickCount}`;
  document.getElementById("execute").textContent = `execute: ${execute ? "true" : "false"}`;
};

document.body.addEventListener("click", handleLinkClick);


content.js

