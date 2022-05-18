function displayTemperature(response){
let temperatureElement = document.querySelector("#current-temp");
let cityElement = document.querySelector("#city");
let windElement = document.querySelector("#wind");
let humidityElement = document.querySelector("#humidity");
let dateElement = document.querySelector("#date")
let conditionsElement = document.querySelector("#weather-conditions")

console.log(response.data)
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML= response.data.name;
windElement.innerHTML= Math.round(response.data.wind.speed);
humidityElement.innerHTML= response.data.main.humidity;
conditionsElement.innerHTML = response.data.weather[0].description;
}


let apiKey = "e569e71e164e7e0ec0fb7827f996e194";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);