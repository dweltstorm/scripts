// ==UserScript==
// @name         Fake Kiosk
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a navbar to the top of the screen to make it look like you're in the kiosk
// @author       You
// @match        https://*/*
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// @icon          https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico
// @grant        none
// ==/UserScript==
/* global $ */
$('<link>', {rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"}).appendTo(document.head);

const kiosk = $('<div>', {id: 'kiosk-bar', 'class':'kiosk-bar'}).insertBefore(document.body.children[0]);
$('<button>', {id: 'back', 'class': "material-symbols-sharp", text: 'arrow_left'}).appendTo(kiosk).click(() => history.back());
$('<button>', {id: 'forward', 'class': "material-symbols-sharp", text: 'arrow_right'}).appendTo(kiosk).click(() => history.forward());
$('<button>', {id: 'home', 'class': "material-symbols-sharp", text: 'home'}).appendTo(kiosk).click(() => location.assign('https://lausdschoology.azurewebsites.net/'));
$('<button>', {id: 'reload', 'class': "material-symbols-sharp", text: 'refresh'}).appendTo(kiosk).click(() => location.reload());
$('<button>', {id: 'restart-session', text: 'Restart session'}).appendTo(kiosk).click(() => location.reload());

kiosk.css({
    'position': 'sticky',
    'top': '0',
    'background-color': '#e3e3e3',
    'width': '100%',
    'height': '30px',
    'z-index': '999999'
});

$('.kiosk-bar button').css({
    'color': 'black',
    'background': 'none',
    'border': 'none',
    'height': '24px',
    'padding-top': '2px'
});

$('#restart-session').css({
    'position': 'relative',
    'padding-left' : '5px',
    'bottom': '7px'
})
