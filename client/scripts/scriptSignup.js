function signup(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var xhr = new XMLHttpRequest();
    var method = "GET";
    var url = "http://localhost:3000/signup/"+email+"/"+password; 
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