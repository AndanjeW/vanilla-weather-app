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

function displayTemperature(response){
let temperatureElement = document.querySelector("#current-temp");
let cityElement = document.querySelector("#city");
let windElement = document.querySelector("#wind");
let humidityElement = document.querySelector("#humidity");
let dateElement = document.querySelector("#date")
let conditionsElement = document.querySelector("#weather-conditions")
let iconElement = document.querySelector("#icon")

celsiusTemp = response.data.main.temp;


temperatureElement.innerHTML = Math.round(celsiusTemp);
cityElement.innerHTML= response.data.name;
windElement.innerHTML= Math.round(response.data.wind.speed);
humidityElement.innerHTML= response.data.main.humidity;
conditionsElement.innerHTML = response.data.weather[0].description;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);


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



function showFahrenheitTemp(event){
event.preventDefault();
let temperatureElement = document.querySelector("#current-temp");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemp = (celsiusTemp * 9)/ 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemp);

}
function showCelsiusTemp(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    
    }

    function displayForecast(){
       let forecastElement = document.querySelector("#forecast");

       let forecastHTML= `<div class="row">`;
       let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
       days.forEach(function(day){
        forecastHTML = 
        forecastHTML + `
          <div class="col-2">
              <div class="weather-forecast-day">${day}</div>
             <img 
             src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" 
             alt="" 
             width="42"
             >
  
         <div class="weather-forecast-temp">
             <span class="weather-forecast-temp-max">18°</span>
              <span class="weather-forecast-temp-min">14°</span>
          </div>
      </div>
      `;
       });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML= forecastHTML;
    }

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp)

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp)
search("Nairobi");
displayForecast();