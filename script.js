const apiKey = "1f1742f46396f018ec07cab6f270841a";  
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// List of popular cities
const popularCities = ["New York", "Los Angeles", "Toronto", "London", "Paris", "Tokyo", "Berlin", "Sydney", "Montreal", "Dubai"];

// Function to fetch weather data
async function fetchWeather() {
    let city = document.getElementById("city-input").value.trim();

    if (city === "") {
        displayMessage("⚠️ Please enter a city name.");
        return;
    }

    try {
        let response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        let data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            displayMessage("❌ City not found! Try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayMessage("⚠️ Failed to retrieve data. Check your internet connection.");
    }
}

// Function to display messages
function displayMessage(msg) {
    document.getElementById("weather-output").innerHTML = `<p>${msg}</p>`;
}

// Function to display weather data with animation
function displayWeather(data) {
    document.getElementById("weather-output").innerHTML = `
        <div class="weather-card">
            <h2>🌍 ${data.name}, ${data.sys.country}</h2>
            <p>🌡️ Temperature: ${data.main.temp}°C</p>
            <p>🌤️ Condition: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" class="weather-icon">
        </div>
    `;
    animate
