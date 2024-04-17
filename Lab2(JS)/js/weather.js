// JavaScript для запроса погоды
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e9df9294165b3a5e0c4ef0e3f1aedffd';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKey}&units=metric&lang=ru`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherDataDiv = document.getElementById('weather-data');
            if (weatherDataDiv && data.main && data.main.temp) {
                weatherDataDiv.innerHTML = `Температура: ${data.main.temp} &deg;C`;
            } else {
                throw new Error('Ошибка в данных погоды');
            }
        })
        .catch(error => {
            console.error('Ошибка запроса погоды: ', error);
            const weatherDataDiv = document.getElementById('weather-data');
            if (weatherDataDiv) {
                weatherDataDiv.innerHTML = 'Не удалось загрузить данные о погоде';
            }
        });
});
