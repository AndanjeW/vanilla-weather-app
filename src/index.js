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
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response){
let temperatureElement = document.querySelector("#current-temp");
let cityElement = document.querySelector("#city");
let windElement = document.querySelector("#wind");
let humidityElement = document.querySelector("#humidity");
let dateElement = document.querySelector("#date")
let conditionsElement = document.querySelector("#weather-conditions")

temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML= response.data.name;
windElement.innerHTML= Math.round(response.data.wind.speed);
humidityElement.innerHTML= response.data.main.humidity;
conditionsElement.innerHTML = response.data.weather[0].description;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
search("Nairobi");