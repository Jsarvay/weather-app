$(document).ready(function() {
var storedCities = "";
var city = "";
var lastCity = "";

function citySearch(){
    var queryURL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=7117266e273e49cf62493c79487eb680`;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    })
}

//Get city info from user hitting the submit button
    $(".submit").on("click", function(event){
        event.preventDefault();
        if($("#city-input").val() == ""){
            return;
        }
        else{
            var city = $("#city-input").val();
            console.log(city);
            lastCity = JSON.stringify($("#city-input").val());
            localStorage.setItem("lastCity", lastCity);
            $("#city-input").val("");
            citySearch();
        }
    })
});