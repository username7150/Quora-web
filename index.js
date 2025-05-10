const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set ("views" , path.join(__dirname, "views"));

app.use (express.static(path.join(__dirname, "public")));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));



let posts =[
    {username : "apna college" ,
    content : "i love coding" ,
    id: uuidv4()
    },

    {username : "shradha didi ",
    content : "bahut acchhaa pdhati hain coding",
    id:uuidv4()

    },

    {username : "Arun singh",
    id: uuidv4(),
    content : " i am a student of didi , who follows the batch of shradha didi" 
        }
]

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
   
})

app.listen ( port, ()=>{
    console.log("listening in the port : 8080");

});

app.get("/posts/new", (req,res)=>{
    res.render("form.ejs");
});

app.post("/posts", (req, res) => {
    console.log(req.body);
    let {username , content }= req.body;
    let id =uuidv4();
    posts.push({username , content,id});
    res.redirect("http://localhost:8080/posts");
   
});

app.get("/posts/:id", (req, res) => {
    
    let {id}= req.params;
    let post =posts.find((p)=> id ===p.id);
    res.render("show.ejs", {post});
    console.log(post);
});


app.get("/posts/:id/edit", (req, res) => {
    
    let {id}= req.params;
    let post =posts.find((p)=> id ===p.id);
    res.render("form2.ejs", { post });
    console.log(post);
});


app.patch( "/posts/:id", (req, res)=>{
    let { id }= req.params; 
    let newcontent=req.body.likhacontent
    console.log(newcontent);
    let post =posts.find((p)=> id ===p.id);
    post.content=newcontent;
    res.redirect("/posts");
    console.log(post);
    
    
});


app.delete("/posts/:id" ,(req,res)=>{
    let {id}= req.params;
    posts =posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
})