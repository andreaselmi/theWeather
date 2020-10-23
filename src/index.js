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





const meteoKey = process.env.METEO_API_KEY;
const iconUrl = "http://openweathermap.org/img/wn/";

//example code icon 10d@2x.png

console.log(meteoKey);