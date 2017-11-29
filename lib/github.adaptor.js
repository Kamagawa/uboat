'use strict';
var buttonHtml = `
    <Button type="button" class="openModal">COOL</Button>
`;

var ButtonGithubAdapter = function(reviewObject){
    let $li_item = $(this).closest("li"); 
  
    let title = $li_item.find('a.h4').text().trim();
    let author = $li_item.find('[title^="Open issues created by"]').text().trim();
    let time = $li_item.find('relative-time').attr('datetime');
    let user_stats = $li_item.find('span.opened-by').text().trim();
    
    reviewObject.title = title;
    reviewObject.author = author;
    reviewObject.time = time;
    reviewObject.desc = user_stats;
    reviewObject.project = gplayPackage;
    
    showInfoModal(reviewObject);
}

function addButtonGithub() {
    $(".lh-condensed").after(buttonHtml);    
    $(".openModal").on("click", ButtonGithubAdapter);
}
