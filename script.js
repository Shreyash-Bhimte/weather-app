// ── Config ───────────────────────────────────────────────────
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// ── DOM Elements ─────────────────────────────────────────────
const searchBtn   = document.getElementById('search-btn');
const cityInput   = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMsg    = document.getElementById('error-msg');

// ── Loading State ─────────────────────────────────────────────
function setLoading(isLoading) {
  if (isLoading) {
    searchBtn.textContent = 'Loading...';
    searchBtn.disabled = true;
  } else {
    searchBtn.textContent = 'Search';
    searchBtn.disabled = false;
  }
}

// ── Weather Icon Map ──────────────────────────────────────────
function getWeatherEmoji(iconCode) {
  const iconMap = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  };
  return iconMap[iconCode] || '🌡️';
}

// ── Show Error ────────────────────────────────────────────────
function showError(message) {
  errorMsg.textContent = message;
  weatherCard.style.display = 'none';
}

// ── Clear Error ───────────────────────────────────────────────
function clearError() {
  errorMsg.textContent = '';
}

// ── Render Weather Data ───────────────────────────────────────
function renderWeather(data) {
  const cityName  = data.name;
  const country   = data.sys.country;
  const temp      = Math.round(data.main.temp);
  const humidity  = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6);
  const condition = data.weather[0].description;
  const iconCode  = data.weather[0].icon;

  document.getElementById('city-name').textContent    = `${cityName}, ${country}`;
  document.getElementById('temperature').textContent  = `${temp}°C`;
  document.getElementById('humidity').textContent     = `${humidity}%`;
  document.getElementById('wind-speed').textContent   = `${windSpeed} km/h`;
  document.getElementById('condition').textContent    = condition;
  document.getElementById('weather-icon').textContent = getWeatherEmoji(iconCode);

  weatherCard.style.display = 'flex';
  clearError();
}

// ── Fetch Weather Data ────────────────────────────────────────
async function fetchWeather(city) {
  setLoading(true);

  try {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      renderWeather(data);
      cityInput.value = '';
    } else if (data.cod === '404') {
      showError('City not found. Please check the spelling and try again.');
    } else if (data.cod === 401) {
      showError('Invalid API key. Please check your config.js file.');
    } else {
      showError('Something went wrong. Please try again.');
    }

  } catch (error) {
    showError('Network error. Please check your internet connection.');
    console.error('Fetch error:', error);
  } finally {
    setLoading(false);
  }
}

// ── Handle Search ─────────────────────────────────────────────
function handleSearch() {
  const city = cityInput.value.trim();

  if (city === '') {
    showError('Please enter a city name.');
    return;
  }

  fetchWeather(city);
}

// ── Event Listeners ───────────────────────────────────────────
searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});