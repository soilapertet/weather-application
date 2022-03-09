const form = document.querySelector(".weather-form");
const input = document.querySelector("input");

const errorMessage = document.querySelector(".error-msg");

// const apiKey = "336a341afbdb8822005a1515ab344ce6";
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputtedCity}&appid=${apiKey}&units=metric`;

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const inputtedCity = input.value;
  const apiKey = "336a341afbdb8822005a1515ab344ce6";
  // const apiKey = "4d8fb5b93d4af21d66a2948710284366";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputtedCity}&appid=${apiKey}&units=metric`;
  
  if(inputtedCity === "") {
    errorMessage.innerText = "* Please enter a valid city in the required field."
  } 

  // Pass the URL we want to access to the fetch() method
  fetch(url)
  .then(response => response.json()) // convert the response data to the desired JSON format
  .then(data => {
    // data will be available for manipulation
    // do stuff with data
  })
  .catch(() => {
    errorMessage.textContent = "Please search for a valid city 😩";
  });
});

input.addEventListener("input", () => {
  if(errorMessage.innerText !== "") {
    errorMessage.innerText = "";
  }
});

