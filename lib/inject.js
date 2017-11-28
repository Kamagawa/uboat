'use strict';
$(function (){


var contentHtml = `
    <Button type="button" class="openModal">COOL</Button>
`;

var ButtonListener = function(){
    let $li_item = $(this).closest("li"); 

    $li_item.remove();
    
    
    showInfoModal();
 }

//creating buttons on top of existing components
function addButtonDetail() {
    $(".float-right.col-2").remove();
    $(".js-navigation-container li .lh-condensed").after(contentHtml);

    $(".openModal").on("click", ButtonListener);

    vex.defaultOptions.className = 'vex-theme-os';
}


function showInfoModal() {
    vex.dialog.open({
        message: 'Enter your title and description:',
        input: [
            '<input name="title" type="text" placeholder="title" required />',
            '<input name="description" type="text" placeholder="description" required />'
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