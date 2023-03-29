// ==UserScript==
// @name         Reddit Unblock
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Changes all reddit links to safereddit.com
// @author       dweltstorm
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==

Array.from(document.links).filter(x => /^https:\/\/www.reddit.com\//g.test(x.href)).forEach(x => {x.href = x.href.replace('www.reddit.com', 'safereddit.com')})
