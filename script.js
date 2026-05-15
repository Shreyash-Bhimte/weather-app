// ── Config ───────────────────────────────────────────────────
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// ── DOM Elements ─────────────────────────────────────────────
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

// ── Fetch Weather Data ────────────────────────────────────────
async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  console.log('Fetching URL:', url);

  const response = await fetch(url);
  const data = await response.json();

  console.log('API Response:', data);
}

// ── Handle Search ─────────────────────────────────────────────
function handleSearch() {
  const city = cityInput.value.trim();

  if (city === '') {
    console.log('Empty input — no search made');
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