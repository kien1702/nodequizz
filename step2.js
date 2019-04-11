var express = require ("express");
const fetch = require("node-fetch");
const inquirer = require('inquirer')
var prompt = inquirer.createPromptModule();
var fs = require('fs')
var e = 0;
function mulc(a,x,y){
  [a[x], a[y]] = [a[y], a[x]]
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

module.exports = function run(url,a,b,name){
fetch(url).then(function(res) {
  return res.json();
})
.then(function(data){
  var questions = [];
  for(i=0; i < a ; i++){
    var answer = [];
     data.results[i].question= data.results[i].question.replace(/&quot;/g,'"');
  data.results[i].question= data.results[i].question.replace(/&#039;/g,'*');
  for(j= 0 ; j <= 3 ; j++){
    answer[j] = data.results[i].incorrect_answers[j];
     answer[3] = data.results[i].correct_answer;
       if(answer[j] === data.results[i].correct_answer){
       var correct = answer[j];
       }

  }
  mulc(answer,getRandomInt(2),3);
 questions[i] = {
    type:'list',
    choices :answer,
     name: ''+i,
    message: data.results[i].question,
    correct : data.results[i].correct_answer,
}

}
prompt(questions).then(function(answer) {
for(i= 0 ; i< a ; i++){
  if(answer[i] === questions[i].correct){
    e++;
  }
}
console.log(name + '   got  '+ e + '  points');
})
var save = {
  username : name,
  category : b,
  numberOfQuestions : a,
  score : e,
}
  fs.writeFile('username/'+name +'.json',JSON.stringify(save));
})}
