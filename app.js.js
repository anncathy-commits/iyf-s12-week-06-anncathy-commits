// ============================================
// LESSON 12 — CLASSWORK EXERCISE: Weather Dashboard (Week 6 deliverable + graded gate)
// GIVEN: index.html, styles.css, .gitignore, config.example.js, .github/workflows/deploy.yml
// YOU WRITE: this file.  Everything goes at the ROOT of iyf-s12-week-06-{username}.
//
// STEP 0 — THE KEY, BEFORE ANY COMMIT (do this first, with the class):
//   1. copy config.example.js → config.js, paste your OpenWeatherMap key in config.js

//   2. git status  →  config.js must NOT be listed (the .gitignore hides it)
//   3. NEVER type the key in this file. API_KEY already exists: config.js defines it.
//   Season 11: 31 of 34 repos leaked a key. A key in git history stays forever (-5).
// ============================================

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const MAX_RECENT = 5;

// ---------- DOM elements (given) ----------
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");


// ============================================
// STEP 1 — fetchWeather(city): fetch, check response.ok, return the JSON
//   - URL: `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
//   - if (!response.ok):  404 → throw new Error("City not found")
//                         401 → throw new Error("API key not valid yet …")
//                         else → throw new Error("Failed to fetch weather data")
//   WHY: fetch does NOT reject on 404. It only rejects when there's no network.
// ============================================
async function fetchWeather(city) {
}


// ============================================
// STEP 2 — getWeather(city): the three states
//   - if API_KEY is missing (typeof API_KEY === "undefined" || !API_KEY):
//       showError("Missing API key: copy config.example.js to config.js …") and return
//   - showLoading(); hideError();
//   - try    { const data = await fetchWeather(city); displayWeather(data); saveToHistory(data.name); }
//   - catch  { showError(err.name === "TypeError" ? "Network error — check your connection" : err.message); }
//   - finally{ hideLoading(); }   ← runs whether it worked or not
// ============================================
async function getWeather(city) {
}


// ============================================
// STEP 3 — displayWeather(data): fill all EIGHT fields with textContent
//   city "Nairobi, KE" (data.name, data.sys.country) · icon src + alt
//   temperature "23°C" (Math.round) · description · feels like · humidity "60%"
//   wind "4.12 m/s" · pressure "1018 hPa"
//   then remove "hidden" from weatherDisplay
//   Tip: console.log(data) first and read the shape.
// ============================================
function displayWeather(data) {
}

// Helpers (given)
function showLoading() { loading.classList.remove("hidden"); weatherDisplay.classList.add("hidden"); }
function hideLoading() { loading.classList.add("hidden"); }
function showError(message) { errorBox.textContent = message; errorBox.classList.remove("hidden"); }
function hideError() { errorBox.classList.add("hidden"); }


// ============================================
// STEP 4 — recent searches in localStorage (a preview of Week 7)
//   loadRecent(): JSON.parse(localStorage.getItem("recent")) || []   — wrap in try/catch
//   saveToHistory(city): put city first, remove any duplicate (ignore case),
//                        keep 5, localStorage.setItem("recent", JSON.stringify(recent)), renderHistory()
//   renderHistory(): one <li><button class="history-item">city</button></li> per city (textContent)
// ============================================
function loadRecent() {
}
function saveToHistory(city) {
}
function renderHistory() {
}
let recent = loadRecent();


// ============================================
// STEP 5 — events
//   - submit on the form: preventDefault, trim, getWeather(city)
//   - ONE click listener on historyList (delegation, Week 5):
//       const btn = event.target.closest(".history-item"); if (btn) getWeather(btn.textContent);
// ============================================


// renderHistory();   ← uncomment when STEP 4 works


// ============================================
// STEP 6 — DEPLOY (the graded gate) — see the task file, "Deploy — the graded gate"
//   1. Settings → Secrets and variables → Actions → New repository secret
//        Name: OPENWEATHER_API_KEY    Value: your key
//   2. Settings → Pages → Source: GitHub Actions
//   3. .github/workflows/deploy.yml is already here — commit it and push
//   4. Actions tab → green tick → open the URL
//   CHECK:  git log -p | grep -i appid   → only ${API_KEY}, never a real key
//
// COMMITS as you go:
//   git commit -m "Add: weather fetch with response.ok check"
//   git commit -m "Add: loading, error and success states"
//   git commit -m "Add: recent searches in localStorage"
//   git commit -m "Add: GitHub Pages deploy workflow"
// ============================================
