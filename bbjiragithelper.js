// ==UserScript==
// @name        Play to JIRA
// @namespace   blackberry.com
// @description Adds the ability to get a description for a JIRA.
// @include     https://jira.bbqnx.net/browse/*
// @grant       none
// @version     1.1
// ==/UserScript==
// From http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // * This styling is an extra step which is likely not required. *
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which *might* occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

function toast(parent, text) {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `
.toast-hidden { position:absolute; left:38%; top:50px;
  padding-left: 20pt;
  padding-right: 20pt;
  font-size: 20pt;
  transition-property: background-color opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  opacity: 0;
}
.toast-shown { position:absolute; left:38%; top:0px;
  padding-left: 20pt;
  padding-right: 20pt;
  font-size: 20pt;
  transition-property: background-color opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  opacity: 1; background-color: #80FF80; }
`;
    document.body.appendChild(css);

    var message = document.createElement('DIV');
    message.appendChild(document.createTextNode(text));
    message.className = 'toast-hidden';
    parent.appendChild(message);

    setTimeout(myShowFunction, 0);

    function myShowFunction() {
        message.className = 'toast-shown';
        setTimeout(myHideFunction, 2000);
    }

    function myHideFunction() {
        message.className = 'toast-hidden';
        setTimeout(myRemoveFunction, 500);
    }

    function myRemoveFunction() {
        parent.removeChild(message);
        document.body.removeChild(css);
    }
}

function addBbButton() {
    var issue_link = document.getElementById('key-val');
    var issue_rel = issue_link.getAttribute('rel');
    var issue_key = issue_link.getAttribute('data-issue-key');

    var issue_type = document.getElementById('type-val').textContent.trim();
    if (issue_type == 'Defect') issue_type = 'bugfix';
    if (issue_type == 'Story') issue_type = 'feature';

    var summary = document.getElementById('summary-val').textContent;

    var toolbar_field = document.getElementsByClassName('center')[0];

    var bbDesc = `JI:${issue_rel} <<TBD description of change>>

TYPE:
${issue_type}

DESCRIPTION:
${issue_key} ${summary}
<<TBD details>>

TESTING:
<<TBD added tests for...>>
Run unit test, connectedAndroidTest.`;

    var t = document.createTextNode('BB desc');

    var bbDescA = document.createElement('a');
    bbDescA.setAttribute("class", "toolbar-trigger");
    bbDescA.appendChild(t);

    var bbDescLi = document.createElement('li');
    bbDescLi.setAttribute("class", "toolbar-item");
    bbDescLi.appendChild(bbDescA);
    bbDescLi.addEventListener('click', function(event) {
        copyTextToClipboard(bbDesc);

        toast(bbDescLi.parentElement, 'Copied to clipboard!');
    });

    var bbDescBtnGrp = document.createElement('ul');
    bbDescBtnGrp.setAttribute("class", "toolbar-group pluggable-ops");
    bbDescBtnGrp.appendChild(bbDescLi);

    toolbar_field.appendChild(bbDescBtnGrp);
}

addBbButton();