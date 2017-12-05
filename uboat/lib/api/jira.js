// Author: Eugene Wang
const BASE_URL = 'https://jira.bbqnx.net'
const JIRA_API_POST_ISSUE = 'https://jira.bbqnx.net/rest/api/2/issue';
const JIRA_API_GET_USER = 'https://jira.bbqnx.net/rest/api/2/myself';
const JIRA_API_LOGIN = '/rest/auth/1/session';
var JIRA_PROJECT ='';
https://jira.bbqnx.net/rest/api/2/project/AVNPIM/components
// preflight
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';

// Get User
function JIRA_GET_USER(callBack){
    baseRequest('GET', JIRA_API_GET_USER, null, callBack);
}

//Post issue
function JIRA_CREATE_ISSUE(source, callBack){
    baseRequest('POST', JIRA_API_POST_ISSUE, source, callBack);
}

function JIRA_LOGOUT(callBack) {
    baseRequest('DELETE', BASE_URL + JIRA_API_LOGIN, null, callBack);
}

function JIRA_LOGIN(source, callBack) {
    baseRequest('POST', BASE_URL + JIRA_API_LOGIN, source , callBack);
}

function JIRA_PROJECT(callBack) {
    baseRequest('GET', BASE_URL+'/rest/api/2/project', null , callBack);
}

function JIRA_COMPONENTS(project, callBack) {
    baseRequest('GET', BASE_URL+'/rest/api/2/project/'+project+'/'+'components', null , callBack);
}

// Base method for making http requests with these params:
// @Param String action: type of http request: GET, POST, DELETE, MKCOL.
// @Param String url: request url;
// @Param String source: stringified json object;
// @Param function response: a response handler;
var baseRequest = function(type, url, source, callBack){
    if (xhr){
        xhr.open(type, url, true);

        // setting headers
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8"); // or just application/json
        xhr.onreadystatechange = function() {           //Call a function when the state changes.
            if (xhr.readyState == 4 ){
                console.dir(xhr.response);
                console.dir(callBack);
                callBack(xhr.status, xhr.response);
            }
        }
        try { xhr.send(source);} catch(e){ Console.dir(e); }
    }
}

function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}