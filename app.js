const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require("./models/user.js");
const saltRounds = 10;
let loginSuccess = false
require('dotenv').config();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(process.env.DBURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("useCreateIndex", true);

//GETS
app.get('/home',authenticated,async (req,res) => {
  res.render('course')
})

app.get('/signup',async (req,res) => {
  res.render('signup')
})

app.get('/login',async (req,res) => {
  res.render('login')
})

//POSTS

app.post("/login", async(req, res) => {
  try{
    const user = await User.findOne({username:req.body.username})
    const hashedPass =  await bcrypt.compare(req.body.password, user.password)
    console.log(hashedPass);
    if(hashedPass){
      loginSuccess = true
      res.redirect('/home')
    }else{
      res.redirect('/login')
    }
  }catch(err){
    console.log(err);
    res.redirect('back')
  }
});

app.post("/signup", async (req, res) => {
  try{
    await User.create({
      username: req.body.username,
      email:req.body.email,
      gender:req.body.gender,
      password: await bcrypt.hash(req.body.password, saltRounds)
    })
    console.log('here');
    loginSuccess = true
    res.redirect("/home");
  }catch(err){
    console.log(err);
    res.redirect('back')
  }
});

app.listen(3000, () => { 
  console.log("Server is up on port 3000");
});

function authenticated(req, res, next) {
  if (loginSuccess) {
    next();
  } else {
    res.redirect('/login');
  }
}