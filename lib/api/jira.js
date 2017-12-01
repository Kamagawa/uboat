// Author: Eugene Wang
const JIRA_API_POST_ISSUE = 'https://jira.bbqnx.net/rest/api/2/issue';
const JIRA_API_GET_USER = 'https://jira.bbqnx.net/rest/api/2/myself';
const JIRA_API_GET_OTHER = '';

// Get User
function JIRA_GET_USER(callBack){
    baseRequest('GET', JIRA_API_GET_USER, null, {200:'(L)', 401:'Unauthorized'}, callBack);
}

//Post issue
function JIRA_CREATE_ISSUE(source, callBack){
    baseRequest('POST', JIRA_API_POST_ISSUE, source, {201:'(L)'}, callBack);
}