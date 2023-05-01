
function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city-input");

  let citySearch = document.querySelector("#city-change");
  citySearch.innerHTML = `${searchInput.value}`;
}

let city = document.querySelector("#city-form");
city.addEventListener("submit", handleSearch);


let time = new Date();

let dateChange = document.querySelector(".time-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[time.getDay()];

let hours = time.getHours();
let minutes = time.getMinutes();

dateChange.innerHTML = `${day} ${hours}:${minutes}`;




function handleSearch(event){
  event.preventDefault()
  let searchInput = document.querySelector("#search-city-input");
  searchCity(searchInput.value)
}


function searchCity(city){
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
 
  let temperatureElement = document.querySelector("#temperature-change");
  temperatureElement.innerHTML = `${temperature}`;
 
  let citySearch = document.querySelector("#city-change");
  citySearch.innerHTML = `${response.data.name}`;

let minChange = Math.round(response.data.main.temp_min);
let maxChange = Math.round(response.data.main.temp_max);
  let minMaxTemp = document.querySelector("#variation-temp");
  minMaxTemp.innerHTML = `Min/Max Temperature: ${minChange}ºC / ${maxChange}ºC`;

  let windChange = Math.round((response.data.wind.speed)*3.6);
  let windHandle = document.querySelector("#wind");
  windHandle.innerHTML = `Wind: ${windChange} Km/h`;

  let humidityChange = Math.round(response.data.main.humidity);
  let humidityHandle = document.querySelector("#humidity");
  humidityHandle.innerHTML = `Humidity: ${humidityChange} %`;


/* Don't know how to change it from utc time to each city local time
 
let now = new Date();
let utc = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);

  let sunriseChange = response.data.sys.sunrise;
  let sunsetChange = response.data.sys.sunset;
  let sunHandle = document.querySelector("#sun-hours");
  sunHandle.innerHTML = `Sunrise/Sunset: ${sunriseChange} / ${sunsetChange}`;
*/ 

}


function showPosition(position){
 let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
   let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
   let apiGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiGeo).then(showTemperature);
}


function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition)
}

let button = document.querySelector("#current-button")
button.addEventListener("click", getCurrentPosition);



