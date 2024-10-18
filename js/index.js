//? html elemnts
const weatherForm = document.querySelector('form');
const searchBox = document.querySelector('input');
const findBtn = document.querySelector('button');
const weatherDisplay = document.querySelector('.row');
//! app variables
const apiKey = '81c6e6689ea9424da1b114106241610';
//^ functions
function getWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => console.error("Error fetching weathe data : ", error));
}
window.onload = function (){
    getWeather('Cairo');
}
function displayWeather(data) {
    const location = data.location.name;
    const current = data.current;
    const forecast = data.forecast.forecastday;
    let html = 
        `
            <div class="col-lg-4 col-md-6 left p-0 m-0">
                <div class="full-date d-flex justify-content-between p-2">
                    <span class="day">${new Date(forecast[0].date).toLocaleString('en-US', { weekday: 'long' })}</span>
                    <span class="date">${new Date(forecast[0].date).toLocaleDateString()}</span>
                </div>
                <div class="today px-3 py-5 d-flex flex-column g-3">
                    <p class="location text-capitalize text-muted">${location}</p>
                    <p class="degree display-1 fw-bold my-3">${current.temp_c}°C</p>
                    <img src="${current.condition.icon}" class="w-20">
                    <span class="text-primary">${current.condition.text}</span>
                    <ul class="d-flex align-items-center w-100 mt-3">
                        <li class="me-4">
                            <img src="./images/icon-umberella.png">
                            ${current.humidity}%
                        </li>
                        <li class="me-4">
                            <img src="./images/icon-wind.png">
                            ${current.wind_kph} km/h
                        </li>
                        <li>
                            <img src="./images/icon-compass.png">
                            ${current.wind_dir}
                        </li>
                    </ul>
                </div>
            </div>
        `;
    for(let i = 1 ; i < forecast.length ; i++){
        html += 
        `
            <div class="col-lg-4 col-md-6 middle p-0 m-0">
                <div class="full-date d-flex justify-content-center align-items-center p-2">
                    <span class="day">${new Date(forecast[i].date).toLocaleString('en-US', { weekday: 'long' })}</span>
                </div>
                <div class="tomorrow h-100 px-3 py-5 d-flex flex-column align-items-center g-3">
                    <img src="${forecast[i].day.condition.icon}" class="w-10 mt-5">
                    <p class="degree fs-3 fw-bold my-3 p-0 my-0">${forecast[i].day.maxtemp_c}°C</p>
                    <p class="m-0 p-0 text-muted">${forecast[i].day.mintemp_c}°C</p>
                    <span class="text-primary">${forecast[i].day.condition.text}</span>
                </div>
            </div>
        `;
    }
    weatherDisplay.innerHTML = html;
}
//* events
weatherForm.addEventListener('submit' , function(e){
    e.preventDefault();
    if(searchBox.value){
        getWeather(searchBox.value);
    }
});