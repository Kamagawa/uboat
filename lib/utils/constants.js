'use strict';

const JIRA_GET_USERAUTH = '';


function Questions(proj, type, sum, desc, components){
    this.fields.project.key = proj;
    this.fields.type = type;
    this.fields.summary = sum;
    this.fields.description = desc;
    this.fields.issuetype = { id :"1" };
    this.fields.components = [{ "id": "30057" }],
    this.fields.customfield_10108 = { "id": "10208" },
    this.fields.customfield_14000 = [{ "id": "16871" }]
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

