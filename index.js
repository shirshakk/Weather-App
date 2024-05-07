let city;
const key = "516f593e68484640b2b83140240405";
const baseUrl = "http://api.weatherapi.com/v1";
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
    console.log("" + CurrentTemprature);
    console.log("CurrentCloud" + CurrentCloud);
    console.log("CurrentHumidity" + CurrentHumidity);
    console.log("CurrentWind" + CurrentWind);
    
  }
  if (ForecastData &&ForecastData.forecast &&ForecastData.forecast.forecastday.length > 0) {
    const ForecastRain =ForecastData.forecast.forecastday[0].day.daily_chance_of_rain;
    console.log("Chance of rain: " + ForecastRain);
  }
  if(TimeData)
    {
        const LocalTIme=TimeData.location.localtime;
        console.log(LocalTIme);
    }
}
function FetchWeather(){
  let city=document.getElementById("city").value;
  console.log(city)
  Search(city);
}