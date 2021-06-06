import {weatherApiKey} from './config.js';

window.addEventListener('load', ()=>{
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


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
    
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${weatherApiKey}`;

            fetch(api) //fetches API data 
            .then(apiResponse => { //does line 12 once it receives the data
                return apiResponse.json();
            }) 
            .then(apiData =>{
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
            })

            const airQualityApi = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${weatherApiKey}`;

            fetch(airQualityApi) //fetches API data 
            .then(airQualityResponse => { //does line 12 once it receives the data
                return airQualityResponse.json();
            }) 
            .then(airQualityData =>{
                console.log(airQualityData);
                const {pm2_5}=airQualityData.list[0].components;
                
                pm2_5Measure.textContent = pm2_5;

               
            })
        },



        //fallback if user denies geolocation access
        function cityInput(){
           let cityName = prompt('Enter City', "")
           let countryNameInput = prompt('Enter Country', "");
        

            const api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryNameInput}&units=metric&appid=${weatherApiKey}`;

            fetch(api) //fetches API data 
            .then(apiResponse => { //does line 12 once it receives the data
                return apiResponse.json();
            }) 
            .then(apiData =>{
                console.log(apiData);
                const {temp, feels_like, humidity}= apiData.main;
                const {name} = apiData;
                const{country} = apiData.sys;
                const {icon, description} = apiData.weather[0];
                const iconUrl =`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">`;
                const {lat,lon} = apiData.coord;
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
            
    

        })
        
       
    }
  
});

