# Weather App 🌤️

A clean, minimal weather app built with pure HTML, CSS, and JavaScript.
Search any city and get live weather data including temperature, humidity, wind speed, and conditions.

🔗 **Live Demo:** [Click here](https://shreyash-bhimte.github.io/weather-app)

---

## Features

- Search weather by city name
- Displays temperature (°C), weather condition, humidity, and wind speed
- Weather emoji based on current conditions
- Graceful error handling (invalid city, empty input, network errors)
- Loading state during API fetch
- Mobile responsive design

---

## Tech Stack

- HTML5
- CSS3 (Flexbox, Media Queries, Glassmorphism)
- Vanilla JavaScript (Fetch API, Async/Await)
- [OpenWeatherMap API](https://openweathermap.org/api) (Free tier)
- GitHub Pages (Deployment)

---

## Project Structure
weather-app/
├── index.html       # App structure and layout
├── style.css        # Styling and responsive design
├── script.js        # API calls, data rendering, error handling
├── config.js        # API key — not tracked by git (see .gitignore)
└── README.md        # You are here
---

## Run Locally

1. Clone the repository
```bash
   git clone https://github.com/Shreyash-Bhimte/weather-app.git
   cd weather-app
```

2. Create a `config.js` file in the root folder
```javascript
   const API_KEY = 'your_openweathermap_api_key_here';
```

3. Open `index.html` with Live Server in VS Code

> ⚠️ `config.js` is intentionally excluded from this repo via `.gitignore`
> to protect the API key. You must create your own to run locally.

---

## What I Learned

- Structuring a frontend project from scratch
- Making real API calls using `fetch()` and `async/await`
- Handling API errors and edge cases gracefully
- CSS Flexbox layout and responsive design with media queries
- Git version control with meaningful commits
- Deploying a live site with GitHub Pages

---

## API Reference

Data provided by [OpenWeatherMap](https://openweathermap.org) under their
free tier (1,000 calls/day).

---

*Built as a portfolio project while learning web development.*
