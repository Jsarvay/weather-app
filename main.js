$(document).ready(function() {
var storedCities = "";
var city = "";

//Get city info from user hitting the submit button
    $(".submit").on("click", function(event){
        event.preventDefault();
        if($("#city-input").val() == ""){
            return;
        }
        else{
            city = JSON.stringify($("#city-input").val());
            console.log(city);
            localStorage.setItem("lastCity", city);
            $("#city-input").val("");
        }
    })
});