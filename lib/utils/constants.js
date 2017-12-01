'use strict';

const JIRA_GET_USERAUTH = '';


var reviewObject = {
    project: 'Project Name',
    type: 'issue type',
    summary: 'summary',
    desc: 'description',

    title: 'ha',
    author: 'ha',
    time: '',   
    toSend: function(){
        var send_item = {
            'key': project,
        }
        return send_item;
    }
};

var mock_issue_creation = {
    fields: {
        project: { key: "AVNPIM"},
       	summary: "REST Jira Issue Creation Test from Chrome Extension(modal)",
       	description: "Creating of an issue using project keys and issue type names using the REST API",
       	issuetype: { "id": "1" },
       	components: [{ "id": "30057" }],
        customfield_10108: { "id": "10208" },
       	customfield_14000: [{ "id": "16871" }]
   	}
};

var gplayPackage = function(){
    let pkgID = window.location.hash;
    pkgID = pkgID.substring(pkgID.lastIndexOf('=')+1);
    return pkgID;
}();

function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}

