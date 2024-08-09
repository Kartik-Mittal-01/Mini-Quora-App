const express = require("express");
const app = express();
const port = 8081;

const path = require("path");
app.use(express.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname , "/public")));

const { v4: uuidv4 } = require('uuid');

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

 

let posts = [
    
]


app.get("/posts", (req, res) => {
    res.render("index", { posts: posts }); // Pass the posts array here
});
app.get("/posts/new", (req, res) => {
    res.render("new"); // Pass the posts array here
});

app.post("/posts",(req,res)=>{
    const {username , content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
    
})


app.get("/posts/:id", (req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id===p.id);
    
    res.render("show.ejs",{post});
})
// to update any post 
app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content= newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit",{post});
    
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});









app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});




