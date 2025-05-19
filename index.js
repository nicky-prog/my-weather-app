function formatDate(date) {
    let minutes = date.getMinutes();
    const hours = date.getHours();
    const dayIndex = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${days[dayIndex]} ${hours}:${minutes}`;
  }
  
  function displayTemperature(response) {
    const temperature = Math.round(response.data.temperature.current);
    const description = response.data.condition.description;
    const iconUrl = response.data.condition.icon_url;
    const humidity = response.data.temperature.humidity;
    const wind = response.data.wind.speed;
  
    document.querySelector(".current-temperature-value").innerHTML = temperature;
    document.querySelector(
      ".current-temperature-icon"
    ).innerHTML = `<img src="${iconUrl}" alt="Weather Icon" />`;
    document.querySelector("#current-date").innerHTML = formatDate(new Date());
    document.querySelector("#weather-description").innerHTML = description;
    document.querySelector("#humidity").innerHTML = `${humidity}%`;
    document.querySelector("#wind").innerHTML = `${wind}km/h`;
  }
  
  function search(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search-input");
    const newCity = searchInput.value.trim();
    if (!newCity) return;
  
    document.querySelector("#current-city").innerHTML = newCity;
  
    const apiKey = "734o96461927bb2af3te40c30c5acafb";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${apiKey}&units=metric`;
  
    axios
      .get(apiUrl)
      .then(displayTemperature)
      .catch((error) => {
        console.error("API Error:", error);
        alert("City not found or API error.");
      });
  }
  
  // Load default city on page load
  const defaultCity = "Sydney";
  axios
    .get(
      `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=734o96461927bb2af3te40c30c5acafb&units=metric`
    )
    .then(displayTemperature);
  
  document.querySelector("#search-form").addEventListener("submit", search);
  