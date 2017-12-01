
var action = function () {$('form').animate({height: "toggle", opacity: "toggle"}, "slow")};
var firstRun = true;
var isLoggingScreen = true;

$(function(){   
   $('#auth').click(setCredentials);
   $('#rem').click(remCredentials);
   getCredentials();
})

var getCredentials = function(){
    // get user from jira browser cookie
    JIRA_GET_USER(ON_JIRA_RETURN_SUCCESS);

    // get user login trace from chrome storage
    chrome.storage.sync.get('user', function(data) {    
        if (data && data.user.username && data.user.password &&
            data.user.username != '' && data.user.password != ''
            && data.user.login == true
        ) {
            console.log('get Login:'+data.user.username+','+data.user.password);
            $('#out_username').text(data.user.username);
            action();
        } else {
            if(!firstRun){
                alert ('Login Failed');
            }
            firstRun = false;
        }
    });
    
}

var ON_JIRA_RETURN_SUCCESS = function(data){
    if (data == null) {return};
    console.log('ON_JIRA_RETURN_SUCCESS' + data);
    console.log(data.key);
    $('#displayName').text(', '+data.displayName);
    $('#out_username').text(data.key);
    $('#userImage').attr('src', data.avatarUrls["48x48"]);
    if (isLoggingScreen){
        action();
        isLoggingScreen = false;
    }
}


var remCredentials = function(){
    userStore('', '');
    if (!isLoggingScreen){
        action();
        isLoggingScreen = true;
    }    
}

var setCredentials = function(){
    userStore($('#in_username').val(), $('#in_password').val());
    getCredentials();
}

var userStore = function(user, pass){
    // verify
    let identifier = false;
    if (!(user=='' && pass=='')){
        identifier = true;
    }

    // create data structure
    var user = {
        username: user,
        password: pass,
        login: identifier
    };

    // store it
   chrome.storage.sync.set({'user': user}, function() {
       console.log('set login:'+user.username+','+user.password);
   });
}

