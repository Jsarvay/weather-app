$(document).ready(function() {
var storedCities = "";
var city = "";
var lastCity = "";

/*function citySearch(){
    var queryURL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=7117266e273e49cf62493c79487eb680`;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    })
}*/

//Get city info from user hitting the submit button
    $(".submit").on("click", function(event){
        event.preventDefault();
        if($("#city-input").val() == ""){
            return;
        }
        else{
            var city = $("#city-input").val();
            var cityFormat = city.split(" ");
            var search = cityFormat.join("");
            console.log(city);
            lastCity = JSON.stringify($("#city-input").val());
            localStorage.setItem("lastCity", lastCity);
            $("#city-input").val("");
            //citySearch();
            var key = "7117266e273e49cf62493c79487eb680";
            var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;
            console.log(queryURL);
        
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $("#city-name").text(response.name);
                $("#icon").attr("src", `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
                var far = Math.floor(response.main.temp - 273.15) * 1.80 + 32;
                $(".current-city").append($("<h3>").text("Temperature: " + far + " F"));
                $(".current-city").append($("<h3>").text("Humidity: " + response.main.humidity + "%"));
                $(".current-city").append($("<h3>").text("Wind Speed: " + response.wind.speed + "MPH"));
            });
        }
    })
});