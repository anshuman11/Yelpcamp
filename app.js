//APP CONFIG
var express   =  require("express"),
    bodyparser=  require("body-parser"),
    mongoose  =  require("mongoose"),
    app       =  express(),
    methodOverride=require("method-override");
    mongoose.connect("mongodb://localhost/restful_blog_app");
   // mongoose.set('useFindAndModify', false);
    app.set("view engine","ejs");
    app.use(express.static("public"));
    app.use(bodyparser.urlencoded({extended:true}));
    app.use(methodOverride("_method"));
    //MONGOOSE CONFIG
    var blogSchema=new mongoose.Schema({
        title:String,
        image:String,
        body:String,
        created:{type:Date,default:Date.now} 
    });
    var Blog=mongoose.model("Blog",blogSchema);
   /* Blog.create({
        title:"TEST BLOG",
        image:"data:image/jpeg;base64,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",
        body:"THIS IS A CUTE POMRENIAN DOG"
    });*/
    //ROUTES
    app.get("/",function(req,res){
        res.redirect("/blogs");
    });
    //INDEX ROUTE
    app.get("/blogs",function(req,res){
        Blog.find({},function(err,blogs){
            if(err){
                console.log(err);
            }
            else
            {
                res.render("index",{blogs:blogs});
            }
        })
        
    });
    //NEW ROUTE
    app.get("/blogs/new",function(req, res) {
        res.render("new");
    })
    //CREATE ROUTE
    app.post("/blogs",function(req,res){
        Blog.create(req.body.blog,function(err,newBlog){
           if(err){
               console.log("ERROR!!!");
           } 
           else{
               res.redirect("/blogs");
           }
        })
    })
    //SHOW ROUTE
    app.get("/blogs/:id",function(req, res){
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
                res.redirect("http://www.bundesliga.com");
            }
            else{
                res.render("show",{blog:foundBlog});
            }
        })
    });
    //EDIT ROUTE
    app.get("/blogs/:id/edit",function(req, res) {
            Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
              res.redirect("http://www.bundesliga.com");
            }
            else{
                res.render("edit",{blog:foundBlog});
            }
        })
    })
    //UPDATE ROUTE
    app.put("/blogs/:id",function(req,res){
        Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
            if(err){
              res.redirect("http://www.bundesliga.com");
            }
            else{
                res.redirect("/blogs/" + req.params.id);
            }
        })
    })
    //DELETE ROUTE
    app.delete("/blogs/:id",function(req,res){
        Blog.findByIdAndRemove(req.params.id,function(err){
            if(err){
              res.redirect("http://www.bundesliga.com");
            }
            else{
                res.redirect("/blogs");
            }
        })
    })
    app.listen(process.env.PORT,process.env.IP,function(){
        console.log("SERVER IS RUNNING!!!");
    });
    