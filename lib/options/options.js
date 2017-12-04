
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

var onLogin=(status, response)=>{
    if (satus == 200){
        getSession(response);
    } else {
        alert('login Error');
    }
}

// weird logging does not work well
var setSession=()=>{
    let username = $('#in_username').val();
    let password = $('#in_password').val();
    JIRA_LOGIN(JSON.stringify({'username':username,'password':password}), onLogin);
}

//{200:'(L)', 401:'Unauthorized'}
var sessionGOT=(status, data)=>{
    if (data == null) {return} 
    else if (status == 200 ){    
        console.log('onSessionValid' + data);
        console.log(data.key);
        $('#displayName').text(', '+data.displayName);
        $('#out_username').text(data.key);
        $('#userImage').attr('src', data.avatarUrls["48x48"]);
        if (!logged){
            action();
            logged = true;
        }
    } else if (status == 401) {
        alert ('Unauthorized');
    } else {
        alert ('error');
    }
}

var sessionVoid =(status, response)=>{
    if (status = 204){
        if (logged){
            $('#notif').attr('display', 'show');
            action();
            isLoggingScreen = false;
        }
    } else {
        alert(response);
    }    
}
