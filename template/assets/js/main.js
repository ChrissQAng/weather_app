const city_name = document.querySelector("#inputCity");
const geoTimeDiv = document.querySelector(".geo-dates");
const output = document.querySelector(".output");
const outputSub = document.querySelector(".output-sub");
const reloadButtons = document.querySelectorAll(".reload");

reloadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    location.reload();
  });
});

const weatherData = (data) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city_name.value}&appid=8fa91c5041e749fe9611443fa12739e7`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        output.innerHTML = "";
        geoTimeDiv.innerHTML = "";
        console.log({ item });
        let lat = item.lat;
        let lon = item.lon;
        let cityName = item.name;

        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=8fa91c5041e749fe9611443fa12739e7`
        )
          .then((res) => res.json())
          .then((weatherData) => {
            // console.log(weatherData);
            console.log(weatherData);
            // -- delete output

            // --- output in html
            // location
            // let location = document.createElement("p");
            // location.textContent = cityName;
            // output.appendChild(location);
            // console.log(weatherData.name);
            // --- ADD CLASS to div output
            document.querySelector(".output").classList.add("dark-box");
            // --- weather icon
            let weatherIconHtml = document.createElement("img");
            weatherIconHtml.classList.add("image");
            output.appendChild(weatherIconHtml);
            weatherIconHtml.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            // coordinates
            let coordinates = document.createElement("p");
            coordinates.textContent = `lat: ${weatherData.coord.lat.toFixed(
              1
            )}° lon: ${weatherData.coord.lon.toFixed(1)}°`;
            geoTimeDiv.appendChild(coordinates);
            console.log(weatherData.coord.lon);
            console.log(weatherData.coord.lat);
            // // clouds
            // let clouds = document.createElement("p");
            // clouds.textContent = `clouds: ${weatherData.clouds.all}`;
            // output.appendChild(clouds);
            // console.log(weatherData.clouds.all);

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
                let localTimeNew = localTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                let today = new Date();
                // let todayNew = today.toLocaleDateString();
                time.textContent = `${localTimeNew}`;
                geoTimeDiv.appendChild(time);
              });

            // // date
            // let date = document.createElement("p");

            // let date01 = new Date();
            // date.textContent = `datum ${date01.toLocaleDateString()}`;
            // output.appendChild(date);
            // console.log({ date01 });

            // temerature
            let temp = document.createElement("p");
            temp.setAttribute("class", "temp-output");
            temp.textContent = `${weatherData.main.temp.toFixed(1)}° C`;
            output.appendChild(temp);
            console.log(weatherData.main.temp);
            // feels like
            let tempFl = document.createElement("p");
            tempFl.textContent = `feels like ${weatherData.main.feels_like.toFixed(
              1
            )}° C`;
            output.appendChild(tempFl);

            // windspeed
            let wind = document.createElement("p");
            wind.textContent = `🌬️ ${weatherData.wind.speed} m/s`;
            output.appendChild(wind);
            console.log(weatherData.wind.speed);
            // prespressure
            let pressure = document.createElement("p");
            pressure.textContent = `${weatherData.main.pressure} hPa`;
            output.appendChild(pressure);
            console.log(weatherData.main.pressure);
            // sunrise
            let sunrise = document.createElement("p");
            let timeTrans02 = weatherData.sys.sunrise;
            let mySunrise = new Date(timeTrans02 * 1000);
            sunrise.textContent = `SR ${mySunrise.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`;
            output.appendChild(sunrise);
            console.log(weatherData.sys.sunrise);
            // sunset
            let sunset = document.createElement("p");
            let timeTrans01 = weatherData.sys.sunset;
            let mySunset = new Date(timeTrans01 * 1000);
            sunset.textContent = `SS ${mySunset.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`;
            output.appendChild(sunset);
            console.log(weatherData.sys.sunset);
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
