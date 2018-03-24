function suggest(){
    var word = document.getElementById("qs").value.toUpperCase();
    var list;
    var xhr2 = new XMLHttpRequest();
    var method2 = "GET";
    var url2 = "http://localhost:3000/suggestion/"+word;   
    xhr2.open(method2, url2, true);
    xhr2.onreadystatechange = function () {
    if(xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
        console.log(xhr2.responseText);
        list = JSON.parse(xhr2.responseText);
        }
    var s="<ul id = \"list\"><em><b>";
    for (word in list){
        s+= "<li  id =\""+word+"\""+"onclick=\""+"select("+word+")"+"\""+">"+list[word] +"</li>";
    }
    s+="</b></em></ul>"
    document.getElementById("p2").innerHTML = s;
    document.getElementById("list").style.display="block";
    };
    xhr2.send()
}
function select(id){
    var val = document.getElementById(id).innerHTML;
    document.getElementById("qs").value = val;
    
    nav();
}
function nav(){
    document.getElementById("list").style.display="none";
    var word = document.getElementById("qs").value.toUpperCase();

    var xhr = new XMLHttpRequest();
    var method = "GET";
    var url = "http://localhost:3000/dictionary/"+word;   
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
            
        