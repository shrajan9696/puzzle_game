const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const url = require('url');




const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Quotopedia24:shrajanjain@cluster0.6x9bzfs.mongodb.net/Puzzle_game");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    score: Number
});



const User = mongoose.model("User", userSchema);



let score = 0;
let user_email = '';
let highest_score = 0;

// get route for login

app.get("/login", function (req, res) {
    res.render("login");
})

// get route for signup

app.get("/signup", function (req, res) {
    res.render("signup");
})


// get route for admin

app.get("/admin", function (req, res) {
    res.render("admin");
})

//post route for signup

app.post('/signup', (req, res) => {



    const email = req.body.email;
    const pass = req.body.password;
    User.findOne({ email: email }).then((data) => {
        if (data == null) {
            const obj = new User({
                email: email,
                password: pass,
                score: 0
            });



            obj.save().then((data) => {
                user_email = data.email;
                highest_score = data.score;
                res.render("game1", { email: data.email, score: data.score });
            }).catch(err => console.log(err));
        }
        else {

            res.write("<h1>given email alreday exist</h1>")
            res.send();
        }
    }).catch(err => console.log(err));
})


// post route for login

app.post('/login', (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    User.findOne({ email: email, password: pass }).then((data) => {


        if (data == null) {

            res.write("wrong credentials");
            res.send();
        }
        else {
            // console.log(data);
            user_email = data.email;
            highest_score = data.score;
            res.render("game1", { email: data.email, score: data.score });
        }

    })

})

// get route for game2

app.get("/game2", function (req, res) {
    score++;
    res.render("game2", { email: user_email, score: highest_score });
});


// get route for quiz1

app.get('/quiz1', function (req, res) {
    score++;
    res.render("quiz1", { email: user_email, score: highest_score });

})

//get route for quiz2

app.get('/quiz2', function (req, res) {
    score++;
    res.render("quiz2", { email: user_email, score: highest_score });
})

// get route for quiz3

app.get('/quiz3', function (req, res) {
    score++;
    res.render("quiz3", { email: user_email, score: highest_score });
})

//get route for quiz4

app.get('/quiz4', function (req, res) {
    score++;
    res.render("quiz4", { email: user_email, score: highest_score });
})

//get route for quiz1

app.post('/quiz1', function (req, res) {

    let answer = (req.body.answer);
    if (answer === "Football") {

        res.redirect('/quiz2');


    }
    else {

        res.redirect('/endGame?valid=' + 2);



    }
})

// post route for quiz2

app.post('/quiz2', function (req, res) {

    let answer = (req.body.answer);
    if (answer === "red") {

        res.redirect('/quiz3');

    }
    else {

        res.redirect('/endGame?valid=' + 3);




    }
})


// post route for quiz3

app.post('/quiz3', function (req, res) {

    let answer = (req.body.answer);
    if (answer === "Virat") {
        res.redirect('/quiz4');

    }
    else {

        res.redirect('/endGame?valid=' + 4);



    }
})

// post route for quiz4

app.post('/quiz4', function (req, res) {

    let answer = (req.body.answer);
    if (answer === "4") {

        User.updateOne({ email: user_email }, { $set: { score: 6 } }).then((data) => {

            res.render("end", { header: "Congratulations you have passed all levels", score: 6 });
        }


        ).catch(err => console.log(err));
    }
    else {

        console.log("redirected");
        res.redirect('/endGame?valid=' + 5);



    }
})

//post route for admin

app.post('/dashboard', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email === "jainshrajan482@gmail.com" && password === "admin@1234") {

        User.find({}).then((data) => {

            res.render("dashboard", { details: data });
        }).catch(err => console.log(err));
    }
    else res.send("invalid credentials");

})

// post route for endgame

app.get('/endgame', function (req, res) {
    var passedVariable = req.query.valid;

    let hs = 0;
    console.log(user_email);
    User.findOne({ email: user_email }).then(data => {

        hs = data.score;
        if (passedVariable > hs) {
            User.updateOne({ email: user_email }, { $set: { score: passedVariable } }).then((data) => {

                res.render("end", { header: "Wrong Answer Your Progress has been stored", score: passedVariable });
            }


            ).catch(err => console.log(err));
        }
        else {
            res.render("end", { header: "Wrong Answer Your Progress has been stored", score: passedVariable });
        }

    }).catch(err => console.log(err));






})

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("server has started successfully");
});