const apiKey = "1f1742f46396f018ec07cab6f270841a"; 
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Expanded city list 🌍 with Greece 🇬🇷
const popularCities = [
    "Athens", "Thessaloniki", "Santorini", "Heraklion", "Patras", 
    "New York", "Los Angeles", "Toronto", "London", "Paris", "Tokyo", 
    "Berlin", "Sydney", "Montreal", "Dubai", "Rio de Janeiro", "Buenos Aires", 
    "Cape Town", "Mumbai", "Bangkok", "Moscow", "Cairo", "Seoul", "Madrid", 
    "Rome", "Beijing", "Singapore", "Mexico City", "Johannesburg", "Istanbul", 
    "Stockholm", "Helsinki", "Oslo"
];

// Populate dropdown menu
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
        } else {
            displayMessage("❌ City not found! Try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayMessage("⚠️ Failed to retrieve data. Check your internet connection.");
    }
}

// Show 5-day forecast with animations
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
