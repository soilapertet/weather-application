const form = document.querySelector(".weather-form");
const input = document.querySelector("input");
const errorMessage = document.querySelector(".error-msg");

form.addEventListener("submit", (event) => {

  event.preventDefault();
  const inputtedCity = input.value;

  if(inputtedCity === "") {
    errorMessage.innerText = "* Please enter a valid city in the required field."
  } 
});

input.addEventListener("input", () => {
  if(errorMessage.innerText !== "") {
    errorMessage.innerText = "";
  }
});