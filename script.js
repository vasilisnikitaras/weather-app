// Weather Forecast App - Improved functionality
const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeather API key
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// List of popular cities
const popularCities = ["New York", "Los Angeles", "Toronto", "London", "Paris", "Tokyo", "Berlin", "Sydney", "Montreal", "Dubai"];

// Function to fetch weather data
async function fetchWeather() {
    let city = document.getElementById("city-input").value.trim();

    if (city === "") {
        document.getElementById("weather-output").innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {
        let response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        let data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            document.getElementById("weather-output").innerHTML = `<p>City not found! Try again.</p>`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather-output").innerHTML = `<p>Failed to retrieve data. Please check your internet connection.</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    document.getElementById("weather-output").innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    `;
}

// Function to populate city dropdown
function populateCityDropdown() {
    let dropdown = document.getElementById("city-dropdown");
    popularCities.forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", function() {
        document.getElementById("city-input").value = dropdown.value;
    });
}

// Event Listeners
document.getElementById("search-btn").addEventListener("click", fetchWeather);
document.addEventListener("DOMContentLoaded", populateCityDropdown);
