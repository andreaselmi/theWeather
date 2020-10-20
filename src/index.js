import "./style.scss";
import $ from 'jquery';
import _ from 'lodash';


$("h1").text("me la suchi").css({
  "color": "red"
});

const prova = process.env.PROVA;

console.log(prova);

let arr = ['Another', 'module', 'loaded!'];
console.log(_.join(arr, " "));