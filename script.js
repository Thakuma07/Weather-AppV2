const baseWeatherUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const weatherApiKey = "?key=M45PB4RTX5CXMXQZJ4JX4GUM2"
const weather = document.querySelector("#weather");
const loading = document.querySelector("#loading");
let weatherLocation = "howrah";
let temp;
let mode = "C";
let storeTemp, storeFeels;


function tempToggleChange(mainTemp, feelsTemp) {
    const temp = document.querySelector(".temperature");
    temp.textContent = mainTemp;
    const tempSymbol = document.createElement("sup");
    if (mode == "C") {
        tempSymbol.textContent = "°C";
    }
    else {
        tempSymbol.textContent = "°F";
    }
    temp.appendChild(tempSymbol);

    const feelsLike = document.querySelector(".feels");
    feelsLike.textContent = "Feels like " + feelsTemp;
    const feelsSymbol = document.createElement("sup");
    if (mode == "C") {
        feelsSymbol.textContent = "°C";
    }
    else {
        feelsSymbol.textContent = "°F";
    }
    feelsLike.appendChild(feelsSymbol);
}



function updateWeather(allData) {
    console.log(allData);
    weather.style.display = "grid";
    loading.style.display = "none";

    const address = document.querySelector(".address");
    address.textContent = allData.address;

    const temp = document.querySelector(".temperature");
    temp.textContent = allData.temp;
    const tempSymbol = document.createElement("sup");
    if (mode == "C") {
        tempSymbol.textContent = "°C";
    }
    else {
        tempSymbol.textContent = "°F";
    }
    temp.appendChild(tempSymbol);

    const feelsLike = document.querySelector(".feels");
    feelsLike.textContent = "Feels like " + allData.feelsLike;
    const feelsSymbol = document.createElement("sup");
    if (mode == "C") {
        feelsSymbol.textContent = "°C";
    }
    else {
        feelsSymbol.textContent = "°F";
    }
    feelsLike.appendChild(feelsSymbol);

    const humidity = document.querySelector(".humidity");
    humidity.textContent = "Humidity : " + allData.humidity + "%";

    const wind = document.querySelector(".wind");
    wind.textContent = "Wind : " + allData.wind + "MPH";

    const conditions = document.querySelector(".conditions");
    conditions.textContent = allData.conditions;
}

async function showForecast () {
    weather.style.display = "none";
    loading.style.display = "block";
    const response = await fetch(baseWeatherUrl + "/" + weatherLocation + weatherApiKey);
    const weatherData = await response.json();
    const address = weatherData.resolvedAddress;
    let temp = weatherData.days[0].temp;
    storeTemp = temp;
    let feelsLike = weatherData.days[0].feelslike;
    storeFeels = feelsLike;
    const humidity = weatherData.days[0].humidity;
    const wind = weatherData.days[0].windspeed;
    let conditions = weatherData.days[0].conditions;
    conditions = conditions.split(", ")[0];
    if (mode == "C") {
        temp = fahrenheitToCelsius(temp);
        feelsLike = fahrenheitToCelsius(feelsLike);
    }
    updateWeather({address, temp, feelsLike, humidity, wind, conditions});
}


function fahrenheitToCelsius(fahrenheit) {
    return parseFloat(((fahrenheit - 32) * 5 / 9).toFixed(1));
}


const getLocationBtn = document.querySelector("#submit");

getLocationBtn.addEventListener("click", () => {
    const getLocation = document.querySelector("#location");
    weatherLocation = getLocation.value;
    showForecast();
});


const conversionBtn = document.querySelector(".toggle-btn");

conversionBtn.addEventListener("click", () => {
    if (mode == "F") {
        mode = "C";
        tempToggleChange(fahrenheitToCelsius(storeTemp), fahrenheitToCelsius(storeFeels));
    }
    else {
        mode = "F";
        tempToggleChange(storeTemp, storeFeels);
    }
    const btn = document.querySelectorAll(".toggle");
    btn.forEach((button) => button.classList.toggle("active"));
})

showForecast();