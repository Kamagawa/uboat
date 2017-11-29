'use strict';
var JIRA_API = 'https://www.google.com';

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

var gplayPackage = function(){
    let pkgID = window.location.hash;
    pkgID = pkgID.substring(pkgID.lastIndexOf('=')+1);
    return pkgID;
}();

