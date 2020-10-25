//webpack
import "./style.scss";
import $ from 'jquery';
import _ from 'lodash';
import axios from 'axios';

//import all icons
const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(
  require.context("./icons", false, /\.(png|jpe?g|svg)$/)
);
//end import webpack

//API
const meteoKey = process.env.METEO_API_KEY;
const meteoUrl = "http://api.openweathermap.org/data/2.5/weather?";

//DOM
const city = $(".city");
const info = $(".main__info");
const form = $(".form");
const form__field = $(".form__field");
const location = $(".hi-icon-location")

//get data from server
const getData = async (city) => {
  try {
    let resp = await axios.get(`${meteoUrl}q=${city}&units=metric&appid=${meteoKey}&lang=it`);
    displayResults(resp);
  } catch (err) {
    removeChild()
    displayErrors(err)
  }
};

const getDataFromPosition = async (position) => {
  try {
    let resp = await axios.get(position);
    displayResults(resp);
  } catch (err) {
    removeChild()
    displayErrors(err)
  }
};

//display results
function displayResults(res) {
  removeChild();
  form__field.val("");
  let noResult = "Non disponibile";

  //save results
  //results city header
  let cityName = _.get(res, "data.name", noResult);
  let weatherDesc = _.get(res, "data.weather[0].description", noResult);
  let icon = _.get(res, "data.weather[0].icon", "404");
  city.append(`<h1>${cityName}`);
  city.append(`<h3>${weatherDesc}`);
  city.append(`<img>`);
  $(".city img").attr("src", `icons/${icon}.png`);

  //results main__info
  let state = _.get(res, "data.sys.country", noResult);
  let temperature = _.get(res, "data.main.temp", noResult);
  let humidity = _.get(res, "data.main.humidity", noResult);
  let tempMin = _.get(res, "data.main.temp_min", noResult);
  let tempMax = _.get(res, "data.main.temp_max", noResult);
  let wind = _.get(res, "data.wind.speed", noResult);
  let windDirection = _.get(res, "data.wind.deg", noResult);
  let sunrise = (res.data.sys.sunrise) ? new Date((res.data.sys.sunrise * 1000)) : noResult;
  let sunset = (res.data.sys.sunset) ? new Date(res.data.sys.sunset * 1000) : noResult;


  info.append(`<h3>${cityName}, ${state}`)
    .append(`<p> Temperatura: ${temperature}° (min ${tempMin}° - max ${tempMax}°)`)
    .append(`<p> Umidità: ${humidity}%`)
    .append(`<p> Vento: ${wind}m/s - Direzione: ${windDirection}°`)
    .append(`<p>Alba: ${sunrise}`).append(`<p>Tramonto: ${sunset}`);

}
//end display displayResults

//display errors
function displayErrors(err) {
  removeChild();
  city.append(`<img>`);
  $(".city img").attr("src", `icons/404.png`);
  switch (err.response.status) {
    case 400:
      info.append(`<h3> Digita un nome di città valido </h3>`);
      break;
    case 404:
      info.append(`<h3> Nessun risultato trovato</h3>`);
      break;
    default:
      info.append(`<h3>Il servizio potrebbe non essere disponibile</h3>`);
  };
}
//end display errors

//clean display
function removeChild() {
  city.children().remove();
  info.children().remove();
}

//listener
form.submit((e) => {
  e.preventDefault();
  (getData(form__field.val()));
});

//geolocation
function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  position = meteoUrl + "lat=" + latitude + "&lon=" + longitude + "&units=metric" + "&appid=" + meteoKey + "&lang=it";
  console.log(position)
  getDataFromPosition(position);

}

function error(err) {
  displayError()
};

location.click(function() {
  navigator.geolocation.getCurrentPosition(success, error);
});

//city default
getData("roma,it");