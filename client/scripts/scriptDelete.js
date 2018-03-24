function setCookie(cname,cval){
    document.cookie = cname +"="+cval;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
console.log("hello "+getCookie("username"));

function redirect(){
    if(getCookie("username") == ""){
        window.location = "http://localhost:3000/login";
    }
}

function del(){
    var utoken;
    var uname = getCookie("username");
    var token;
    var xhr2 = new XMLHttpRequest();
    var method2 = "GET";
    var url2 = "http://localhost:3000/tokens/"+uname; 
    if (uname == ""){window.location = "http://localhost:3000/login"}
    else{  
    xhr2.open(method2, url2, true);
    xhr2.onreadystatechange = function () {
    if(xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
        console.log(xhr2.responseText);
        utoken = xhr2.responseText;
        token = getCookie("token");
        console.log(uname);
        console.log(token);
    
        if (token == utoken)
        {
            console.log("valid");
            deleteWord()
        }
        else{
            window.location = "http://localhost:3000/login"
        }
        
        }
    };

    xhr2.send();
}
}
function deleteWord(){
var word = document.getElementById("word").value;
var xhr = new XMLHttpRequest();
var method = "GET";
var url = "http://localhost:3000/delete/"+word.toUpperCase();   
xhr.open(method, url, true);
xhr.onreadystatechange = function () {
if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText);
    document.getElementById("p").innerHTML = xhr.responseText;
    }
};
xhr.send();


console.log(url);

}
            
            
            
            
            
        