// Author: Eugene Wang
const BASE_URL = 'https://jira.bbqnx.net'
const JIRA_API_POST_ISSUE = 'https://jira.bbqnx.net/rest/api/2/issue';
const JIRA_API_GET_USER = 'https://jira.bbqnx.net/rest/api/2/myself';
const JIRA_API_LOGIN = '/rest/auth/1/session';

// Get User
function JIRA_GET_USER(callBack){
    baseRequest('GET', JIRA_API_GET_USER, null, {200:'(L)', 401:'Unauthorized'}, callBack);
}

//Post issue
function JIRA_CREATE_ISSUE(source, callBack){
    baseRequest('POST', JIRA_API_POST_ISSUE, source, {201:'(L)'}, callBack);
}

function JIRA_LOGOUT(callBack) {
    baseRequest('DELETE', BASE_URL + JIRA_API_LOGIN, null, {204:'(L)'}, callBack);
}

function JIRA_LOGIN(source, callBack) {
    baseRequest('POST', BASE_URL + JIRA_API_LOGIN, source, {200:'(L)'}, callBack);
}