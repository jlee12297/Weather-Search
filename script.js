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
var userCityInput

//search button function
var searchButton = $('#searchButton');
searchButton.on('click', function() {

    userCityInput = $('input[id="userInput"]').val();
    console.log(userCityInput)
    
   //geocoding API to take city name search user input, get lat and long, to use in given weather API
//will also be grabbing "cityname" for display from here
//geocodingUrl = 'https://api.geoapify.com/v1/geocode/search?text=Seattle&filter=countrycode:us&apiKey=a5d5ba0ac854494492b5801b965f9c17';
geocodingUrl = 'https://api.geoapify.com/v1/geocode/search?text=' + userCityInput + '&filter=countrycode:us&apiKey=a5d5ba0ac854494492b5801b965f9c17';

fetch(geocodingUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    latitude = (data.features[0].properties.lat);
    console.log(latitude);
    longitude = (data.features[0].properties.lon);
    console.log(longitude);
    displayCityName = userCityInput;
    console.log(displayCityName);
    console.log(data)
    //display chosen city name on page
    document.getElementById("cityName").textContent = displayCityName
  });
  
  
//given weather API will take input from geocoding API to display weather info for the user's desired city
//will be grabbing the date, temperature, windspeed, humidity, UV Index (also icon of conditions if possible)
weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.6038321&lon=-122.330062&units=imperial&appid=a3cbff459cf1aec9060b5cbeb75cb3c8';

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
    for (i = 0; i < 5; i++) {
        forecastDat0 = data.daily[i];
        
        //converting unix forecast into forecast date
        forecastDate = data.daily[i].dt;
        forecastDate2 = moment.unix(forecastDate).format("L");
        convertedForecastDate = forecastDate2;

        forecastTemp = data.daily[i].temp.day;
        forecastWindspeed = data.daily[i].wind_speed;
        forecastHumidity = data.daily[i].humidity;
        forecastWeatherIcon = data.daily[i].weather[0].icon;    
        
        //fetch FORECASTED weather conditions icon
        forecastimagesrc = 'http://openweathermap.org/img/wn/' + forecastWeatherIcon + '@2x.png';
        forecastWeatherImage = document.createElement('img');
        forecastWeatherImage.src = forecastimagesrc;

        
  //display forecast elements in appropriate cards, learned to use switch
        switch(i) {
            case 0:
                document.getElementById("forecast1Date").textContent = convertedForecastDate;
                document.getElementById('forecast1Icon').appendChild(forecastWeatherImage);

                displayForecastTemp = document.createElement('li');
                document.getElementById('forecast1Stats').appendChild(displayForecastTemp);
                displayForecastTemp.textContent = "Temp: " + forecastTemp + " °F"

                displayForecastWindspeed = document.createElement('li');
                document.getElementById('forecast1Stats').appendChild(displayForecastWindspeed);
                displayForecastWindspeed.textContent = "Windspeed: " + forecastWindspeed + " MPH"

                displayForecastHumidity = document.createElement('li');
                document.getElementById('forecast1Stats').appendChild(displayForecastHumidity);
                displayForecastHumidity.textContent = "Humidity: " + forecastHumidity + " %"
            break;

            case 1:
                document.getElementById("forecast2Date").textContent = convertedForecastDate;
                document.getElementById('forecast2Icon').appendChild(forecastWeatherImage);

                displayForecastTemp = document.createElement('li');
                document.getElementById('forecast2Stats').appendChild(displayForecastTemp);
                displayForecastTemp.textContent = "Temp: " + forecastTemp + " °F"

                displayForecastWindspeed = document.createElement('li');
                document.getElementById('forecast2Stats').appendChild(displayForecastWindspeed);
                displayForecastWindspeed.textContent = "Windspeed: " + forecastWindspeed + " MPH"

                displayForecastHumidity = document.createElement('li');
                document.getElementById('forecast2Stats').appendChild(displayForecastHumidity);
                displayForecastHumidity.textContent = "Humidity: " + forecastHumidity + " %"
            break;

            case 2:
                document.getElementById("forecast3Date").textContent = convertedForecastDate;
                document.getElementById('forecast3Icon').appendChild(forecastWeatherImage);

                displayForecastTemp = document.createElement('li');
                document.getElementById('forecast3Stats').appendChild(displayForecastTemp);
                displayForecastTemp.textContent = "Temp: " + forecastTemp + " °F"

                displayForecastWindspeed = document.createElement('li');
                document.getElementById('forecast3Stats').appendChild(displayForecastWindspeed);
                displayForecastWindspeed.textContent = "Windspeed: " + forecastWindspeed + " MPH"

                displayForecastHumidity = document.createElement('li');
                document.getElementById('forecast3Stats').appendChild(displayForecastHumidity);
                displayForecastHumidity.textContent = "Humidity: " + forecastHumidity + " %"
            break;

            case 3:
                document.getElementById("forecast4Date").textContent = convertedForecastDate;
                document.getElementById('forecast4Icon').appendChild(forecastWeatherImage);

                displayForecastTemp = document.createElement('li');
                document.getElementById('forecast4Stats').appendChild(displayForecastTemp);
                displayForecastTemp.textContent = "Temp: " + forecastTemp + " °F"

                displayForecastWindspeed = document.createElement('li');
                document.getElementById('forecast4Stats').appendChild(displayForecastWindspeed);
                displayForecastWindspeed.textContent = "Windspeed: " + forecastWindspeed + " MPH"

                displayForecastHumidity = document.createElement('li');
                document.getElementById('forecast4Stats').appendChild(displayForecastHumidity);
                displayForecastHumidity.textContent = "Humidity: " + forecastHumidity + " %"
            break;

            case 4:
                document.getElementById("forecast5Date").textContent = convertedForecastDate;
                document.getElementById('forecast5Icon').appendChild(forecastWeatherImage);

                displayForecastTemp = document.createElement('li');
                document.getElementById('forecast5Stats').appendChild(displayForecastTemp);
                displayForecastTemp.textContent = "Temp: " + forecastTemp + " °F"

                displayForecastWindspeed = document.createElement('li');
                document.getElementById('forecast5Stats').appendChild(displayForecastWindspeed);
                displayForecastWindspeed.textContent = "Windspeed: " + forecastWindspeed + " MPH"

                displayForecastHumidity = document.createElement('li');
                document.getElementById('forecast5Stats').appendChild(displayForecastHumidity);
                displayForecastHumidity.textContent = "Humidity: " + forecastHumidity + " %"
            break;

            default:
                break;

        }
    }

  });

   
    //return false so search button click does not automatically refresh
    return false;
})


