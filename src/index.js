import "./style.scss";
import $ from 'jquery';
import _ from 'lodash';

//import single image

//import './icon/cloudy.png';
//import './icon/sunny.png';

//import image dynamically
const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(
  require.context("./icon", false, /\.(png|jpe?g|svg)$/)
);





/*$("h1").text("prova prova prova").css({
  "color": "red"
});*/

const prova = process.env.PROVA;

console.log(prova);

/*let arr = ['Another', 'module', 'loaded!'];
$("body").append("<p>" +
  _.join(arr, " ") +
  "</p>");*/