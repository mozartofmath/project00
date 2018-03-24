
var express = require('express');

var mongoc = require('mongodb').MongoClient;
var con = 'mongodb://localhost:27017/Dictionary';


var bcrypt = require('bcrypt-nodejs');

var app = express();
var dict;
var users;
var tokens;

app.get('/',function(req,res){
    res.sendFile(__dirname+'/client/onlineDictionary.html');
});
app.get('/addWord',function(req,res){
    res.sendFile(__dirname+'/client/add.html');
});
app.get('/signup',function(req,res){
    res.sendFile(__dirname+'/client/signup.html');
});
app.get('/login',function(req,res){
    res.sendFile(__dirname+'/client/login.html');
});
app.get('/editWord',function(req,res){
    res.sendFile(__dirname+'/client/editWord.html');
});
app.get('/deleteWord',function(req,res){
    res.sendFile(__dirname+'/client/delete.html');
});


var coll = "dict";
mongoc.connect(con, (err,db)=>{
    console.log("connected dict successfully");
    const collection = db.collection(coll);

    collection.find({}).toArray((err, docs) => {
        
        db.close();
        dict = docs[0];
    
    })
})

var col1 = "users";
mongoc.connect(con, (err,db)=>{
    console.log("connected users successfully");
    const collection = db.collection(col1);

    collection.find({}).toArray((err, docs) => {
        
        db.close();
        users = docs[0];
    
    })
})

var col2 = "tokens";
mongoc.connect(con, (err,db)=>{
    console.log("connected tokens successfully");
    const collection = db.collection(col2);

    collection.find({}).toArray((err, docs) => {
        
        db.close();
        tokens = docs[0];
    
    })
})

app.get("/dictionary/:name",function(req,res){
    if (req.params.name in dict){
    res.send(req.params.name + " : <br>"+dict[req.params.name]);}
    else{res.send(req.params.name + " is not in the dictionary.");}

})

function isAuthenticated(req, res, next){
var a = true;
if(a){return next();}
res.send("Unauthorized: you must login first!");
}

app.get("/add/:name/:definition",isAuthenticated,function(req,res){
    if (req.params.name in dict){res.send("<p style=\" color:red;\">Word already exists</p>")}
    else {dict[req.params.name]=req.params.definition;
    res.send("You have added <b>"+req.params.name + " : "+ dict[req.params.name]+"</b>");}
    
    var coll = "dict";
    mongoc.connect(con, (err,db)=>{
        console.log("connected to dict");
        const collection = db.collection(coll);

        collection.remove();
        collection.insertOne(dict,(err,res)=>{
            if (err){console.log(err);}
            db.close(); 
        });
    });
})

app.get("/edit/:name/:definition",isAuthenticated,function(req,res){
    if (req.params.name in dict){
        dict[req.params.name]=req.params.definition;
    res.send("You have edited <b>"+req.params.name + " : "+ dict[req.params.name]+"</b>");}
    else{res.send("<p style=\" color:red;\">Word doesnot exist</p>")}
    var coll = "dict";
    mongoc.connect(con, (err,db)=>{
        console.log("connected to dict");
        const collection = db.collection(coll);

        collection.remove();
        collection.insertOne(dict,(err,res)=>{
            if (err){console.log(err);}
            db.close(); 
        });
    });
    
    
})
app.get("/delete/:name",isAuthenticated,function(req,res){
    if (req.params.name in dict){
        delete dict[req.params.name];
    res.send("You have deleted <b>"+req.params.name+"</b>");}
    else{res.send("<p style=\" color:red;\">Word doesnot exist</p>")}
    var coll = "dict";
    mongoc.connect(con, (err,db)=>{
        console.log("connected to dict");
        const collection = db.collection(coll);

        collection.remove();
        collection.insertOne(dict,(err,res)=>{
            if (err){console.log(err);}
            db.close(); 
        });
    });
    
    
})

app.get("/suggestion/:word",function(req,res){
    var matches = []
    for (key in dict){
        if (key.toLowerCase().search(req.params.word.toLowerCase()) != -1 && matches.length<=5 ) {matches.push(key)}
    }
    res.send(JSON.stringify(matches));
})
app.get("/tokens/:username",function(req,res){
    res.send(tokens[req.params.username]);
})


app.get("/login/:username/:password",function(req,res){
    if (req.params.username in users && bcrypt.compareSync(req.params.password,users[req.params.username])){
        tokens[req.params.username] = bcrypt.hashSync(bcrypt.genSaltSync(200), bcrypt.genSaltSync(10), null);
        res.send("http://localhost:3000/dictionary;"+req.params.username+";"+tokens[req.params.username]);
        var col2 = "tokens";
        mongoc.connect(con, (err,db)=>{
            console.log("connected to tokens");
            const collection = db.collection(col2);

            collection.remove();
            collection.insertOne(tokens,(err,res)=>{
                if (err){console.log(err);}
                db.close(); 
            });
        });
        //console.log(document.cookie);
    }
    else if(req.params.username in users){res.send("<p style=\" color:red;\">Wrong Password !</p>");}
    else{res.send("<p style=\" color:red;\">Unknown Username!!!<br>If you dont have an accout already, Please <a href = \"http://localhost:3000/signup\">sign up</a>!!!<p style=\" color:red;\">");}
})
app.get("/signup/:username/:password",function(req,res){
    if (req.params.username in users){res.send("<p style=\" color:red;\">Username already exists!</p>");}
    else if(req.params.password.length < 6){res.send("<p style=\" color:red;\">Password has to be atleast 6 characters!</p>");}
    else{
        users[req.params.username] =  bcrypt.hashSync(req.params.password, bcrypt.genSaltSync(5), null);
        tokens[req.params.username] = bcrypt.hashSync(bcrypt.genSaltSync(200), bcrypt.genSaltSync(10), null);
        res.send("You Have successfully signed up!!! ");
    }
    var col1 = "users";
    mongoc.connect(con, (err,db)=>{
        console.log("connected to users");
        const collection = db.collection(col1);

        collection.remove();
        collection.insertOne(users,(err,res)=>{
            if (err){console.log(err);}
            db.close(); 
        });
    });
    var col2 = "tokens";
    mongoc.connect(con, (err,db)=>{
        console.log("connected to tokens");
        const collection = db.collection(col2);

        collection.remove();
        collection.insertOne(tokens,(err,res)=>{
            if (err){console.log(err);}
            db.close(); 
        });
    });
})
console.log("http://localhost/:3000")
app.use(express.static("client"));
app.listen(3000);