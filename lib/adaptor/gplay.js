'use strict';
var GoogleButton = `
    <div style="padding-top:10px;"> 
        <Button class="openModal" > 
            <div>😊</div> 
        </Button>
    </div>
`;

var ButtonGooglePlayAdapter = function(reviewObject){
    let $item = $(this).closest("article"); 
    
    // User comment
    let comment = $item.find('pre span:eq(1)').text().trim();
    reviewObject.summary = comment.substring(0,60);

    // User device specs
    let specs = $item.find('.CRJ1NGC-el-a').html();
    htmlToTextParser(specs);

    reviewObject.desc = comment;
    reviewObject.project = gplayPackage;
    showInfoModal(reviewObject);
 }

 function addButtonGooglePlay() {
    $("article img").parent().after(GoogleButton);    
    $(".openModal").on("click", ButtonGooglePlayAdapter);
}