function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `Last updated: ${day} ${hours}:${minutes}`;
}

function getForecast(coordinates){
    let apiKey = "e569e71e164e7e0ec0fb7827f996e194";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
let temperatureElement = document.querySelector("#current-temp");
let cityElement = document.querySelector("#city");
let windElement = document.querySelector("#wind");
let humidityElement = document.querySelector("#humidity");
let dateElement = document.querySelector("#date");
let conditionsElement = document.querySelector("#weather-conditions");
let iconElement = document.querySelector("#icon");

celsiusTemp = response.data.main.temp;


temperatureElement.innerHTML = Math.round(celsiusTemp);
cityElement.innerHTML= response.data.name;
windElement.innerHTML= Math.round(response.data.wind.speed);
humidityElement.innerHTML= response.data.main.humidity;
conditionsElement.innerHTML = response.data.weather[0].description;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);

getForecast(response.data.coord);
}
function search(city) {
    let apiKey = "e569e71e164e7e0ec0fb7827f996e194";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);
}


function handleSearch(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input")
    search(cityInputElement.value);

}

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSearch);




    function formatDay(timestamp){
        let date = new Date(timestamp * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[day];
    }

    function displayForecast(response){
        let forecast = response.data.daily;
       let forecastElement = document.querySelector("#forecast");

       let forecastHTML= `<div class="row">`;
       forecast.forEach(function(forecastDay, index){
           if (index <5){ 
        forecastHTML = 
        forecastHTML + `
          <div class="col-2">
              <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
             <img 
             src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
             alt="" 
             width="42"
             >
  
         <div class="weather-forecast-temp">
             <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
              <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
          </div>
      </div>
      `;
    }
       });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML= forecastHTML;
    }

let celsiusLink = document.querySelector("#celsius-link");

search("Nairobi");
