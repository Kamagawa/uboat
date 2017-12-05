'use strict';
var GoogleButton = `
    <div class="specialGoogleButton" style="padding-top:10px;"> 
        <Button class="openModal btn green lighten-2 waves-effect waves-light" > 
            <div>new issue</div> 
        </Button>
    </div>
`;

var ButtonGooglePlayAdapter = function(){
    let $item = $(this).closest("article"); 
    
    var display = {   
        project : "AVNPIM",
        summary : "REST Jira Issue Creation Test from Chrome Extension(modal)",
        description : "Creating of an issue using project keys and issue type names using the REST API",
        issuetype : 'bugfix',
        components: 'calendar',
        platform: 'android'
    }

    // path for phone environment: article div:eq(3/last) div:eq(2/last) div:eq(first/only) div(only) secions:both
    let comment = $item.find('pre span:eq(1)').text().trim();
    display.summary = comment.substring(0,300);
    display.description = `from Google Review\n` + comment + `\n--- Steps to Reproduce: ---\n\n--- Actual Result: ---\n\n
    --- Expected Result: ---\n\n--- Workaround: ---\n\n--- Performance Impact: ---\n\n--- Environment Details: ---\n\n`;
    let specs = $item.find('dl');
    //console.log(specs);console.log(specs.length); console.dir(specs);
    
    let buffer = '';
    console.log(specs); 
    var dd = specs.find('dd').get();
    var dt = specs.find('dt').get();
    
    for(var i = 0; i<dt.length; i++){
        buffer = buffer + (dt[i].innerText) + ': '+ (dd[i].innerText) + '\n';
    }
    display.description += '\n' + buffer;

    // send to function to start object
    console.dir(display);
    materialModal(display);
 }
 
 function addButtonGooglePlay() {
    $('.specialGoogleButton').remove();
    $("article img").parent().after(GoogleButton);    
    $(".openModal").on("click", ButtonGooglePlayAdapter);
}