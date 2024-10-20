const apiKey = '6bcc70422337f30eaa47ffc48da36931';

// Function to get the weather data for the next 5 days
async function getWeatherData(city, filter = "default", unit = "metric") {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&cnt=40&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== '200') {
            alert('City not found or API error.');
            return;
        }

        // Populate the weather table with the weather data and filter applied
        updateWeatherTable(data, filter, unit);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to update the weather table
function updateWeatherTable(data, filter = "default", unit = "metric") {
    const tableBody = document.getElementById("weather-hourly").getElementsByTagName('tbody')[0];

    // Clear any previous data
    tableBody.innerHTML = "";

    let weatherList = data.list; // Array of hourly forecasts

    // Apply the selected filter
    switch (filter) {
        case 'ascTemp':
            weatherList = weatherList.sort((a, b) => a.main.temp - b.main.temp);
            break;
        case 'filterRain':
            weatherList = weatherList.filter(entry => entry.weather[0].description.includes('rain'));
            break;
        case 'highestTemp':
            const highestTempEntry = weatherList.reduce((max, entry) => (entry.main.temp > max.main.temp ? entry : max), weatherList[0]);
            weatherList = [highestTempEntry]; // Display only the day with the highest temperature
            break;
        case 'descTemp':
            weatherList = weatherList.sort((a, b) => b.main.temp - a.main.temp);
            break;
        default:
            // No filter applied, show all data
            break;
    }

    // Iterate over the filtered weather list and display the data in the table
    weatherList.forEach(weatherData => {
        const row = tableBody.insertRow();

        // Time column (hour of the day)
        const timeCell = row.insertCell(0);
        const time = new Date(weatherData.dt * 1000);
        timeCell.textContent = `${time.getHours()}:00`;

        // Temperature column
        const tempCell = row.insertCell(1);
        let temperature = weatherData.main.temp;
        if (unit === "imperial") {  // Convert to Fahrenheit if unit is imperial
            temperature = celsiusToFahrenheit(temperature);
            tempCell.textContent = `${temperature.toFixed(2)}°F`;
        } else {
            tempCell.textContent = `${temperature.toFixed(2)}°C`;
        }

        // Humidity column
        const humidityCell = row.insertCell(2);
        humidityCell.textContent = `${weatherData.main.humidity}%`;

        // Wind speed column
        const windCell = row.insertCell(3);
        windCell.textContent = `${weatherData.wind.speed.toFixed(2)} m/s`;

        // Weather description column
        const weatherCell = row.insertCell(4);
        weatherCell.textContent = weatherData.weather[0].description;
    });
}

// Event listener for the "Get Weather" button
document.getElementById('get-weather').addEventListener('click', () => {
    const city = document.getElementById('city-name').value.trim();
    const filter = document.getElementById('weather-filters').value; // Get filter value
    const unit = document.getElementById('convert-temp').textContent.includes("°F") ? "imperial" : "metric"; // Determine unit
    if (city) {
        getWeatherData(city, filter, unit);
    } else {
        alert('Please enter a city name.');
    }
});

// Event listener for the filter dropdown
document.getElementById('weather-filters').addEventListener('change', (event) => {
    const selectedFilter = event.target.value;
    const city = document.getElementById('city-name').value.trim();
    const unit = document.getElementById('convert-temp').textContent.includes("°F") ? "imperial" : "metric"; // Determine unit
    if (city) {
        getWeatherData(city, selectedFilter, unit); // Pass filter to fetch function
    }
});

// Event listener for the temperature conversion button
document.getElementById('convert-temp').addEventListener('click', () => {
    const button = document.getElementById('convert-temp');
    const currentUnit = button.textContent.includes("°F") ? "metric" : "imperial"; // Toggle between Celsius and Fahrenheit
    const newUnit = currentUnit === "imperial" ? "°F" : "°C";  // Update button text accordingly
    button.textContent = `Convert to ${newUnit}`;
    
    const city = document.getElementById('city-name').value.trim();
    const filter = document.getElementById('weather-filters').value; // Get filter value
    if (city) {
        getWeatherData(city, filter, currentUnit); // Fetch weather data with the new unit
    } else {
        alert('Please enter a city name.');
    }
});

// Display default data on page load (for a default city like "Multan")
window.onload = () => {
    const defaultCity = "Multan";
    document.getElementById('city-name').value = defaultCity;
    getWeatherData(defaultCity, "default", "metric"); // Fetch weather data for default city on page load
};

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}
