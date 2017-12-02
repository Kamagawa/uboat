
var action = function () {$('form').animate({height: "toggle", opacity: "toggle"}, "slow")};
var firstRun = true;
var logged = false;

$(function(){   
   $('#auth').click(setSession);
   $('#rem').click(setSession);
   getSession();
})

var getSession = function(data){
    console.log('Gotsess');
    console.dir(data);
    //alert(JSON.stringify(data));
    JIRA_GET_USER(sessionGOT);
}

var voidSession = function(){
    JIRA_LOGOUT(sessionVoid);
}

// weird logging does not work well
var setSession=()=>{
    let username = $('#in_username').val();
    let password = $('#in_password').val();
    JIRA_LOGIN(JSON.stringify({'username':username,'password':password}), getSession);
}

var sessionGOT=(data)=>{
    if (data == null) {return};
    console.log('onSessionValid' + data);
    console.log(data.key);
    $('#displayName').text(', '+data.displayName);
    $('#out_username').text(data.key);
    $('#userImage').attr('src', data.avatarUrls["48x48"]);
    if (!logged){
        action();
        logged = true;
    }
}

var sessionVoid =()=>{
    if (logged){
        $('#notif').attr('display', 'show');
        action();
        isLoggingScreen = false;
    }
}
