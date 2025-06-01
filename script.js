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

// Ensure the function runs when the page loads
document.addEventListener("DOMContentLoaded", populateCityDropdown);
