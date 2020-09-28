$(document).ready(function() {

var recentCities = [];
var lastCity = "";

function init(){
    var storedCities = JSON.parse(localStorage.getItem("stored"));
    lastCity = JSON.parse(localStorage.getItem("lastCity"));
    if(storedCities !== null){
        recentCities = storedCities;
        cityButton();
    }
    if(lastCity !== null){
        lastSearch();
    }
};

function storeCity() {
    localStorage.setItem("stored", JSON.stringify(recentCities));
};

function cityButton() {
    $(".previous-city").empty();
    for(var j = 0; j < recentCities.length; j++){
        $(".previous-city").append($("<button>").text(recentCities[j]));
    }
};

init();


//Get city info from user hitting the submit button
    $(".submit").on("click", function(event){
        event.preventDefault();
        if($("#city-input").val() == ""){
            return;
        }
        else{
            var city = $("#city-input").val();
            var cityFormat = city.split(" ");
            var search = cityFormat.join(" ");
            console.log(city);
            recentCities.push($("#city-input").val());
            lastCity = JSON.stringify($("#city-input").val());
            localStorage.setItem("lastCity", lastCity);
            $("#city-input").val("");
            //citySearch();
            var key = "7117266e273e49cf62493c79487eb680";
            var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;
            console.log(queryURL);
            //Ajax call for current weather
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $(".current-city").empty()
                $(".current-city").append($("<h2>").attr("class", "float-left city-name"));
                $(".city-name").text(response.name);
                $(".current-city").append($("<img>").attr("src", `http://openweathermap.org/img/w/${response.weather[0].icon}.png`));
                var far = Math.floor(response.main.temp - 273.15) * 1.80 + 32;
                var farFixed = parseFloat(far).toFixed(1);
                console.log(far);
                $(".current-city").append($("<h3>").text("Temperature: " + farFixed + " F"));
                $(".current-city").append($("<h3>").text("Humidity: " + response.main.humidity + "%"));
                $(".current-city").append($("<h3>").text("Wind Speed: " + response.wind.speed + " MPH"));
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                var queryURLTwo = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`;
                //Ajax Call for UV index
                $.ajax({
                    url: queryURLTwo,
                    method: "GET",
                }).then(function (UV) {
                    console.log(UV);
                    var uvIndex = UV.value;
                    if(uvIndex > 0 && uvIndex <= 3) {
                        $(".current-city").append($("<h3>").attr("class", "low"));
                        $(".low").text("UV Index: " + uvIndex);
                    }
                    else if(uvIndex > 3 && uvIndex <= 6) {
                        $(".current-city").append($("<h3>").attr("class", "mod"));
                        $(".mod").text("UV Index: " + uvIndex);
                    }
                    else if(uvIndex > 6 && uvIndex <= 8) {
                        $(".current-city").append($("<h3>").attr("class", "high"));
                        $(".high").text("UV Index: " + uvIndex);
                    }
                    else if(uvIndex > 8 && uvIndex <= 11) {
                        $(".current-city").append($("<h3>").attr("class", "vhigh"));
                        $(".vhigh").text("UV Index: " + uvIndex);
                    }
                    else if (uvIndex > 11) {
                        $(".current-city").append($("<h3>").attr("class", "extreme"));
                        $(".extreme").text("UV Index: " + uvIndex);
                    }
                });

                var queryURLThree = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${key}`;
                //Ajax call for five day forecast
                $.ajax({
                    url: queryURLThree,
                    method: "GET",
                }).then(function (five) {
                    console.log(five);
                    $(".five-day").empty();
                    var count = 1;
                    for(var i = 0; i < 5; i++){
                        $(".five-day").append($("<div>").attr("class", `card col-md-2 float-left ${i}`));
                        var date = moment().add(count, 'days').calendar().split(" at")[0];
                        $(`.${i}`).append($("<h4>").text(date));
                        count++;
                        var weatherImage = $("<img>").attr("src", `http://openweathermap.org/img/w/${five.list[i].weather[0].icon}.png`);
                        $(weatherImage).attr("class", "icon");
                        $(`.${i}`).append(weatherImage);
                        var farFore = Math.floor(five.list[i].main.temp_max - 273.15) * 1.80 + 32;
                        var farForeFixed = parseFloat(farFore).toFixed(1);
                        $(`.${i}`).append($("<p>").text("Temp: " + farForeFixed + " F"));
                        $(`.${i}`).append($("<p>").text("Humidity: " + five.list[i].main.humidity + " %"));
                    }
                });
            });
            storeCity();
            cityButton();
        }
    })

    function lastSearch() {
            var city = lastCity;
            var cityFormat = city.split(" ");
            var search = cityFormat.join(" ");
            console.log(city);
            //citySearch();
            var key = "7117266e273e49cf62493c79487eb680";
            var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;
            console.log(queryURL);
            //Ajax call for current weather
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                $(".current-city").empty()
                $(".current-city").append($("<h2>").attr("class", "float-left city-name"));
                $(".city-name").text(response.name);
                $(".current-city").append($("<img>").attr("src", `http://openweathermap.org/img/w/${response.weather[0].icon}.png`));
                var far = Math.floor(response.main.temp - 273.15) * 1.80 + 32;
                var farFixed = parseFloat(far).toFixed(1);
                console.log(far);
                $(".current-city").append($("<h3>").text("Temperature: " + farFixed + " F"));
                $(".current-city").append($("<h3>").text("Humidity: " + response.main.humidity + "%"));
                $(".current-city").append($("<h3>").text("Wind Speed: " + response.wind.speed + " MPH"));
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                var queryURLTwo = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`;
                //Ajax Call for UV index
                $.ajax({
                    url: queryURLTwo,
                    method: "GET",
                }).then(function (UV) {
                    console.log(UV);
                    var uvIndex = UV.value;
                    if(uvIndex > 0 && uvIndex <= 3) {
                        $(".current-city").append($("<h3>").attr("class", "low"));
                        $(".low").text("UV Index: " + uvIndex);
                    }
                    else if(uvIndex > 3 && uvIndex <= 6) {
                        $(".current-city").append($("<h3>").attr("class", "mod"));
                        $(".mod").text("UV Index: " + uvIndex);
                    }
                    else if(uvIndex > 6 && uvIndex <= 8) {
                        $(".current-city").append($("<h3>").attr("class", "high"));
                        $(".high").text("UV Index: " + uvIndex);
                    }
                    else if(uvIndex > 8 && uvIndex <= 11) {
                        $(".current-city").append($("<h3>").attr("class", "vhigh"));
                        $(".vhigh").text("UV Index: " + uvIndex);
                    }
                    else if (uvIndex > 11) {
                        $(".current-city").append($("<h3>").attr("class", "extreme"));
                        $(".extreme").text("UV Index: " + uvIndex);
                    }
                });

                var queryURLThree = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${key}`;
                //Ajax call for five day forecast
                $.ajax({
                    url: queryURLThree,
                    method: "GET",
                }).then(function (five) {
                    console.log(five);
                    $(".five-day").empty();
                    var count = 1;
                    for(var i = 0; i < 5; i++){
                        $(".five-day").append($("<div>").attr("class", `card col-md-2 float-left ${i}`));
                        var date = moment().add(count, 'days').calendar().split(" at")[0];
                        $(`.${i}`).append($("<h4>").text(date));
                        count++;
                        var weatherImage = $("<img>").attr("src", `http://openweathermap.org/img/w/${five.list[i].weather[0].icon}.png`);
                        $(weatherImage).attr("class", "icon");
                        $(`.${i}`).append(weatherImage);
                        var farFore = Math.floor(five.list[i].main.temp_max - 273.15) * 1.80 + 32;
                        var farForeFixed = parseFloat(farFore).toFixed(1);
                        $(`.${i}`).append($("<p>").text("Temp: " + farForeFixed + " F"));
                        $(`.${i}`).append($("<p>").text("Humidity: " + five.list[i].main.humidity + " %"));
                    }
                });
            });
    };
});