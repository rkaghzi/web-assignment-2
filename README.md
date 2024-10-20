Overview: 
This repository contains a Weather App that allows users to get detailed hourly weather information for a specific city. The app fetches data from the OpenWeatherMap API and displays it in a table format. Users can apply filters, convert temperatures between Celsius and Fahrenheit, and view weather data such as temperature, humidity, wind speed, and weather description.


Weather App - Dashboard
This repository contains the source code for a Weather App that provides an interactive dashboard displaying weather information. It retrieves weather data from the OpenWeatherMap API, displays the data in a table format, and allows users to filter or convert the temperature.

Files Overview
index.html: The main dashboard file that renders the UI and contains the input fields, buttons, and weather display.
style.css: CSS styles that define the layout and design of the dashboard and the weather table.
script.js: JavaScript file that interacts with the OpenWeatherMap API, handles user inputs, and dynamically updates the weather data on the dashboard.

tables.html
Contains the HTML structure for the weather app, including a sidebar, an input field to enter the city, buttons to get the weather and convert temperature, and a weather table.
table.css
Provides styling for the weather app, including the layout for the sidebar, main content, weather table, and user interface elements like buttons, inputs, and dropdowns.
table.js
Contains JavaScript functionality to fetch weather data from the OpenWeatherMap API, filter and display hourly weather data, and handle user interactions such as temperature conversion and filter selection.

Features
Get Weather: Fetch and display weather information for any city entered by the user.
Filter Options: Filter the displayed weather data based on:
Temperatures in ascending or descending order.
Filtering out days with rain.
Showing the day with the highest temperature.
Temperature Conversion: Switch between Celsius and Fahrenheit temperature units.
Usage:
To use this app, follow these steps:

Clone this repository to your local machine:
git clone https://github.com/yourusername/weather-app.git
Navigate to the project directory:

bash
cd weather-app
Open the tables.html file in a web browser:

bash
open tables.html
Ensure you have an active internet connection, as the app fetches weather data from the OpenWeatherMap API.

API Key : 

This app uses the OpenWeatherMap API, which requires an API key. You can sign up for a free API key here.

Open the table.js file.
Replace the existing value of apiKey with your own API key:
javascript

const apiKey = '6bcc70422337f30eaa47ffc48da36931';
Usage
Enter a city name in the input field at the top of the page.
Click the Get Weather button to retrieve the weather data for the entered city.
Use the Convert to °F button to toggle between Celsius and Fahrenheit.
Use the dropdown filter to sort or filter the weather data by temperature, rain, or show the day with the highest temperature.
Example
For a city like New York, the table will display hourly weather data for the next 5 days, showing time, temperature, humidity, wind speed, and a weather description. You can sort or filter the data based on the available options.

Contributions
Feel free to fork this project and contribute! Contributions such as bug fixes, new features, and suggestions are always welcome.

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make changes and commit (git commit -am 'Add a feature').
Push the branch (git push origin feature-branch).
Create a pull request.


Acknowledgements
The app uses the OpenWeatherMap API to fetch weather data.
Icon and profile picture in the user profile section are sourced from microsoft searches. 

Dependencies
OpenWeatherMap API: An API key is required to access weather data. You can sign up for a free API key at OpenWeatherMap.

Chatbot: 
Answers general and weather queries.

github project link: https://github.com/rkaghzi/web-assignment-2

