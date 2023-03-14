// ==UserScript==
// @name         Ask AI
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  A script to help you on tests (Ctrl + Alt + A to open)
// @author       dweltstorm
// @match        https://lms.lausd.net/*
// @icon         https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==
/* global $ */

const api_key = "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";
async function gpt3(prompt, callback) {
    $.ajax({
        url: 'https://api.openai.com/v1/chat/completions',
        type: 'POST',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + api_key);
        },
        data: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: 'You are an AI chat bot designed to help students answer questions on their tests.'},
                {role:'user', content: prompt}],
            max_tokens: 1000,
            n: 1,
        }),
        success: (data) => {callback(data.choices[0].message.content)}
    });
}


$('<link>', {href: 'https://fonts.cdnfonts.com/css/gotham', rel:'stylesheet'}).appendTo(document.head);

const askmenu = $('<div>', {'class':'askmenu', id:'askdiv'}).appendTo(document.body).hide();
$('<h2>', {text:'Ask Ai'}).appendTo(askmenu);
$('<div>', {class: 'askinput'}).appendTo(askmenu);
$('<input>', {type: 'text', placeholder: 'Enter question here', id: 'askinputbox'}).appendTo($('.askinput'))
$('<p>', {id: 'airesponse'}).appendTo(askmenu);
$('<input>', {type: 'submit', value: 'Ask'}).appendTo('.askinput').click(() => {
    gpt3($('#askinputbox')[0].value, (response) =>{
        $('#askinputbox')[0].value = '';
        $('#airesponse')[0].innerText = response;
    });
});

$(document).keyup((event) => {
  if (event.ctrlKey && event.altKey && event.key == 'a') {
    $('.askmenu').animate({width: 'toggle', height:'toggle'}, 150);
  }
});


$('.askmenu').css({
    'position': 'fixed',
    'bottom' : '10px',
    'right' : '10px',
    'background-color': '#1c1c1c',
    'height': '400px',
    'width': '350px',
    'border-radius': '10px',
    "z-index": "999999"
});

$('.askmenu h2').css({
    "color" : "white",
    "font-family": "'Gotham', sans-serif",
    "font-size": "32px",
    "padding": "0",
    "padding-left": "17.25px",
    "padding-top": "10px"
})

$('.askmenu .askinput input[type=text]').css({
    "padding-left": "10px",
    "margin": "17.25px",
    "border": "none",
    "margin-top": "10px",
    "margin-right": "10px",
    "border-radius": "10px",
    "width": "70%",
    "color": "#000000"
})

$('.askmenu .askinput input[type=submit]').css({
    "background-color": "rgb(0, 137, 250)",
    "display": "inline",
    "margin": "17.25px",
    "margin-left": "0",
    "margin-top": "10px",
    "margin-right": "0",
    "border": "none",
    "position": "absolute",
    "right": "17.25px",
    "border-radius": "10px",
    "color": "white"
});

$('.askmenu p').css({
    "background-color": "#464646",
    "color": "white",
    "font-family": "'Gotham', sans-serif",
    "position": "absolute",
    "border-radius": "10px",
    "bottom": "5%",
    "left": "5%",
    "right": "5%",
    "height": "62%",
    "width": "80%",
    "padding": "5%"
});

