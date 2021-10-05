$(document).ready(function(){
    $('.modal').modal();
  });

// var instance = M.Modal.getInstance('modal');
// instance.open('modal');


//openWeather OneCall data(temp, humidity, wind speed, wind gusts, precipitation) 
function openWeatherCall(latitude, longitude) {
    var openWeatherUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lng=${longitude}&units=imperial&exclude={alerts,hourly}&appid=c4a186ac3a697bd2fb942f498b34386c`;
    fetch(openWeatherUrl)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        let temp = data.current.temp;
        let humidity = data.current.humidity;
        let windSpeed = data.current.wind_speed;
        let windGust = data.current.wind_gust;
        //only found precip on the minutely status
        let precip = data.minutely[0].precipitation;

        //append data to designated html element here
        console.log(temp,humidity,windSpeed,windGust,precip);
        
    });
};



var latitude;
var longitude;
var nationalParkApi = "S3FQh2LolEVzZgRjcg7QskevKLZrUOfgYYhWZucF";
// var stateCode = document.getElementById("#stateInput").value;
var stateCode = "CA";

// ${searchInput}

var nationalParkUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${nationalParkApi}`;


// var nationalParkName = document.getElementById("#parkNameInput");
var nationalParkName = "Presidio of San Francisco";

// function apiCallState() {
//     fetch(nationalPark)
// }


function apiCallName() {
    fetch(nationalParkUrl)
        .then(function (response) {
            return response.json();
        }).then(function (callData) {
            // console.log(latitude, longitude, parkName);
            // console.log(callData.data.length);
            let i = 0;
            for (i; i < callData.data.length; i++) {
                console.log(callData.data[i].fullName);
                // let liEl = document.createElement("button");
                // liEl.textContent = callData.data[i].fullName;
                // searchResults.append(liEl);
                if (nationalParkName == callData.data[i].fullName) {
                    console.log(i, "name matches!");
                    // console.log(callData.data[i].latitude, callData.data[i].longitude);
                    break;
                }
            }
            console.log(callData.data[i].images);
            let image = callData.data[i].images[Math.floor(Math.random() * callData.data[i].images.length)].url;
            console.log(image);
            latitude = callData.data[i].latitude;
            longitude = callData.data[i].latitude;
            // one call and wildfire call goes here passing the lat and long
            console.log("Out of the loop");
            // console.log(latitude, longitude, i);
            wildfireCall(latitude, longitude);
            openWeatherCall(latitude, longitude)
        });
}



function wildfireCall(latitude, longitude) {

    var wildfireUrl = `https://api.ambeedata.com/latest/fire?lat=${latitude}&lng=${longitude}`;
    fetch(wildfireUrl, {
            "method": "GET",
            "headers": {
                "x-api-key": "4fd71a9226eb5db201124af457f8efe834d262c977ad3178d2c681b433e7a6af",
                "Content-type": "application/json"
            }
        })
        .then(response => {
            console.log(response);
            return response.json();
        }).then(function (data) {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });
}


var stateCodes = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'
];



function appendSt() {
    const stateDD = document.querySelector('#stateDD');
    for (i=0; i<stateCodes.length; i++) {
        var createOption = document.createElement('option');
        createOption.textContent = stateCodes[i];
        stateDD.append(createOption)
    }
};
var modalButton = document.querySelector(".modal-trigger");
modalButton.addEventListener("click",appendSt);
