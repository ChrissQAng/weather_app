const city_name = document.querySelector("#inputCity");
const state_code = document.querySelector("#inputCity");
const country_code = document.querySelector("#inputCity");
const output = document.querySelector(".output");
const reloadButton = document.querySelector("#reload");

reloadButton.addEventListener("click", () => {
  window.onload;
});

const weatherData = (data) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city_name.value}&appid=8fa91c5041e749fe9611443fa12739e7`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(item);
        let lat = item.lat;
        let lon = item.lon;
        let cityName = item.name;
        console.log(lat);
        console.log(lon);
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=8fa91c5041e749fe9611443fa12739e7`
        )
          .then((res) => res.json())
          .then((weatherData) => {
            // console.log(weatherData);
            console.log(weatherData);
            // -- delete output
            output.innerHTML = "";
            // --- output in html
            // location
            let location = document.createElement("p");
            location.textContent = cityName;
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
            clouds.textContent = `clouds: ${weatherData.clouds.all}`;
            output.appendChild(clouds);
            console.log(weatherData.clouds.all);

            // time
            // let time = document.createElement("p");

            // let myDate = new Date();
            // time.textContent = myDate.toLocaleTimeString([], {
            //   hour: "2-digit",
            //   minute: "2-digit",
            // });
            // output.appendChild(time);
            // console.log(weatherData.dt);
            fetch(
              `https://api-bdc.net/data/timezone-by-location?latitude=${lat}&longitude=${lon}&key=bdc_dabdeffa4d2548e3a96a2a51efca3503`
            )
              .then((res) => res.json())
              .then((timeData) => {
                console.log(timeData.localTime);
                let time = document.createElement("p");
                let localTime = new Date(timeData.localTime);
                let localTimeNew = localTime.toLocaleTimeString();
                let today = new Date();
                let todayNew = today.toLocaleDateString();
                time.textContent = `Current local time: ${todayNew} ${localTimeNew}`;
                output.appendChild(time);
              });

            // date
            let date = document.createElement("p");

            let date01 = new Date();
            date.textContent = `datum ${date01.toLocaleDateString()}`;
            output.appendChild(date);
            console.log({ date01 });

            // temerature
            let temp = document.createElement("p");
            temp.textContent = `temperatur ${weatherData.main.temp.toFixed(
              1
            )} C`;
            // time.setAttribute("class", ) - Klasse vergeben
            output.appendChild(temp);
            console.log(weatherData.main.temp);
            // wind
            let wind = document.createElement("p");
            wind.textContent = `wind ${weatherData.wind.speed}`;
            output.appendChild(wind);
            console.log(weatherData.wind.speed);
            // prespressure
            let pressure = document.createElement("p");
            pressure.textContent = `luftdruck ${weatherData.main.pressure}hcPa`;
            output.appendChild(pressure);
            console.log(weatherData.main.pressure);
            // sunrise
            let sunrise = document.createElement("p");
            let timeTrans02 = weatherData.sys.sunrise;
            let mySunrise = new Date(timeTrans02 * 1000);
            sunrise.textContent = `sonnenaufgang ${mySunrise.toLocaleTimeString()}`;
            output.appendChild(sunrise);
            console.log(weatherData.sys.sunrise);
            // sunset
            let sunset = document.createElement("p");
            let timeTrans01 = weatherData.sys.sunset;
            let mySunset = new Date(timeTrans01 * 1000);
            sunset.textContent = `sonnenuntergang ${mySunset.toLocaleTimeString()}`;
            output.appendChild(sunset);
            console.log(weatherData.sys.sunset);
            // weather icon
            let weatherIconHtml = document.createElement("img");
            weatherIconHtml.classList.add("image");
            output.appendChild(weatherIconHtml);
            weatherIconHtml.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

            // let weatherIcon = weatherData.weather[0].description;
            // console.log({ weatherIcon });
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
