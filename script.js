//global variables
var latitude
var longitude
var searchCityName
var displayCityName
var currentDate
var currentTemp
var currentWindspeed
var currentHumidity
var currentUVI
var currentWeatherIcon

//geocoding API to take city name search user input, get lat and long, to use in given weather API
//will also be grabbing "cityname" for display from here
geocodingUrl = 'https://api.geoapify.com/v1/geocode/search?text=Seattle&filter=countrycode:us&apiKey=a5d5ba0ac854494492b5801b965f9c17';

fetch(geocodingUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    latitude = (data.features[0].properties.lat);
    console.log(latitude);
    longitude = (data.features[0].properties.lon);
    console.log(longitude);
    displayCityName = (data.query.text.toUpperCase());
    console.log(displayCityName);

    //display chosen city name on page
    document.getElementById("cityName").textContent = displayCityName
  });
  
  
//given weather API will take input from geocoding API to display weather info for the user's desired city
//will be grabbing the date, temperature, windspeed, humidity, UV Index (also icon of conditions if possible)
weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&units=imperial&appid=a3cbff459cf1aec9060b5cbeb75cb3c8';

fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    //converting given unix time to easier to read standard date and time format
    var unixDate = data.current.dt;
    var unixDate2 = moment.unix(unixDate).format("L");
    currentDate = unixDate2;
    currentTemp = data.current.temp;
    currentWindspeed = data.current.wind_speed;
    currentHumidity = data.current.humidity;
    currentUVI = data.current.uvi;
    currentWeatherIcon = data.current.weather[0].icon;

    //display current date and time
    document.getElementById("currentDate").textContent = currentDate;

    //display weather conditions icon
    src = 'http://openweathermap.org/img/wn/' + currentWeatherIcon + '@2x.png';
    currentWeatherImage = document.createElement('img');
    currentWeatherImage.src = src;

    document.getElementById('currentIcon').appendChild(currentWeatherImage);

    //display current temperaure fahrenheit
    displayCurrentTemp = document.createElement('li');
    document.getElementById('currentStats').appendChild(displayCurrentTemp);
    displayCurrentTemp.textContent = "Temp: " + currentTemp + " °F"

    //display current windspeed
    displayCurrentWindspeed = document.createElement('li');
    document.getElementById('currentStats').appendChild(displayCurrentWindspeed);
    displayCurrentWindspeed.textContent = "Windspeed: " + currentWindspeed + " MPH"

    //display current humidity
    displayCurrentHumidity = document.createElement('li');
    document.getElementById('currentStats').appendChild(displayCurrentHumidity);
    displayCurrentHumidity.textContent = "Humidity: " + currentHumidity + " %"

    //display current UVI
    displayCurrentUVI = document.createElement('li');
    document.getElementById('currentStats').appendChild(displayCurrentUVI);
    displayCurrentUVI.textContent = "UVI Index: " + currentWindspeed

    //=======================================================================================================================
    //Weather API pulls to pull date for FORECASTED days
    console.log(data.daily)
    for (index = 1; index < 6; index++) {
        forecastData = data.daily[i];
        
    }

  });
