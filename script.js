const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const api_Key = "7845250d04c7ad3915369b108ca073ca";

async function checkWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=metric`;
        const response = await fetch(url);
        const weather_data = await response.json();

        if(weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        displayWeatherData(weather_data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

async function checkWeatherByCoords(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_Key}&units=metric`;
        const response = await fetch(url);
        const weather_data = await response.json();

        if(weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        displayWeatherData(weather_data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

function displayWeatherData(weather_data) {
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    
    temperature.innerHTML = `${Math.round(weather_data.main.temp)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "weather img/cloud.png";
            break;
        case 'Drizzle':
            weather_img.src = "weather img/drizzel.webp";
            break;   
        case 'Thunderstorm':
            weather_img.src = "weather img/thunderstrom.webp";
            break;     
        case 'Clear':
            weather_img.src = "weather img/clear.png";
            break;
        case 'Rain':
            weather_img.src = "weather img/rain.png";
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            weather_img.src = "weather img/mist.png";
            break;
        case 'Snow':
            weather_img.src = "weather img/snow.png";
            break;
        default:
            weather_img.src = "weather img/cloud.png";
    }  

    console.log(weather_data);
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                checkWeatherByCoords(lat, lon);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Unable to get your location. Please enter a city name manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser. Please enter a city name manually.");
    }
}

searchBtn.addEventListener('click', () => {
    if (inputBox.value.trim() === '') {
        alert("Please enter a city name");
        return;
    }
    checkWeather(inputBox.value);
});

locationBtn.addEventListener('click', getCurrentLocation);

inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (inputBox.value.trim() === '') {
            alert("Please enter a city name");
            return;
        }
        checkWeather(inputBox.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    getCurrentLocation();
});