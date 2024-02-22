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
            // location
            let location = document.createElement("p");
            location.textContent = weatherData.name;
            output.appendChild(location);
            console.log(weatherData.name);
            // coordinates
            let coordinates = document.createElement("p");
            coordinates.textContent = `Breitengrad: ${weatherData.coord.lat.toFixed(
              1
            )} Längengrad: ${weatherData.coord.lon.toFixed(1)}`;
            output.appendChild(coordinates);
            console.log(weatherData.coord.lon);
            console.log(weatherData.coord.lat);
            // clouds
            let clouds = document.createElement("p");
            clouds.textContent = weatherData.clouds.all;
            output.appendChild(clouds);
            console.log(weatherData.clouds.all);
            // time
            let time = document.createElement("p");

            let myDate = new Date();
            time.textContent = myDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            output.appendChild(time);
            console.log(weatherData.dt);
            // date
            let date = document.createElement("p");

            let date01 = new Date();
            date.textContent = date01.toLocaleDateString();
            output.appendChild(date);
            console.log({ date01 });

            // temerature
            let temp = document.createElement("p");
            temp.textContent = weatherData.main.temp.toFixed(1);
            // time.setAttribute("class", ) - Klasse vergeben
            output.appendChild(temp);
            console.log(weatherData.main.temp);
            // wind
            let wind = document.createElement("p");
            wind.textContent = weatherData.wind.speed;
            output.appendChild(wind);
            console.log(weatherData.wind.speed);
            // prespressure
            let pressure = document.createElement("p");
            pressure.textContent = weatherData.main.pressure;
            output.appendChild(pressure);
            console.log(weatherData.main.pressure);
            // sunset
            let sunset = document.createElement("p");
            let timeTrans01 = weatherData.sys.sunset;
            let mySunset = new Date(timeTrans01 * 1000);
            sunset.textContent = mySunset.toLocaleTimeString();
            output.appendChild(sunset);
            console.log(weatherData.sys.sunset);
            // sunrise
            let sunrise = document.createElement("p");
            let timeTrans02 = weatherData.sys.sunrise;
            let mySunrise = new Date(timeTrans02 * 1000);
            sunrise.textContent = mySunrise.toLocaleTimeString();
            output.appendChild(sunrise);
            console.log(weatherData.sys.sunrise);
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
