'use strict';
const JIRA_API = '';


$(function (){

    function templateCreater(data){
        var modalTemplate = [
            '<style>',
            '.vex-custom-field-wrapper {',
                'margin: 1em 0;',
            '}',
            '.vex-custom-field-wrapper > label {',
                'display: inline-block;',
                'margin-bottom: .2em;',
            '}',
        '</style>',

        '<div class="vex-custom-field-wrapper">',
            '<label for="project">Project</label>',
            '<div class="vex-custom-input-wrapper">',
                '<input name="project" type="text" value="' + data.project + '" required/>',
            '</div>',
        '</div>',
        '<div class="vex-custom-field-wrapper">',
            '<label for="type">Issue Type</label>',
            '<div class="vex-custom-input-wrapper">',
                '<input readonly name="type" type="text" list="bugType" value="BugFix" required/>',
                '<datalist id="bugType">',
                  '<option value="BugFix">',
                  '<option value="Story">',
                '</datalist>',
            '</div>',
        '</div>',
        '<div class="vex-custom-field-wrapper">',
            '<label for="summary">Summary</label>',
            '<div class="vex-custom-input-wrapper">',
                '<input name="summary" type="text" value="' + data.summary + '" required/>',
            '</div>',
        '</div>',
        '<div class="vex-custom-field-wrapper">',
            '<label for="desc">Description</label>',
            '<div class="vex-custom-input-wrapper">',
                '<input name="desc" type="text" rows="5" value="' + data.desc + '" required/>',
            '</div>',
        '</div>'
        ];

        return modalTemplate;
    }

var buttonHtml = `
    <Button type="button" class="openModal">COOL</Button>
`;

var GoogleDivHtml = `
    <div style="padding-top:10px;"> 
        <Button class="openModal CRJ1NGC-f-a CRJ1NGC-f-p CRJ1NGC-Qm-a"> 
            <div>😊</div> 
        </Button>
    </div>
`;


var reviewObject = {
    project: 'Project Name',
    type: 'issue type',
    summary: 'summary',
    desc: 'description',

    title: 'ha',
    author: 'ha',
    time: '',   
    toSend: function(){
        var send_item = {
            'key': project,
        }
        return send_item;
    }
}

var ButtonGithubAdapter = function(){
    let $li_item = $(this).closest("li"); 
  
    let title = $li_item.find('a.h4').text().trim();
    let author = $li_item.find('[title^="Open issues created by"]').text().trim();
    let time = $li_item.find('relative-time').attr('datetime');
    let user_stats = $li_item.find('span.opened-by').text().trim();
    
    reviewObject.title = title;
    reviewObject.author = author;
    reviewObject.time = time;
    reviewObject.desc = user_stats;
    
    showInfoModal(reviewObject);
 }

 //parse the html to text within the file
 //WIll be stored in key value pairs
 function htmlToTextParser(){
    
     }

 var ButtonGooglePlayAdapter = function(){
    let $item = $(this).closest("article"); 
    
    // User comment
    let comment = $item.find('pre.CRJ1NGC-xm-a span:eq(1)').text().trim();
    reviewObject.summary = comment.substring(0,60);

    // User device specs
    let specs = $item.find('.CRJ1NGC-el-a').html();
    htmlToTextParser(specs);

    alert

    reviewObject.desc = comment;
    
    showInfoModal(reviewObject);
 }

 

function addButtonGithub() {
    $(".lh-condensed").after(buttonHtml);    
    $(".openModal").on("click", ButtonGithubAdapter);
}

function addButtonGooglePlay() {
    $(".CRJ1NGC-Yl-l").append(GoogleDivHtml);    
    $(".openModal").on("click", ButtonGooglePlayAdapter);
}

//creating buttons on top of existing components
function addButtonDetail() {
    vex.defaultOptions.className = 'vex-theme-os';
    addButtonGithub();
    addButtonGooglePlay();    
}


function showInfoModal(reviewObject) {
    vex.dialog.open({
        message: 'Enter your title and description:',
        input: templateCreater(reviewObject).join(''),
        buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: 'Confirm' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Discard' })
        ],
        callback: function (data) {
            if (!data) {
                console.log('Cancelled')
            } else {
                jira(data.toSend);
                console.log('title', data.title, 'description', data.description)
                alert(data.title + ":" + data.description);
            }
        }
    })
}

function jira(data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', JIRA_API);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(data);
}

$(document).ready(function() {
    var hash = window.location.hash;
    hash = hash.substring(hash.lastIndexOf('=')+1);
    reviewObject.project = hash;
    addButtonDetail();
})

setInterval(function() {
    var articles = $('article').length;
    var occurance = $('.openModal').length;
    //console.log(articles + ', ' + occurance);
    if (occurance == 0){
        addButtonDetail();
    }
}, 10); // check every second
})

//project
//Issue Type

//Summary
//Description