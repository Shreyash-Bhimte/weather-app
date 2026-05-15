// ── Config ───────────────────────────────────────────────────
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// ── DOM Elements ─────────────────────────────────────────────
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-msg');

// ── Weather Icon Map ──────────────────────────────────────────
function getWeatherEmoji(iconCode) {
  const iconMap = {
    '01d': '☀️',  // clear sky day
    '01n': '🌙',  // clear sky night
    '02d': '⛅',  // few clouds day
    '02n': '☁️',  // few clouds night
    '03d': '☁️',  // scattered clouds
    '03n': '☁️',
    '04d': '☁️',  // broken clouds
    '04n': '☁️',
    '09d': '🌧️',  // shower rain
    '09n': '🌧️',
    '10d': '🌦️',  // rain day
    '10n': '🌧️',  // rain night
    '11d': '⛈️',  // thunderstorm
    '11n': '⛈️',
    '13d': '❄️',  // snow
    '13n': '❄️',
    '50d': '🌫️',  // mist
    '50n': '🌫️',
  };

  return iconMap[iconCode] || '🌡️';
}

// ── Render Weather Data ───────────────────────────────────────
function renderWeather(data) {
  const cityName     = data.name;
  const country      = data.sys.country;
  const temp         = Math.round(data.main.temp);
  const humidity     = data.main.humidity;
  const windSpeed    = Math.round(data.wind.speed * 3.6); // m/s → km/h
  const condition    = data.weather[0].description;
  const iconCode     = data.weather[0].icon;

  document.getElementById('city-name').textContent    = `${cityName}, ${country}`;
  document.getElementById('temperature').textContent  = `${temp}°C`;
  document.getElementById('humidity').textContent     = `${humidity}%`;
  document.getElementById('wind-speed').textContent   = `${windSpeed} km/h`;
  document.getElementById('condition').textContent    = condition;
  document.getElementById('weather-icon').textContent = getWeatherEmoji(iconCode);

  weatherCard.style.display = 'flex';
  errorMsg.textContent = '';
}

// ── Fetch Weather Data ────────────────────────────────────────
async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  console.log('API Response:', data);

  if (data.cod === 200) {
    renderWeather(data);
  }
}

// ── Handle Search ─────────────────────────────────────────────
function handleSearch() {
  const city = cityInput.value.trim();

  if (city === '') return;

  fetchWeather(city);
}

// ── Event Listeners ───────────────────────────────────────────
searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});