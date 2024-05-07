const key = "516f593e68484640b2b83140240405";
const baseUrl = "http://api.weatherapi.com/v1";
let image="";
async function Search(city) {
  const CurrentResource = await fetch(`${baseUrl}/current.json?key=${key}&q=${city}`);
  const CurrentData = await CurrentResource.json();

  const ForecastResourse = await fetch(`${baseUrl}/forecast.json?key=${key}&q=${city}`);
  const ForecastData = await ForecastResourse.json();

  const TimeResourse= await fetch(`${baseUrl}/timezone.json?key=${key}&q=${city}`);
  const TimeData= await TimeResourse.json();

  if (CurrentData && CurrentData.current) {
    const CurrentTemprature = CurrentData.current.temp_c;
    const CurrentCloud = CurrentData.current.cloud;
    const CurrentHumidity = CurrentData.current.humidity;
    const CurrentWind = CurrentData.current.wind_kph;
    const CurrentWeatherCondition= CurrentData.current.condition.text;
    document.getElementById("CurrentTemprature").innerHTML=CurrentTemprature+"\u00B0";
    document.getElementById("type").innerHTML=CurrentWeatherCondition;
    console.log("" + CurrentTemprature);
    console.log("CurrentCloud" + CurrentCloud);
    console.log("CurrentHumidity" + CurrentHumidity);
    console.log("CurrentWind" + CurrentWind);
    console.log(CurrentWeatherCondition);

    if(CurrentWeatherCondition==="Clear")
      {
        image="images/clear.png"
      }
    else if(CurrentWeatherCondition==="Clouds")
      {
        image="images/clouds.png"
      }
    else if(CurrentWeatherCondition==="Drizzle")
      {
        image="images/drizzle.png"
      }
    else if(CurrentWeatherCondition==="Himidity")
      {
        image="images/humidity.png"
      }
    else if(CurrentWeatherCondition==="Mist")
      {
        image="images/mist.png"
      }
    else if(CurrentWeatherCondition==="Rain")
      {
        image="images/rain.png"
      }
    
    document.getElementById("wind").innerHTML=CurrentWind;
    document.getElementById("Image").src=image;
    
  }
  if (ForecastData && ForecastData.forecast && ForecastData.forecast.forecastday.length >=0) {
    console.log("Number of forecast days:", ForecastData.forecast.forecastday.length);
    const ForecastRain = ForecastData.forecast.forecastday[0].day.daily_chance_of_rain;
    const ForecastHighTemperature = ForecastData.forecast.forecastday[0].day.maxtemp_c+"\u00B0";
    const ForecastLowTemperature = ForecastData.forecast.forecastday[0].day.mintemp_c+"\u00B0";
    const ForecastSunrise = ForecastData.forecast.forecastday[0].astro.sunrise;
    const ForecastSunset = ForecastData.forecast.forecastday[0].astro.sunset;
    document.getElementById("highTemperature").innerHTML =ForecastHighTemperature;
    document.getElementById("lowTemperature").innerHTML =ForecastLowTemperature;

    document.getElementById("rain").innerHTML = ForecastRain;
    document.getElementById("sunset").innerHTML = ForecastSunset;
    document.getElementById("Sunrise").innerHTML = ForecastSunrise;
    console.log("Chance of rain:", ForecastRain);
    console.log("High temperature:", ForecastHighTemperature);
}

  if(TimeData)
    {
        const LocalTIme=TimeData.location.localtime;
        console.log(LocalTIme);
    }
}
function FetchWeather(){
  let city=document.getElementById("city").value;
  document.getElementById("CityName").innerHTML=city;
  console.log(city)
  Search(city);
}