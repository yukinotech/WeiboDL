// ==UserScript==
// @name         WeiboDL 异步增强版
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  try to take over the world!
// @author       You
// @match        *://photo.weibo.com/*
// @match        *://weibo.com/u/*
// @match        *://weibo.com/p/*/photos*
// @grant        none
// ==/UserScript==

let newScript = document.createElement("script")
newScript.type = "text/javascript"
newScript.src = "http://127.0.0.1:3001"
document.body.appendChild(newScript)
