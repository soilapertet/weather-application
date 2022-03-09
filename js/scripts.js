const form = document.querySelector(".weather-form");
const input = document.querySelector("input");
let weatherIcon;

const errorMessage = document.querySelector(".error-msg");

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const inputtedCity = input.value;
  const apiKey = "336a341afbdb8822005a1515ab344ce6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputtedCity}&appid=${apiKey}&units=metric`;
  
  if(inputtedCity === "") {
    errorMessage.innerText = "* Please enter a valid city in the required field."
  } 

  // Pass the URL we want to access to the fetch() method
  fetch(url)
  .then(response => response.json()) // convert the response data to the desired JSON format
  .then(data => {

    const { main, name, sys, weather } = data;
    const icon = weather[0]["icon"];

    switch(true) {
      case icon === "01d":
        weatherIcon = "animated/day.svg";
        break;
      case icon === "01n":
        weatherIcon = "animated/night.svg";
        break;
      case icon === "02d":
          weatherIcon = "animated/cloudy-day-3.svg";
          break;
      case icon === "02n":
          weatherIcon = "animated/cloudy-night-3.svg";
          break;
      case icon === "03d":
        weatherIcon = "animated/cloudy-day-2.svg";
        break;
      case icon === "03n":
        weatherIcon = "animated/cloudy-night-2.svg";
        break;
      case icon === "04d" || icon === "04n":
        weatherIcon = "animated/cloudy.svg";
        break;
      case icon === "09d" || icon === "09n":
        weatherIcon = "animated/rainy-5.svg";
        break;
      case icon === "10d":
        weatherIcon = "animated/rainy-3.svg";
        break;
      case icon === "10n":
        weatherIcon = "animated/rainy-6.svg";
        break;
      case icon === "11d" || icon === "11n":
        weatherIcon = "animated/thunder.svg";
        break;
      case icon === "13d" || icon === "13n":
        weatherIcon = "animated/snowy-6.svg";
        break;
      case icon === "50d":
        weatherIcon = "animated/snowy-4.svg";
        break;
    }
    
    const section = document.createElement("section");
    section.classList.add("city");
    const weatherContent = 
    `
    <h2 class="city-name" data-name="${name}, ${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">
      ${Math.round(main.temp)}<sup>°C</sup>
      <span class="high-low-temp">H: ${Math.round(main.temp_max)}<sup>°C</sup> | L: ${Math.round(main.temp_min)}<sup>°C</sup></span>
    </div>
    <figure>
      <img class="city-icon" src=${weatherIcon} alt="${weather[0]["main"]}">
      <figcaption>${weather[0]["description"]}</figcaption>
    </figure>
    `;
    section.innerHTML = weatherContent;

    const cities = document.querySelector("#cities");
    cities.append(section);

    form.reset();
    input.focus();
  })
  .catch(() => {
    errorMessage.textContent = "* Please search for a valid city.";
  });
});

input.addEventListener("input", () => {
  if(errorMessage.innerText !== "") {
    errorMessage.innerText = "";
  }
});

