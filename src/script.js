let currentTime = new Date();

// display date
function formatDate(event) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentTime.getMonth()];
  let year = currentTime.getFullYear();
  let date = currentTime.getDate();
  let dateNow = `Date: ${month} ${date}, ${year}`;
  return dateNow;
}
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);

// display time
function formatTime(event) {
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeNow = `Time: ${hour}:${minutes}`;
  return timeNow;
}
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatTime(currentTime);

let apiKey = "f0fc9549c6de17fa6c965f916fc7d8d4";

// update city
function searchCity(event) {
  event.preventDefault();
  let unit = "metric";
  let cityInput = document.querySelector("#searchField");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayWeather);
}

function displayWeather(response) {
  let cityResult = document.querySelector("#searchResult");
  cityResult.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let temperatureElement = document.querySelector(".current-temp");
  let currentTemp = temperatureElement.innerHTML;
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;

  let currentDesc = document.querySelector("#current-Desc");
  currentDesc.innerHTML = `${response.data.weather[0].description}`;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;

  let currentLowTemp = document.querySelector("#currentLowTemp");
  currentLowTemp.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;

  //let precipitation = document.querySelector("#precipitation");
  //precipitation.innerHTML = `Precipitation: ${response.data.weather.icon}`;

  let currentHighTemp = document.querySelector("#currentHighTemp");
  currentHighTemp.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = `Sunrise: ${response.data.sys.sunrise}`;

  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `Sunset: ${response.data.sys.sunset}`;
}

function showCurrentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location-search");
currentLocationButton.addEventListener("click", getLocation);
