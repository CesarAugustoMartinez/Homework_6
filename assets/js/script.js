//var iconcode = a.weather[0].icon;
var iconcode = "10n";
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"; // Getting icon from the weather web page
console.log(iconurl);
$('#wiconHeader').attr('src', iconurl);