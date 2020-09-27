var cities = [];

$(document).ready(function(){
    $("#searchButton").on("click", function(){
        if (jQuery.inArray($("#cityName").val(), cities) === -1){
            cities.push($("#cityName").val());
            localStorage.setItem("Cities",JSON.stringify(cities));  
            var newCity = $("<button type='button' class='list-group-item list-group-item-action'>");
            newCity.text($("#cityName").val());
            $("#listCities").append(newCity);
            apiCallOut($("#cityName").val());
        }        
    });


});

function initStore() {
    // Parsing the JSON string to an object
     if (localStorage.getItem("Cities") !== null){
        cities = JSON.parse(localStorage.getItem("Cities"));
        console.log(cities.length);
        console.log(cities);
        for (i=0; i < cities.length; i++){
            var newCity = $("<button type='button' class='list-group-item list-group-item-action'>");
            newCity.text(cities[i]);
            console.log(cities[i]);
            $("#listCities").append(newCity);
        }
     }    
 };
 
 initStore();

function apiCallOut(city){
        console.log(city);
        var temp;
        var humidity;
        var windSpeed;
        var uvIndex;
        var lon;
        var lat;
        var iconCode;
        var apiKey = "2f83f2e43f057df57403be35ef7a51f5";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&cnt=6&appid="+apiKey;
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
        // call back function, what to do with the response after asynchronous call is finished
          .then(function(response) {
              temp = ((parseInt(response.main.temp) - 273.15) * 9/5 + 32);
              humidity = response.main.humidity;
              windSpeed = response.wind.speed;
              lon = response.coord.lon;
              lat = response.coord.lat;
              iconCode = response.weather[0].icon;
              var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png"; // Getting icon from the weather web page
              console.log(response);
              console.log(temp+" "+humidity+" "+windSpeed+" "+lon+" "+lat);
              var date = moment().format('dddd LL'); // Getting the current date using moment.js library
              $("#nameCity").html(`<h4 class="card-title" id="nameCity">${response.name}<img id='wiconHeader' src=${iconurl} alt='Weather icon'>${" " + date}</h4>`); 
              $("#temperature").text("Temperature: "+temp);
              $("#humidity").text("Humidity: "+humidity);
              $("#windSpeed").text("Wind Speed: "+windSpeed);
              $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey,
                method: "GET"
              })
              .then(function(responseUV) {
                console.log(responseUV);
                uvIndex = responseUV.value;
                $("#uvIndex").text(" "+uvIndex);
                bgUvIndex(uvIndex);
              });    
    });

};

function bgUvIndex(uvIndex){
    if (uvIndex >= 0 && uvIndex <3 ){
        $("#uvIndex").css("background-color", "lightgreen");
    } else if (uvIndex >= 3 && uvIndex < 6 ){
        $("#uvIndex").css("background-color", "yellow");
    } else if (uvIndex >= 6 && uvIndex < 8 ){
        $("#uvIndex").css("background-color", "orange");
    } else if (uvIndex >= 8 && uvIndex < 11 ){
        $("#uvIndex").css("background-color", "red");
    }else if (uvIndex >= 11){
        $("#uvIndex").css("background-color", "violet");
    }
};