import {weatherApiKey} from './config.js';

document.getElementById("searchBtn").addEventListener("click", citySearch);
document.getElementById("myLocation").addEventListener("click", locationCheck);


window.addEventListener('load', ()=>
{
    //local variables
    let long;
    let lat;
    let temperatureFeelsLike = document.querySelector('.temperature-feelslike');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let countryName = document.querySelector('.country')
    let iconID = document.querySelector('.icon-image')
    let iconLink = document.querySelector('.icon-display')
    let imgDesc = document.querySelector('.image-description')

    let pm2_5Measure = document.querySelector('.PM')
    let humidityMeasure = document.querySelector('.humidity')
    
    
    let degreeSection = document.querySelector('.degree-section')
    const degreeSectionSpan = document.querySelector('.degree-section span')

    let degreeFeels = document.querySelector('.degree-feels')
    const degreeFeelsSpan = document.querySelector('.degree-feels span')

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position =>
        {
                long = position.coords.longitude;
                lat = position.coords.latitude;
        
                const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${weatherApiKey}`;

                fetch(api) //fetches API data 
                .then(apiResponse => 
                    { //does line 12 once it receives the data
                    return apiResponse.json();
                    }) 
                .then(apiData =>
                {
                    console.log(apiData);
                    const {temp, feels_like, humidity}= apiData.main;
                    const {name} = apiData;
                    const{country} = apiData.sys;
                    const {icon, description} = apiData.weather[0];
                    const iconUrl =`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">`;
                    //set DOM elements 
                    temperatureDegree.textContent = temp;
                    temperatureFeelsLike.textContent = feels_like;
                    locationTimezone.textContent = name;
                    countryName.textContent = country;
                    iconID.textContent = icon;
                    iconLink.innerHTML = iconUrl;                
                    imgDesc.textContent = description;               
                    humidityMeasure.textContent = humidity;

                    let realFahrenheit = (temp * (9/5)) + 32;
                    let feelFahrenheight = (feels_like * (9/5)) + 32;

                    //change temperature between Celcius and Fahrenheit
                    degreeSection.addEventListener('click', () =>
                    {
                        if(degreeSectionSpan.textContent === '\u2103')
                        {
                            degreeSectionSpan.textContent = '\u2109'; //F
                            temperatureDegree.textContent = realFahrenheit.toFixed(2);

                            degreeFeelsSpan.textContent = '\u2109'; //F
                            temperatureFeelsLike.textContent = feelFahrenheight.toFixed(2);
                        }
                        else{
                            degreeSectionSpan.textContent = '\u2103';
                            temperatureDegree.textContent = temp;

                            degreeFeelsSpan.textContent = '\u2103';
                            temperatureFeelsLike.textContent = feels_like;
                        }
                        
                
                    })

                })

            const airQualityApi = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${weatherApiKey}`;

            fetch(airQualityApi) //fetches API data 
            .then(airQualityResponse => { //does line 12 once it receives the data
                return airQualityResponse.json();
            }) 
            .then(airQualityData =>
                {
                console.log(airQualityData);
                const {pm2_5}=airQualityData.list[0].components;
              
                pm2_5Measure.textContent = pm2_5;
                })
        },

        //fallback if user denies geolocation access
        function cityInput() 
        {
            let cityName = prompt('Enter City. \nEx: London or New york', "")
            let countryNameInput = prompt('Enter 2-letter country code. \nEx: GB or US', "");
         
 
             const api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryNameInput}&units=metric&appid=${weatherApiKey}`;
 
             fetch(api) //fetches API data 
             .then(apiResponse => 
                { //does line 12 once it receives the data
                 return apiResponse.json();
                }) 
             .then(apiData =>
                {
                 console.log(apiData);
                 const {temp, feels_like, humidity}= apiData.main;
                 const {name} = apiData;
                 const{country} = apiData.sys;
                 const {icon, description} = apiData.weather[0];
                 const iconUrl =`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">`;
                 
                  //set DOM elements 
                 temperatureDegree.textContent = temp;
                 temperatureFeelsLike.textContent = feels_like;
                 locationTimezone.textContent = name;
                 countryName.textContent = country;
                 iconID.textContent = icon;
                 iconLink.innerHTML = iconUrl;
                 imgDesc.textContent = description;
                 humidityMeasure.textContent = humidity;
 
                 pm2_5Measure.textContent = "Enable location access.";

                let realFahrenheit = (temp * (9/5)) + 32;
                let feelFahrenheight = (feels_like * (9/5)) + 32;

                degreeSection.addEventListener('click', () =>
                {
                    if(degreeSectionSpan.textContent === '\u2103')
                    {
                        degreeSectionSpan.textContent = '\u2109'; //F
                        temperatureDegree.textContent = realFahrenheit.toFixed(2);

                        degreeFeelsSpan.textContent = '\u2109'; //F
                        temperatureFeelsLike.textContent = feelFahrenheight.toFixed(2);
                    }
                    else{
                        degreeSectionSpan.textContent = '\u2103';
                        temperatureDegree.textContent = temp;

                        degreeFeelsSpan.textContent = '\u2103';
                        temperatureFeelsLike.textContent = feels_like;
                    }
                        
                
                    })
                })
 
        })
         

    }
    
  
});

function citySearch() 
{
            let cityName = prompt('Enter City. \nEx: London or New york', "")
            let countryNameInput = prompt('Enter 2-letter country code.\nEx: GB or US', "");
            let temperatureFeelsLike = document.querySelector('.temperature-feelslike');
            let temperatureDegree = document.querySelector('.temperature-degree');
            let locationTimezone = document.querySelector('.location-timezone');
            let countryName = document.querySelector('.country')
            let iconID = document.querySelector('.icon-image')
            let iconLink = document.querySelector('.icon-display')
            let imgDesc = document.querySelector('.image-description')
            let pm2_5Measure = document.querySelector('.PM')
            let humidityMeasure = document.querySelector('.humidity')
         
 
             const api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryNameInput}&units=metric&appid=${weatherApiKey}`;
 
             fetch(api) //fetches API data 
             .then(apiResponse => 
                { //does line 12 once it receives the data
                 return apiResponse.json();
                }) 
             .then(apiData =>
                {
                 console.log(apiData);
                 const {temp, feels_like, humidity}= apiData.main;
                 const {name} = apiData;
                 const{country} = apiData.sys;
                 const {icon, description} = apiData.weather[0];
                 const iconUrl =`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">`;
                 
                  //set DOM elements 
                 temperatureDegree.textContent = temp;
                 temperatureFeelsLike.textContent = feels_like;
                 locationTimezone.textContent = name;
                 countryName.textContent = country;
                 iconID.textContent = icon;
                 iconLink.innerHTML = iconUrl;
                 imgDesc.textContent = description;
                 humidityMeasure.textContent = humidity;
 
                 pm2_5Measure.textContent = "Enable location access.";
                 
                })
                
};

function locationCheck()
{
    navigator.geolocation.watchPosition(function() {
        window.location.reload();
        console.log("nigga");
          },
      function(error) {
        if (error.code == error.PERMISSION_DENIED)
          alert("Please enable location access.")
      });
   
};