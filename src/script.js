let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatTime(currentTime);
let apiKey = "f0fc9549c6de17fa6c965f916fc7d8d4";


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
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


function search(city) {
  
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchField");
  search(cityInputElement.value);
}

function displayWeather(response) {
  console.log(response); 
  let cityResult = document.querySelector("#searchResult");
  let temperatureElement = document.querySelector(".current-temp");
  let currentTemp = temperatureElement.innerHTML;
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  temperatureElement.innerHTML = `${temperature}`;
  let currentDesc = document.querySelector("#current-Desc");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let currentLowTemp = document.querySelector("#currentLowTemp");
  let currentHighTemp = document.querySelector("#currentHighTemp");
  let windSpeed = document.querySelector("#wind");
  let pressure = document.querySelector("#weatherPressure")

  cityResult.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  currentDesc.innerHTML = `${response.data.weather[0].description}`;
  feelsLike.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  currentLowTemp.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  currentHighTemp.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  pressure.innerHTML = `Pressure: ${response.data.main.pressure}`;

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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
    <img src="src/Images/${forecast.weather[0].icon}.png" />
    <div class="weather-forecast-temperature">
      <strong>
        High: ${Math.round(forecast.main.temp_max)}°  
      </strong>
      <br />
        Low: ${Math.round(forecast.main.temp_min)}°</div>
    </div>
    `;
  }
}

function showCurrentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayWeather);
  Url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(Url).then(displayForecast);

}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function displayFahrenheit(event) {
event.preventDefault();
let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let temperatureElement = document.querySelector(".current-temp");
temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
event.preventDefault();
let temperatureElement = document.querySelector(".current-temp");
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheitTemp");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsiusTemp");
celsiusLink.addEventListener("click", displayCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#location-search");
currentLocationButton.addEventListener("click", getLocation);

getLocation();