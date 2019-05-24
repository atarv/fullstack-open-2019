import React, { useState, useEffect } from 'react'
import axios from 'axios'
import APIKey from './APIKey' // OpenWeatherAPIKey
import './App.css'

const SearchField = ({ setEntry }) => {
    const search = event => {
        setEntry(event.target.value)
    }

    return (
        <div>
            Find countries <input onChange={search} />
        </div>
    )
}

const FullData = ({ country }) => {
    const [temp, setTemp] = useState(0)
    const [desc, setDesc] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('')
    const listLanguages = country =>
        country.languages.map((lang, i) => <li key={i}>{lang.name}</li>)
    const weatherQuery = city => {
        axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey.OpenWeatherAPIKey}`
            )
            .then(response => {
                setTemp((response.data.main.temp - 273.15).toFixed(2))
                setDesc(response.data.weather[0].description)
                setWind(response.data.wind.speed + 'm/s, ' + response.data.wind.deg + ' degrees')
                setIcon(`http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`)
            })
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <div>
                    <b>Temperature: </b>
                    {/* Kelvins converted to celsius */}
                    {temp}&#x2103;
                </div>
                <img src={icon} alt="icon"/>
                <div><b>Description: </b>{desc}</div>
                <div><b>Wind: </b>{wind}</div>
            </div>
        )
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                Capital: {country.capital}
                <br />
                Population: {country.population}
            </p>
            <h2>Languages</h2>
            <ul>{listLanguages(country)}</ul>
            <img src={country.flag} alt={country.demonym + ' flag'} height={200} />
            {weatherQuery(country.capital)}
        </div>
    )
}

const PartialData = ({ country, setEntry }) => {
    return (
        <div key={country.name}>
            {country.name} <button onClick={() => setEntry(country.name)}>show</button>
        </div>
    )
}

const CountryData = ({ entry, countries, setEntry }) => {
    if (countries.length === 0) return <div />
    const matchingCountries = countries.filter(country =>
        country.name.toLowerCase().includes(entry.toLowerCase())
    )
    if (matchingCountries.length === 1) return <FullData country={matchingCountries[0]} />
    else if (matchingCountries.length <= 10)
        return matchingCountries.map(country => (
            <PartialData key={country.name} country={country} setEntry={setEntry} />
        ))
    else return <div>Too many matches, specify another filter</div>
}

function App() {
    const [entry, setEntry] = useState('')
    const [countries, setCountries] = useState([])

    const getCountries = () => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
        })
    }

    useEffect(getCountries, [])

    return (
        <div>
            <SearchField setEntry={setEntry} />
            <CountryData entry={entry} countries={countries} setEntry={setEntry} />
        </div>
    )
}

export default App
