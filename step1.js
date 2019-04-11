var express = require ("express");
const fetch = require("node-fetch");
const inquirer = require('inquirer')
var step2 = require('./step2.js')
var prompt = inquirer.createPromptModule();
var app = express();
var fs = require('fs')
app.set("view engine","ejs");
app.set("views","./views");
var u = 0;
app.listen(process.env.PORT || 3000);
var question = [{
  type :'input',
  message :'pick a username plz',
  name :  "username"
},
{
  type :'input',
  name :'numberOfQuestions',
  message :'Numbers of questions ?'
},
{
  type : 'list',
  name : 'quizCategory',
  message : 'Pick your poison',
  choices :['General Knowledge',
             'Entertainment: Books',
             'Entertainment: Film' ,
   'Entertainment: Music',
   'Entertainment: Musicals & Theatres' ,
   'Entertainment: Television' ,
 'Entertainment: Video Games' ,
       'Entertainment: Board Games',
     'Science & Nature' ,
   'Science: Computers' ,
   'Science: Mathematics',
     'Mythology' ,
     'Sports',
   'Geography',
   'History',
     'Politics',
     'Art',
   'Celebrities',
     'Animals',
   'Vehicles' ,
 'Entertainment: Comics',
     'Science: Gadgets' ,
   'Entertainment: Japanese Anime & Manga',
     'Entertainment: Cartoon & Animations', ]
}]
prompt(question).then(function(answers){
  var url = '';
  console.log(`Hi ${answers['username']}!`);
 console.log(`${answers['numberOfQuestions']} questions pending...`)
  for( i = 0 ; i <= 24 ; i++){
    if(question[2].choices[i] === answers['quizCategory'])
    {
       u = i+9;
         break;
    }}
  url = 'https://opentdb.com/api.php?amount='+answers['numberOfQuestions']+'&category='+u+'&difficulty=medium&type=multiple'
  step2(url,answers['numberOfQuestions'],answers['quizCategory'],answers['username'])
})
