/*weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=a3cbff459cf1aec9060b5cbeb75cb3c8';

fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
  */


geocodingUrl = 'https://api.geoapify.com/v1/geocode/search?text=Seattle&filter=countrycode:us&apiKey=a5d5ba0ac854494492b5801b965f9c17';

fetch(geocodingUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });