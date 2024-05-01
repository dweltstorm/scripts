// ==UserScript==
// @name        Chem Serializer
// @namespace   Violentmonkey Scripts
// @match       https://lms.lausd.net/assignment/*/assessment_view/*
// @match       https://lms.lausd.net/assignment/*/assessment
// @grant       GM_setClipboard
// @version     1.1
// @author      dweltstorm
// @description Lets you easily export and import answers for chem homework
// @require     https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js
// @require     https://code.jquery.com/jquery-3.7.1.js
// @downloadURL https://github.com/dweltstorm/scripts/raw/main/kwan-serializer/script.user.js
// @updateURL   https://github.com/dweltstorm/scripts/raw/main/kwan-serializer/script.user.js
// ==/UserScript==
/*globals $*/



function getAnswers() {
  return Array.from($(".text-blank-spot.selected")).map(el => Array.from(el.classList).includes('incorrect')?'':el.outerText.replace('\nCorrect.',''));
}

function compressAnswers() {
  return LZString.compress(getAnswers().join('𓀴'));
}

function decompressAnswers(answers) {
  string = LZString.decompress(answers);
  if(!string.includes("𓀴")) {
    alert("Invalid answer string");
    return '';
  }
  else return LZString.decompress(answers).split('𓀴');
}

var copyButton = $("<a>").addClass("navbtn link-btn sExtlink-processed").text("Copy Answers").on("click", e => GM_setClipboard(compressAnswers()))
var pasteButton = $("<button>").text("Paste Answers").on("click", e => {
  var answers = decompressAnswers(prompt("Enter your answer string"));
  for(var i=0; i <  $(".form-text.blank.s-js-language-keyboard").length; i++) {
    $(".form-text.blank.s-js-language-keyboard")[i].value = answers[i];
  }
})
if($(".ui-selectmenu-status").length > 0) {
  $(".navigator-buttons").prepend(copyButton);
}


if($(".progress").length > 0) {
  $(".assessment-status.enabled").prepend(pasteButton);
};
