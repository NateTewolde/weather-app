formatSearchButton();
formatEnterKey();

function formatSearchButton() {
  let searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", searchWeather);
}

function searchWeather() {
  let searchBox = document.querySelector("#search-box");
  displayWeather(searchBox.value);
}

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=adb02dc87b0340ae06c3cdb88d6233b5`,
    { mode: "cors" }
  );
  return await response.json();
}

function displayWeather(city) {
  const weatherSection = document.querySelector(".weather-section");
  removeAllChildNodes(weatherSection);

  let cityName = document.createElement("div");
  let cityTemp = document.createElement("div");
  let cityDesc = document.createElement("div");

  getWeather(city).then((weather) => {
    cityName.textContent = weather.name;
    cityTemp.textContent =
      Math.round(1.8 * (+weather.main.temp - 273) + 32) + "°";
    cityDesc.textContent = weather.weather[0].description;
  });

  weatherSection.appendChild(cityName);
  weatherSection.appendChild(cityTemp);
  weatherSection.appendChild(cityDesc);
}
function formatEnterKey() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchWeather();
    }
  });
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
