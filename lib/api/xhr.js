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
                callBack(xhr.status, raw_result);
            }
        }
        try { xhr.send(source);} catch(e){ Console.dir(e); }
    }
}
