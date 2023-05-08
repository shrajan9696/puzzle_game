const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const url = require('url'); 
var player = require('play-sound')(opts = {})

// var music = require('./public/audio/success.mp3');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://Quotopedia24:shrajanjain@cluster0.6x9bzfs.mongodb.net/Puzzle_game");

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    score: Number
  });
  
  
  
  const User = mongoose.model("User",userSchema);



let score = 0;
let user_email = '';
let highest_score = 0;


app.get("/login",function(req,res){
    res.render("login");
   })

app.get("/signup",function(req,res){
    res.render("signup");
})

app.post('/signup',(req,res) =>{
   


    const email = req.body.email;
    const pass = req.body.password;
    User.findOne({email:email}).then((data)=>{
        if(data==null){
            const obj = new User ({
                email: email,
                password: pass,
                score: 0 
            });
             
         
             
         obj.save().then((data)=>{
            user_email = data.email;
            highest_score = data.score;
            res.render("game1",{email:data.email,score:data.score});
         }).catch(err=> console.log(err));
        }
        else{
            // console.log("Given email already exists");
            res.write("<h1>given email alreday exist</h1>")
            res.send();
        }
    }).catch(err=>console.log(err));
})


app.post('/login',(req,res)=>{
    const email = req.body.email;
    const pass = req.body.password;
    User.findOne({email:email,password:pass}).then((data)=>{
       
      
        if(data ==null){
            // console.log("wrong credentials");
            res.write("wrong credentials");
            res.send();
        }
        else{
            // console.log(data);
            user_email = data.email;
            highest_score = data.score;
            res.render("game1",{email:data.email,score:data.score});
        }
        
    })
   
})




app.get("/",function(req,res){

    User.find({}).then(data => console.log(data)).catch(err=> console.log(err));
    
    res.render("game1",{score:score,header:`Welcome`});
});

app.get("/game2",function(req,res){
    score++;
    res.render("game2",{email:user_email,score:highest_score});
});

app.get('/quiz1',function(req,res){
    score++;
    res.render("quiz1", {email:user_email,score:highest_score});

})

app.get('/quiz2',function(req,res){
    score++;
    res.render("quiz2",  {email:user_email,score:highest_score});
})

app.get('/quiz3',function(req,res){
    score++;
    res.render("quiz3",  {email:user_email,score:highest_score});  
})

app.get('/quiz4',function(req,res){
    score++;
    res.render("quiz4",  {email:user_email,score:highest_score});  
})

app.post('/quiz1',function(req,res){
   
    let answer = (req.body.answer);
    if(answer === "Football"){
        player.play('./public/audio/success.mp3', function(err){
            if (err) console.log(err);
            else  res.redirect('/quiz2');
          })
      
    }
    else{
        player.play('./public/audio/failure.mp3', function(err){
            if (err) console.log(err);
            else {
                console.log("redirected");
                res.redirect('/endGame?valid=' + 2);
            }
          })

       
    }
})

app.post('/quiz2',function(req,res){

    let answer = (req.body.answer);
    if(answer === "red"){
        player.play('./public/audio/success.mp3', function(err){
            if (err) console.log(err);
            else  res.redirect('/quiz3');
          })
    }
    else {
        player.play('./public/audio/failure.mp3', function(err){
            if (err) console.log(err);
            else {
                // console.log("redirected");
                res.redirect('/endGame?valid=' + 3);
            }
          })
           
        
    }
})

app.post('/quiz3',function(req,res){

    let answer = (req.body.answer);
    if(answer === "Virat"){
        player.play('./public/audio/success.mp3', function(err){
            if (err) console.log(err);
            else  res.redirect('/quiz4');
          })
    }
    else {
        player.play('./public/audio/failure.mp3', function(err){
            if (err) console.log(err);
            else {
                // console.log("redirected");
                res.redirect('/endGame?valid=' + 4);
            }
          })
           
        
    }
})

app.post('/quiz4',function(req,res){

    let answer = (req.body.answer);
    if(answer === "4"){
        player.play('./public/audio/success.mp3', function(err){
            if (err) console.log(err);
            else  {
                User.updateOne({email:user_email},{$set:{score:6}}).then((data)=>{
                    // console.log(user_email);
                    // console.log("updated");
                    res.render("end",{header:"Congratulations you have passed all levels",score:6});
                }
            
            
                ).catch(err=>console.log(err));
            }
          })
    }
    else {
        player.play('./public/audio/failure.mp3', function(err){
            if (err) console.log(err);
            else {
                console.log("redirected");
                res.redirect('/endGame?valid=' + 5);
            }
          })
           
        
    }
})


app.get('/dashboard',function(req,res){

})
app.get('/endgame',function(req,res){
    var passedVariable = req.query.valid;
    // console.log(passedVariable);
   let hs = 0;
   console.log(user_email);
    User.findOne({email:user_email}).then(data => {
        // console.log("came");
        //  console.log(data);
          hs = data.score;
          if(passedVariable>hs){
            User.updateOne({email:user_email},{$set:{score:passedVariable}}).then((data)=>{
                // console.log(user_email);
                // console.log("updated");
                res.render("end",{header:"Wrong Answer Your Progress has been stored",score:passedVariable});
            }
        
        
            ).catch(err=>console.log(err));
        }
        else{
            res.render("end",{header:"Wrong Answer Your Progress has been stored",score:passedVariable});
        }
        
        } ).catch(err => console.log(err));


        //   
   
     
   
})

app.listen(3000,function(){
    console.log("server has started successfully");
  });