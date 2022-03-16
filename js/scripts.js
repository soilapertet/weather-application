let weatherIcon, inputtedCity, inputtedCities;

const form = document.querySelector(".weather-form");
const input = document.querySelector("input");
const cityGrid = document.querySelector("#cities");
const errorMessage = document.querySelector(".error-msg");
const button = document.querySelector("button");

const resetGrid = () => {
  cityGrid.innerHTML = "";
}

const initiateCityArray = () => {
  // JSON.parse() returns a javascript array instead of a javascript object
  if(JSON.parse(localStorage.getItem("inputtedCities") === null)) {
    inputtedCities = [];
    console.log("NOPE!");
  } else {
    inputtedCities = JSON.parse(localStorage.getItem("inputtedCities"));
  }
  console.log(inputtedCities)
  return inputtedCities;
}

const storeToLocalStorage = () => {
  localStorage.setItem("inputtedCities", JSON.stringify(inputtedCities));
}

const validateCities = () => {
    // Check if the weather data for the city has already been presented
    const citiesArray = Array.from(document.querySelectorAll(".city"));
  
    if (citiesArray.length > 0) {
  
      const filteredArray = citiesArray.filter((city) => {
        let content = "";
        inputtedCity = input.value;
        // Nairobi,KE
        if (inputtedCity.includes(",")) {
          // Nairobi,AAAAEEEK
          if (inputtedCity.split(",")[1].length > 2) {
            // Ignore the second part of the array, e.g. AAAAEEEK and returns the city instead
            inputtedCity = inputtedCity.split(",")[0];
            content = city.querySelector(".city-name span").innerText.toLowerCase();
          } else {
            content = city.querySelector(".city-name").dataset.name.toLowerCase();
          }
        } else {
          // Nairobi
          content = city.querySelector(".city-name span").innerText.toLowerCase();
        }
        
        // If "true" is returned, the inpuuted city and/or country code will be pushed to the array, 
        // filteredArray; else, the array remains empty.
        return content == inputtedCity.toLowerCase();
      });
      
      if(filteredArray.length > 0) {
        errorMessage.innerText = `* You already know the weather for ${
          filteredArray[0].querySelector(".city-name span").innerText
        } .Otherwise, be more specific by providing the country code as well.`;
        form.reset();
        input.focus();
      } else {
        appendToCityGrid();
      }
    } else {
      appendToCityGrid();
    }
}

const updateCityGrid = (city) => {

  const icon = city.weather[0]["icon"];

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
  
  const weatherSection = document.createElement("section");
  weatherSection.classList.add("city");
  const weatherContent = 
  `
  <i class="fa-solid fa-circle-xmark"></i>  
  <h2 class="city-name" data-name="${city.name}, ${city.sys.country}">
    <span>${city.name}</span>
    <sup>${city.sys.country}</sup>
  </h2>
  <div class="city-temp">
    ${Math.round(city.main.temp)}<sup>°C</sup>
    <span class="high-low-temp">H: ${Math.round(city.main.temp_max)}<sup>°C</sup> | L: ${Math.round(city.main.temp_min)}<sup>°C</sup></span>
  </div>
  <figure>
    <img class="city-icon" src=${weatherIcon} alt="${city.weather[0]["main"]}">
    <figcaption>${city.weather[0]["description"]}</figcaption>
  </figure>
  `;
  weatherSection.innerHTML = weatherContent;

  const cities = document.querySelector("#cities");
  cities.append(weatherSection);

  let removeBtnArray = Array.from(document.querySelectorAll(".fa-circle-xmark"));
  let removeBtn = removeBtnArray[inputtedCities.indexOf(city)];
  removeBtn.addEventListener("click", () => {

    inputtedCities.splice(inputtedCities.indexOf(city),1);
    storeToLocalStorage();

    resetGrid();

    inputtedCities.forEach((city) => {
      updateCityGrid(city);
    });

  });

  form.reset();
  input.focus();
}

const appendToCityGrid = () => {
  
  inputtedCity = input.value;

  if(inputtedCity === "") {
    errorMessage.innerText = "* Please enter a valid city in the required field."
  } else {

    const apiKey = "6c561b41e4332bb6267c6928a88d6528";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputtedCity}&appid=${apiKey}&units=metric`;
    
  
    fetch(url)
    .then(response => response.json()) // convert the response data to the desired JSON format
    .then(data => { 
  
      const { main, name, sys, weather } = data;
      inputtedCities.push(data);
      storeToLocalStorage();

      // Reset grid before looping and appending cities to the city grid
      resetGrid();

      inputtedCities.forEach((city) => {
        updateCityGrid(city);
      })
    })
    .catch(() => {
      errorMessage.textContent = "* Please search for a valid city.";
    });
  
  }
}

input.addEventListener("input", () => {
  if(errorMessage.innerText !== "") {
    errorMessage.innerText = "";
  }
});

form.addEventListener("submit", (event) => {

  event.preventDefault();
  inputtedCities;
  initiateCityArray(); 
  validateCities();
  
});

window.addEventListener("load", () => {

  initiateCityArray();
  resetGrid();

  inputtedCities.forEach((city) => {
    updateCityGrid(city);
  });
});


window.addEventListener("resize", () => {

  let windowViewport = window.innerWidth;

  if(windowViewport < 663) {
    button.classList.add("button-28");
  } else {
    button.classList.remove("button-28");
  }
});
