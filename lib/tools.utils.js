//parse the html to text within the file
//WIll be stored in key value pairs
function htmlToTextParser(){
    return null;
}

function jira(data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', JIRA_API);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(data);
}