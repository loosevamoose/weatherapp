//Current Time
function applyCurrentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${day} ${hours}:${minutes}`;

  return time;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = applyCurrentTime();

//Temperature
function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#searchCityInput");
  let apiKey = "61b68574f1c816f7a6b6695b8de839a8";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(getTemperature);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "61b68574f1c816f7a6b6695b8de839a8";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(getTemperature);
}

function getLocalInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function getTemperature(response) {
  let dayZeroC = document.querySelector("#dayZeroC");
  let temperature = Math.round(response.data.main.temp);
  dayZeroC.innerHTML = `${temperature}°C`;
  let dayZeroDescription = document.querySelector("#dayZeroDescription");
  let description = titleCase(response.data.weather[0].description);
  dayZeroDescription.innerHTML = `${description}`;
  let dayZeroHumidity = document.querySelector("#dayZeroHumidity");
  dayZeroHumidity.innerHTML = `${response.data.main.humidity}%`;
  let dayZeroWind = document.querySelector("#dayZeroWind");
  let windSpeed = (response.data.wind.speed * 3.6).toFixed(1);
  dayZeroWind.innerHTML = `${windSpeed}km/h`;
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
}

let form = document.querySelector("#formSearchCity");
form.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getLocalInfo);

/*Change City 
function searchCity(event) {
event.preventDefault();
let input = document.querySelector("#searchCityInput");
let currentCity = document.querySelector("#currentCity");
currentCity.innerHTML = input.value;
}
let form = document.querySelector("#formSearchCity");
form.addEventListener("submit", searchCity)

//Celsius and Farenheit
function changeUnitF(event) {
  event.preventDefault();
let currentTempValue = document.querySelector("#currentTemp");
return currentTempValue.innerHTML = `62.6`;
}
function changeUnitC(event) {
  event.preventDefault();
let currentTempValue = document.querySelector("#currentTemp");
return currentTempValue.innerHTML = `17`;

}

 let currentTempResultF = document.querySelector("#currentF");
 currentTempResultF.addEventListener("click", changeUnitF);
  let currentTempResultC = document.querySelector("#currentC");
 currentTempResultC.addEventListener("click", changeUnitC)*/
