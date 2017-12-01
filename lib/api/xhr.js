/* Author: Eugene Wang
 *
 * 
 * 
 * 
 * 
 */

// preflight
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';

// Base method for making http requests with these params: 
// @Param String action: type of http request: GET, POST, DELETE, MKCOL.
// @Param String url: request url;
// @Param String source: stringified json object;
// @Param function response: a response handler;
var baseRequest = function(type, url, source, response, callBack){
    if (xhr){
        xhr.open(type, url, true);
        
        // setting headers
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8"); // or just application/json
        xhr.onreadystatechange = function() {           //Call a function when the state changes.
            if (xhr.readyState == 4 ){
                var res = response[xhr.status];
                let raw_result = xhr.response;
                console.dir(res + ': ' + raw_result);
                if (res == '(L)' ){
                    console.log('call Success');
                    callBack(raw_result);
                }
            } else {
                //console.log ('sending stage: ' + xhr.readyState);
            }
        }
        try { xhr.send(source);} catch(e){ Console.dir(e); }
    }
}
