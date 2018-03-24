function setCookie(cname,cval){
    document.cookie = cname +"="+cval;
}
setCookie("username","");
setCookie("token","");
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

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var xhr = new XMLHttpRequest();
    var method = "GET";
    var url = "http://localhost:3000/login/"+email+"/"+password;   
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
        
        document.getElementById("p").innerHTML = xhr.responseText;
        var text = xhr.responseText.split(';');
        if (text[0]=="http://localhost:3000/dictionary"){
            setCookie("username",text[1]);
            setCookie("token",text[2]);
            console.log(document.cookie);
            window.location = "http://localhost:3000";}
        }
    };
    xhr.send();
}