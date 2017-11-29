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


var test = {
    fields: {
        project: { key: "AVNPIM"},
       	summary: "REST Jira Issue Creation Test from Chrome Extension",
       	description: "Creating of an issue using project keys and issue type names using the REST API",
       	issuetype: { "id": "1" },
       	components: [{ "id": "30057" }],
        customfield_10108: { "id": "10208" },
       	customfield_14000: [{ "id": "16871" }]
   	}
}

function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}

var xhr = new XMLHttpRequest();
var url = "https://jira.bbqnx.net/rest/api/2/issue";


function createIssueCall(source, callBack){
if (xhr) {
    xhr.open("POST", url, true);
    
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", make_base_auth('yujwang', '1714156=Q'));

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 201) {
            callBack(xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }
    try {
        xhr.send(JSON.stringify(test));
    } catch(e){
        Console.log(e);
    }
    
}
}

