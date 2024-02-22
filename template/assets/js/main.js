const city_name = document.querySelector("#inputCity");
const state_code = document.querySelector("#inputCity");
const country_code = document.querySelector("#inputCity");
const output = document.querySelector(".output");

const weatherData = (data) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city_name.value},${state_code.value},${country_code.value}&appid=8fa91c5041e749fe9611443fa12739e7`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(item);
        let lat = item.lat;
        let lon = item.lon;
        console.log(lat);
        console.log(lon);
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=8fa91c5041e749fe9611443fa12739e7`
        )
          .then((res) => res.json())
          .then((weatherData) => {
            // console.log(weatherData);
            console.log(weatherData);
            // --- output in html
            console.log(weatherData.name);
            console.log(weatherData.dt);
            console.log(weatherData.main.temp);
            console.log(weatherData.sys.sunset);
            console.log(weatherData.sys.sunrise);
            console.log(weatherData.wind.speed);
          })
          .catch((err) =>
            console.error(
              "Error im weatherData api.openweathermap.org/data/2.5",
              err
            )
          );
      });
    })
    .catch((err) =>
      console.error("Error im geocoding api.openweathermap.org/data/2.5", err)
    );
};
