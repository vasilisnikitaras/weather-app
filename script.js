// Weather Forecast App - Clean and Optimized JS
const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeather API key
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
async function fetchWeather() {
    let city = document.getElementById("city-input").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    try {
        let response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        let data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert("City not found! Try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to retrieve weather data. Please check your internet connection.");
    }
}

// Function to display fetched weather data
function displayWeather(data) {
    document.getElementById("weather-output").innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    `;
}

// Event Listener for Search Button
document.getElementById("search-btn").addEventListener("click", fetchWeather);
