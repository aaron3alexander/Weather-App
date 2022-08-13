const delayInMilliseconds = 500



var weather = {
    apiKey: "220a5c66797eef544cf1ce052e8e4960",
    fetchWeather: function(city){ /*initially used an arrow function here, forgot how they don't have their own "this" */
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: (data) => {
        const {name} = data; /* equivalent to const name = data.name */
        const {icon, description} = data.weather[0];
        const {temp, temp_min, temp_max, humidity} = data.main;
        const {speed} = data.wind;
        var width = window.innerWidth;
        var height = window.innerHeight;

        document.querySelector(".card").classList.remove("loading");
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".high").innerText = "High: " + temp_max + "°F";
        document.querySelector(".low").innerText = "Low: " + temp_min + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed + " mph";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/"+ width + "x" + height + "/?"+ name + "')"

        setTimeout(function() {
            textbox.style.transition = "opacity 2s";
            textbox.style.opacity = 1;
            document.querySelector(".weather").classList.remove("loading");
            
        }, delayInMilliseconds);

        
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        weather.search();
    }
})

