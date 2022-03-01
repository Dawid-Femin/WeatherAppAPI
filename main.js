let lat;
let long;
const apiKey='6f6a466617a337433c5af259b63b4532';

function startApp() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (
            (e) => {
                lat = e.coords.latitude;
                long = e.coords.longitude;
                getWeatherData();
            });
    }
}

function getWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => updateWeatherData(data))
}

function updateWeatherData(data) {
    document.getElementById('weatherImg').setAttribute("src", `http://openweathermap.org/img/wn/`+data.weather[0].icon+`@2x.png`);
    document.getElementById('locationLink').innerHTML = data.name;
    document.getElementById('locationLink').href = `https://www.google.pl/maps/@${lat},${long},15z`;
    document.getElementById('temp').innerHTML = data.main.temp;
    document.getElementById('humidity').innerHTML = data.main.humidity;
    document.getElementById('cloudy').innerHTML = data.clouds.all;
    document.getElementById('windSpeed').innerHTML = data.wind.speed;
    document.getElementById('sunrise').innerHTML = new Date(data.sys.sunrise * 1000).getHours() + ':' + new Date(data.sys.sunrise * 1000).getMinutes();
    document.getElementById('sunset').innerHTML = new Date(data.sys.sunset * 1000).getHours() + ':' + new Date(data.sys.sunset * 1000).getMinutes();
}