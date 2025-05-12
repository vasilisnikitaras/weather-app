document.getElementById("search").addEventListener("click", function() {
    let city = document.getElementById("city").value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather-result").innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    })
    .catch(error => console.log("Error fetching weather data:", error));
});
