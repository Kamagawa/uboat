
//user session
function session(name,pass,log) {
    username = name;
    password = pass;
    login = log;
}

var CHROME_SET_STOREUSER = function(user, pass){
    // verify
    let identifier = false;
    if (!(user=='' && pass=='')){
        identifier = true;
    }

    var user = new session (user, pass, identifier);
    chrome.storage.sync.set({'user': user}, function() {
        console.log('set login:'+user.username+','+user.password);
    });
}


// get user login trace from chrome storage
var CHROME_GET_STOREDUSER = function(){
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