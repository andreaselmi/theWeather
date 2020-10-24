import "./style.scss";
import $ from 'jquery';
import _ from 'lodash';
import axios from 'axios';

const meteoKey = process.env.METEO_API_KEY;
const meteoUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const iconUrl = "http://openweathermap.org/img/wn/";
const iconCode = "@2x.png";

const city = $(".city");
const info = $(".main__info");
const form = $(".form");
const form__field = $(".form__field");


const getData = async (city) => {
  try {
    let resp = await axios.get(`${meteoUrl}${city}&units=metric&appid=${meteoKey}&lang=it`);
    console.log(resp.data);
    displayResult(resp);
  } catch (err) {
    removeChild()
    switch (err.response.status) {
      case 400:
        info.append(`<h3> Controlla la sintassi </h3>`);
        break;
      case 404:
        info.append(`<h3> Nessun risultato trovato</h3>`);
        break;
      default:
        info.append(`<h3>Il servizio potrebbe non essere disponibile</h3>`);
    };
  }
};

function displayResult(res) {
  removeChild();
  form__field.val("");

  let cityName = _.get(res, "data.name", "Non disponibile");
  let weatherDesc = _.get(res, "data.weather[0].description", "Non disponibile");
  let icon = res.data.weather[0].icon;
  city.append(`<h1>${cityName}</h1>`);
  city.append(`<h3>${weatherDesc}</h3>`);
  city.append(`<img>`);
  $(".city img").attr("src", `${iconUrl}${icon}${iconCode}`);
}

function removeChild() {
  city.children().remove();
  info.children().remove();
}

//listener
form.submit((e) => {
  e.preventDefault();
  (getData(form__field.val()));
});

//all'apertura carica Roma
getData("roma,it");