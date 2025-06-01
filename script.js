const apiKey = "1f1742f46396f018ec07cab6f270841a"; 
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
const alertsUrl = "https://api.openweathermap.org/data/3.0/alerts";

// Expanded city list with Greece 🇬🇷 and global locations 🌍
const popularCities = [
    "Athens", "Thessaloniki", "Santorini", "Heraklion", "Patras",
    "New York", "Los Angeles", "Toronto", "London", "Paris", "Tokyo",
    "Berlin", "Sydney", "Montreal", "Dubai", "Rio de Janeiro", "Buenos Aires",
    "Cape Town", "Mumbai", "Bangkok", "Moscow", "Cairo", "Seoul", "Madrid",
    "Rome", "Beijing", "Singapore", "Mexico City", "Johannesburg", "Istanbul",
    "Stockholm", "Helsinki", "Oslo"
];

// Populate dropdown menu with cities
function populateCityDropdown() {
    let dropdown = document.getElementById("city-dropdown");
    if (!dropdown) return;

    dropdown.innerHTML = `<option value="" disabled selected>Select a city</option>`;

    popularCities.forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", function() {
        document.getElementById("city-input").value = dropdown.value;
        fetchWeather();
    });
}

// Fetch 5-day weather forecast
async function fetchWeather() {
    let city = document.getElementById("city-input").value.trim();
    if (!city) {
        displayMessage("⚠️ Please enter a city name.");
        return;
    }

    try {
        let response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        let data = await response.json();

        if (data.cod === "200") {
            displayWeather(data);
            fetchWeatherAlerts(city);
        } else {
            displayMessage("❌ City not found! Try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayMessage("⚠️ Failed to retrieve data. Check your internet connection.");
    }
}

// Fetch real-time weather alerts
async function fetchWeatherAlerts(city) {
    try {
        let response = await fetch(`${alertsUrl}?q=${city}&appid=${apiKey}`);
        let data = await response.json();

        if (data.alerts && data.alerts.length > 0) {
            displayAlerts(data.alerts);
        } else {
            displayMessage("✅ No active weather alerts.");
        }
    } catch (error) {
        console.error("Error fetching weather alerts:", error);
    }
}

// Display 5-day forecast with alerts
function displayWeather(data) {
    let forecastHTML = `<h2>🌍 ${data.city.name}, ${data.city.country}</h2>`;

    data.list.slice(0, 5).forEach(day => {
        forecastHTML += `
            <div class="weather-card visible">
                <p>📅 ${new Date(day.dt_txt).toLocaleDateString()}</p>
                <p>🌡️ Temp: ${day.main.temp}°C</p>
                <p>🌤️ Condition: ${day.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon" class="weather-icon">
            </div>
        `;
    });

    document.getElementById("weather-output").innerHTML = forecastHTML;
}

// Display real-time alerts
function displayAlerts(alerts) {
    let alertHTML = `<h3>⚠️ Weather Alerts:</h3>`;
    alerts.forEach(alert => {
        alertHTML += `<p><strong>${alert.event}</strong>: ${alert.description}</p>`;
    });

    document.getElementById("error-message").innerHTML = alertHTML;
}

// Auto-refresh weather data every 5 minutes
function autoUpdateWeather() {
    setInterval(fetchWeather, 300000);
}

// Load functions on page start
document.addEventListener("DOMContentLoaded", () => {
    populateCityDropdown();
    autoUpdateWeather();
});

// Button click event
document.getElementById("search-btn").addEventListener("click", fetchWeather);
