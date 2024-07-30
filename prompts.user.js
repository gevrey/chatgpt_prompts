// ==UserScript==
// @name         ChatGPT Prompts
// @license      GPL
// @namespace    https://github.com/gevrey
// @version      0.2.6
// @description  awesome chatGPT prompts
// @author       gevrey
// @resource     IMPORTED_CSS https://github.com/gevrey/tribute/raw/master/dist/tribute.css
// @resource     jsonData https://github.com/gevrey/chatgpt_prompts/raw/master/prompts.json
// @require      https://github.com/gevrey/tribute/raw/master/dist/tribute.js
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

var defaultData = JSON.parse(GM_getResourceText("jsonData"));
var userData = [
  {
    "key": "Spoken English Teacher and Improver",
    "prompt": "I want you to act as a spoken English teacher and improver. I will speak to you in English and you will reply to me in English to practice my spoken English. I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to ask me a question in your reply. Now let's start practicing, you could ask me a question first. Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.",
    "tags": [
      "language"
    ],
  },
]
userData.push(...defaultData);

function load() {
  let textArea = document.getElementsByTagName("textarea");
  if (textArea.length === 0) {
    return;
  } else {
    textArea = textArea[0];
  }
  if (textArea.hasAttribute("data-tribute")) {
    return;
  }
  var tribute = new Tribute({
    trigger: '/',
    values: userData,
    selectTemplate: function (item) {
      if (typeof item === "undefined") return null;
      return item.original.prompt;
    },
    requireLeadingSpace: false
  });
  tribute.attach(textArea);
}

(function () {
  'use strict';
  const themeCSS = `
  .dark .tribute-container ul {
    background: #3e3f4b;
  }
  .dark .tribute-container li.highlight {
    background: #5f6062;
  }
  .result-streaming {
    min-height: 50vh;
  }
  `;
  const importCSS = GM_getResourceText("IMPORTED_CSS");
  GM_addStyle(importCSS);
  GM_addStyle(themeCSS);

  let previousUrl = "";
  const observer = new MutationObserver(() => {
    if (window.location.href !== previousUrl) {
      console.log(`URL changed from ${previousUrl} to ${window.location.href}`);
      previousUrl = window.location.href;
      setTimeout(() => { load(); }, 1000)
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
  setInterval(function () {
    load();
  }, 60 * 1000);
})();
