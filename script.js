const apiKey = '6bcc70422337f30eaa47ffc48da36931';
let isCelsius = true;

// Variables to store chart instances
let barChart, doughnutChart, lineChart;

document.addEventListener('DOMContentLoaded', () => {
    getWeatherData('Multan'); // Default weather for Multan
});

document.getElementById('get-weather').addEventListener('click', () => {
    const city = document.getElementById('city-name').value;
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=40&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== '200') {
            alert('City not found or API error.');
            return;
        }

        updateWeatherInfo(data);
        updateCharts(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherInfo(data) {
    const weather = data.list[0]; 
    document.getElementById('city').textContent = `City: ${data.city.name}`;
    document.getElementById('temp').textContent = `Temperature: ${weather.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${weather.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${weather.wind.speed}m/s`;
    document.getElementById('description').textContent = `Weather: ${weather.weather[0].description}`;
    document.getElementById('icon').src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
}

function updateCharts(data) {
    const labels = data.list.slice(0, 5).map(entry => new Date(entry.dt * 1000).toLocaleDateString());
    const temps = data.list.slice(0, 5).map(entry => entry.main.temp);
    const humidity = data.list.slice(0, 5).map(entry => entry.main.humidity);
    const windSpeed = data.list.slice(0, 5).map(entry => entry.wind.speed);

    // Destroy existing charts if they exist
    if (barChart) barChart.destroy();
    if (doughnutChart) doughnutChart.destroy();
    if (lineChart) lineChart.destroy();

    // Create new charts
    barChart = new Chart(document.getElementById('bar-chart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });

    doughnutChart = new Chart(document.getElementById('doughnut-chart'), {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                label: 'Humidity (%)',
                data: humidity,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
            }]
        }
    });

    lineChart = new Chart(document.getElementById('line-chart'), {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Wind Speed (m/s)',
                data: windSpeed,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    });
}

document.getElementById('convert-temp').addEventListener('click', () => {
    const tempElement = document.getElementById('temp');
    const convertButton = document.getElementById('convert-temp');
    let currentTemp = parseFloat(tempElement.textContent.split(': ')[1]);

    if (isCelsius) {
        // Convert Celsius to Fahrenheit
        currentTemp = (currentTemp * 9/5) + 32;
        tempElement.textContent = `Temperature: ${currentTemp.toFixed(1)}°F`;
        convertButton.textContent = 'Convert to °C';  // Update button text
    } else {
        // Convert Fahrenheit to Celsius
        currentTemp = (currentTemp - 32) * 5/9;
        tempElement.textContent = `Temperature: ${currentTemp.toFixed(1)}°C`;
        convertButton.textContent = 'Convert to °F';  // Update button text
    }

    // Toggle isCelsius state
    isCelsius = !isCelsius;
});
