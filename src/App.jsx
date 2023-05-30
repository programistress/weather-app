import { useRef, useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import location_img from './assets/icons/location.svg'
import notfound_img from'./assets/404.png'
import water from './assets/icons/water.svg'
import wind from './assets/icons/wind.svg'
import sunny from "./assets/clear.png"
import clouds from "./assets/clouds.png"
import drizzle from "./assets/drizzle.png"
// // import snow from "./assets/snow.png"
import rain from "./assets/rain.png"



function App() {
  const [location, setLocation] = useState('')
  const [errorDisplay, setErrorDisplay] = useState(false)
  const [weatherBoxDisplay, setWeatherBoxDisplay] = useState(false)
  const [temperature, setTemperature] = useState('')
  const [humidity, setHumidity] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [weatherImage, setWeatherImage] = useState('')
  const [city, setCity] = useState('')


  const card = useRef()
  const error = useRef()


  async function apiCall() {
    const APIKey = '4f211535734d04bf01f3f240f8d24dbe'
    if (location === '') {
      return
    }
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if(json.cod === '404') {
        setErrorDisplay(true)
        return
      }

      setErrorDisplay(false)

      switch(json.weather[0].main){
        case 'Clear':
          setWeatherImage(sunny)
          break;
        case 'Rain':
          setWeatherImage(rain)
          break;
        case 'Clouds':
          setWeatherImage(clouds)
          break;
        case 'Haze':
          setWeatherImage(drizzle)
          break;
      }

      setTemperature(parseInt(json.main.temp))
      setHumidity(parseInt(json.main.humidity))
      setWindSpeed(parseInt(json.wind.speed))
      setCity(json.weather[0].description)
      
      setWeatherBoxDisplay(true)
    })
  }

  

  return (
    <>
      <div className='card'
      ref={card}
      style={{
        height: errorDisplay ? '400px' : '',
        // eslint-disable-next-line no-dupe-keys
        height: weatherBoxDisplay ? '590px' : '',
      }}>

        <div className='search'>
          <img src={location_img} className='search_img'/>
          <input 
          placeholder='Enter your location'
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)} />
          <button className='search_btn' onClick={apiCall}>
            <img src={search} className='search_img' alt="" />
          </button>
        </div>

        <div className='not-found'
        ref={error}
        style={{
          display: errorDisplay ? 'block' : 'none',
        }}>
          <img src={notfound_img} alt="" />
          <p>Oops! Invalid location :/</p>
        </div>

        <div className="weather_box" 
        
        style={{
          display: errorDisplay ? 'none' : '',
        }}>
          <img src={weatherImage} alt="" className='weather_box_img'/>
          <h2 className='degree'>{temperature}°C</h2>
          <h1 className='location'>{city}</h1>

          <div className="details">

            <div className='humidity'>
              <img src={water} className='humidity_img' />
              <div>
                <span className='number_humidity'>{humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>

            <div className='wind_speed'>
              <img src={wind} className='wind_img' />
              <div>
                <span className='number_wind'>{windSpeed} km/h</span>
                <p>Wind Speed</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
