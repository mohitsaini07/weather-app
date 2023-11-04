const apiKey = "98fcfc972c1d00192dc338a24a38b9f4";
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const inputBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImage = document.querySelector(".weather-img");
const weather = document.querySelector(".weather");

async function weatherStatus(city) {
  const response = await fetch(url + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    weather.style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main in weatherImages) {
      weatherImage.src = weatherImages[data.weather[0].main];
    }

    weather.style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  weatherStatus(inputBox.value);
});

inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    weatherStatus(inputBox.value);
  }
});

const weatherImages = {
  Clouds: "images/clouds.png",
  Clear: "images/clear.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
};
