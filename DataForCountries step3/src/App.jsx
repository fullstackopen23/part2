import { useState, useEffect } from 'react'
import axios from "axios"


const getWeather = (city) => {
  const api = import.meta.env
  console.log((api.VITE_WEATHER_API))
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api.VITE_WEATHER_API}&units=metric`)
}

const Weather = (props) => {

  const [weather, setWeather] = useState({}) 

  useEffect(() => {
    getWeather(props.city).then((res) => {
      console.log(res.data)
      const imgCode = res.data.weather[0].icon
      const imgUrl = `https://openweathermap.org/img/wn/${imgCode}@2x.png`
      setWeather({temp: res.data.main.temp, wind: res.data.wind.speed, img: imgUrl})
    })

  }, [props.city])


  return (
    <div>
      <h2>Weather in {props.city}</h2>
      <p>temperature {weather.temp} Celcius</p>
      <img src={weather.img}/>
      <p>wind {weather.wind} m/s</p>
    </div>
  )
}


const Countries = (props) => {

 

  const handleShowBtn = (e) => {
    const country = e.target.parentNode.firstChild.innerHTML
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
         .then((res) => {
           props.setCountries([res.data])
         })
  }

  if(!props.countries) {
    return 
  } else if (props.countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (props.countries.length === 1) {
   
    const country = props.countries[0]
    const languages = Object.keys(country.languages).map(key => country.languages[key])
    
    return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
          <h2>languages:</h2>
          <p>{languages.map(lang => <li key={languages.indexOf(lang)}>{lang}</li>)}</p>
          <img src={country.flags.png}/>
          <Weather city={country.capital[0]}/>
        </div>
  )
  } else {
    return (
      <div>
          {props.countries.map((country) => {
            return (
              <div key={props.countries.indexOf(country)}>
                <label>{country.name.common} </label> 
                <button onClick={handleShowBtn}>show</button>
              </div>
              )
            })
          }
      </div>
    )
  }
  
}




function App() {
  
  const [input, setInput] = useState(null)
  const [data, setData] = useState(null)
  const [countries, setCountries] = useState(null)
  
  
  useEffect(() => {   

    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((res) => {
      setData(res.data)
    })
    
  }, [])
  
  
  const handleInput = (e) => {

    setInput(e.target.value)

    setCountries(data.filter((country) => {
      const countryName = country.name.common.toLowerCase()

      if(countryName.includes(e.target.value.toLowerCase())) {
        return true
      } else {
        return false
      }
    }))
  } 

  return (
    <>
      find countries <input onChange={handleInput}/>
      <Countries input={input} setCountries={setCountries} countries={countries}/>
    </>
  )
}

export default App
