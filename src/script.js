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
  //current temperature
  let temperatureElement = document.querySelector(".current-temp");
  let currentTemp = temperatureElement.innerHTML;
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  //current weather description
  let currentDesc = document.querySelector("#current-Desc");
  currentDesc.innerHTML = `${response.data.weather[0].description}`;
  //current feels like
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;
  //current humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  //current low temperature
  let currentLowTemp = document.querySelector("#currentLowTemp");
  currentLowTemp.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  //current high temperature
  let currentHighTemp = document.querySelector("#currentHighTemp");
  currentHighTemp.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
  //windspeed
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  //sunrise
  let sunriseUnix = response.data.sys.sunrise;
  let sunriseDate = new Date(sunriseUnix*1000);
  let sunriseHour = sunriseDate.getHours();
  if (sunriseHour < 10) {
    sunriseHour = `0${sunriseHour}`;
  }
  let sunriseMinutes = sunriseDate.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`;
  }
  let sunriseTime = `${sunriseHour}:${sunriseMinutes}`;
  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = `Sunrise: ${sunriseTime}`;
  //sunset
  let sunsetUnix = response.data.sys.sunset;
  let sunsetDate = new Date(sunsetUnix*1000);
  let sunsetHour = sunsetDate.getHours();
  if (sunsetHour < 10) {
    sunsetHour = `0${sunsetHour}`;
  }
  let sunsetMinutes = sunsetDate.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }
  let sunsetTime = `${sunsetHour}:${sunsetMinutes}`;
  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `Sunset: ${sunsetTime}`;
  //set current weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `src/Images/${response.data.weather[0].icon}.png`
  );
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

