const apiKey = "1f1742f46396f018ec07cab6f270841a"; 
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// List of popular cities
const popularCities = ["New York", "Los Angeles", "Toronto", "London", "Paris", "Tokyo", "Berlin", "Sydney", "Montreal", "Dubai"];

// Function to populate city dropdown
function populateCityDropdown() {
    let dropdown = document.getElementById("city-dropdown");

    // Ensure dropdown exists before modifying it
    if (!dropdown) {
        console.error("Dropdown element not found!");
        return;
    }

    dropdown.innerHTML = `<option value="" disabled selected>Select a city</option>`; // Default option

    popularCities.forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", function() {
        document.getElementById("city-input").value = dropdown.value;
        fetchWeather(); // Auto-fetch when city is selected
    });
}

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
    animateWeatherCard();
}

// Function to animate the weather card
function animateWeatherCard() {
    const card = document.querySelector(".weather-card");
    card.style.opacity = 0;
    setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = "scale(1.05)";
        setTimeout(() => card.style.transform = "scale(1)", 500);
    }, 300);
}

// Ensure the function runs when the page loads
document.addEventListener("DOMContentLoaded", populateCityDropdown);
document.getElementById("search-btn").addEventListener("click", fetchWeather);
