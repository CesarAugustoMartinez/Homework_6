//var iconcode = a.weather[0].icon;
var iconcode = "10n";
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
console.log(iconurl);
$('#wiconHeader').attr('src', iconurl);