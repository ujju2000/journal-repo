//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ujjutarika35:Test123@cluster0.ublufxm.mongodb.net/dailyJournalDB');

const dailyJournal = mongoose.Schema({
  title : String,
  post : String
})


const Journal = mongoose.model("Journal" , dailyJournal);

const homeStartingContent = "Click on Compose to write your Daily Journal";

// const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let generalInfo= [];

app.get('/posts/:post', (req,res) => {
  let postParam = req.params.post;

  Journal.findOne({title : postParam}).then((userPost) => {
    
    res.render('post', {postInfo : userPost});
  }).catch((err) => console.log("not fetcing info"));

})

app.post('/compose' , (req,res) => {
  let userTitle = req.body.title;
  let userPost = req.body.post;

  userInfo = {
    title  : userTitle,
    post : userPost
  }
  let journal  = new Journal({
    title : userTitle,
    post : userPost
  })
  generalInfo.push(userInfo);
  // console.log(generalInfo);
  journal.save();

  res.redirect('/');

})
app.get('/compose', (req,res) => {
  res.render("compose");
})

app.get('/compose' , (req,res) => {
  res.render('compose');
})

app.get('/about', (req,res) => {
  res.render('about');
})

app.get("/" , (req,res) => {
  Journal.find({}).then((foundJournal) => {
    res.render("home",  {homePara : homeStartingContent, postArray : foundJournal}); 
  }).catch((err) => console.log(err));
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
