import "./style.scss";
import $ from 'jquery';
import _ from 'lodash';


$("h1").text("prova prova prova").css({
  "color": "red"
});

const prova = process.env.PROVA;

console.log(prova);

let arr = ['Another', 'module', 'loaded!'];
$("body").append("<p>" +
  _.join(arr, " ") +
  "</p>");