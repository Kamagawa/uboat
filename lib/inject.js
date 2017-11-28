'use strict';
$(function (){


var contentHtml = `
    <Button type="button" class="openModal">COOL</Button>
`;

var reviewObject = {
    title: 'ha',
    author: 'ha',
    description: 'ha'
}

var ButtonListener = function(){
    let $li_item = $(this).closest("li"); 

    let title = $li_item.find('a.h4').text().trim();
    let author = $li_item.find('a.h4').text().trim();
    let user_stats = $li_item.find('span.opened-by').text().trim();
    
    reviewObject.title = title;
    reviewObject.author = author;
    reviewObject.description = user_stats;
    
    showInfoModal(reviewObject);
 }

//creating buttons on top of existing components
function addButtonDetail() {
    $(".float-right.col-2").remove();
    $(".js-navigation-container li .lh-condensed").after(contentHtml);

    $(".openModal").on("click", ButtonListener);

    vex.defaultOptions.className = 'vex-theme-os';
}


function showInfoModal(reviewObject) {
    vex.dialog.open({
        message: 'Enter your title and description:',
        input: [
            '<input name="title" type="text" placeholder="title" value="' + reviewObject.title + '" required />',
            '<input name="author" type="text" placeholder="author" value="' + reviewObject.author + '" required />',
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
                console.log('title', data.title, 'description', data.description)
                alert(data.title + ":" + data.description);
            }
        }
    })
}


$(document).ready(function() {
    addButtonDetail();
})

})