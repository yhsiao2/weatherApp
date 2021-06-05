window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureFeelsLike = document.querySelector('.temperature-feelslike');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconID = document.querySelector('.icon-image')
    let iconLink = document.querySelector('.icon-display')
    let imgDesc = document.querySelector('.image-description')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
    
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=5f33406fe63cfed5f82941f7a0cb411b`;

            fetch(api) //fetches API data 
            .then(response => { //does line 12 once it receives the data
                return response.json();
            }) 
            .then(data =>{
                console.log(data);
                const {temp, feels_like}= data.main;
                const {name} = data;
                const {icon, description} = data.weather[0];
                const iconUrl =`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">`;
                 //set DOM elements 
                temperatureDegree.textContent = temp;
                temperatureFeelsLike.textContent = feels_like;
                locationTimezone.textContent = name;


                iconID.textContent = icon;
                iconLink.innerHTML = iconUrl;
                
                imgDesc.textContent = description;
                
                

               
            })
        });
       
    }
});

