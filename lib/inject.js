'use strict';
$(function (){


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
    title: 'ha',
    author: 'ha',
    time: '',
    description: 'ha'
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
    reviewObject.description = user_stats;
    
    showInfoModalGithub(reviewObject);
 }

 var ButtonGooglePlayAdapter = function(){
    let $li_item = $(this).closest("li"); 
  
    let title = $li_item.find('a.h4').text().trim();
    let author = $li_item.find('[title^="Open issues created by"]').text().trim();
    let time = $li_item.find('relative-time').attr('datetime');
    let user_stats = $li_item.find('span.opened-by').text().trim();
    
    reviewObject.title = title;
    reviewObject.author = author;
    reviewObject.time = time;
    reviewObject.description = user_stats;
    
    showInfoModalGithub(reviewObject);
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


function showInfoModalGithub(reviewObject) {
    vex.dialog.open({
        message: 'Enter your title and description:',
        input: [
            '<input name="title" type="text" placeholder="title" value="' + reviewObject.title + '" required />',
            '<input name="author" type="text" placeholder="author" value="' + reviewObject.author + '" required />',
            '<input name="author" type="text" placeholder="author" value="' + reviewObject.time + '" required />',
            '<input name="description" type="text" placeholder="description"' + reviewObject.description + '" required />'
        ].join(''),
        buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: 'Confirm' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Discard' })
        ],
        callback: function (data) {
            if (!data) {
                console.log('Cancelled')
            } else {
                jira(data);
                console.log('title', data.title, 'description', data.description)
                alert(data.title + ":" + data.description);
            }
        }
    })
}

function JiraCall(data){

}

$(document).ready(function() {
    addButtonDetail();
})

setInterval(function() {
    var occurance = $('.openModal').length
    if (occurance == 0){
        addButtonDetail();
    }
}, 10); // check every second
})

