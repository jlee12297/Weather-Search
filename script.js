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
    var unixDate2 = moment.unix(unixDate).utc();
    currentDate = unixDate2._d;
    console.log(currentDate);
    currentTemp = data.current.temp;
    console.log(currentTemp);
    currentWindspeed = data.current.wind_speed;
    console.log(currentWindspeed);
    currentHumidity = data.current.humidity;
    console.log(currentHumidity);
    currentUVI = data.current.uvi;
    console.log(currentUVI);
    currentWeatherIcon = data.current.weather[0].icon;
    console.log(currentWeatherIcon);

    document.getElementById("currentDate").textContent = currentDate;

    src = 'http://openweathermap.org/img/wn/' + currentWeatherIcon + '@2x.png';
    currentWeatherImage = document.createElement('img');
    currentWeatherImage.src = src;

 
    document.getElementById('currentIcon').appendChild(currentWeatherImage);
  });
