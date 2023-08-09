import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const getCountryData = async (countryName) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return null;
  }
};

const CountriesDisplay = ({ filterCountry, setfilterCountry }) => {
  const [countryData, setCountryData] = useState(null); // State to hold country data
  const [lang, setLang] = useState([]);
  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchWeather = async () => {
      if (countryData) {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${countryData[0].capital}&appid=${process.env.REACT_APP_API}`
        );

        const respons = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${process.env.REACT_APP_API}`
        );
        console.log("Weather", respons.data);
        setWeather(respons.data);
      }
    };
    fetchWeather();
  }, [countryData]);

  useEffect(() => {
    // Define an async function to fetch country data
    const fetchData = async () => {
      if (filterCountry?.length === 1) {
        const country = filterCountry[0];
        const data = await getCountryData(country); // Assuming getCountryData is defined elsewhere
        let laangs = [];
        for (let lang in data[0].languages) {
          laangs.push(data[0].languages[lang]);
        }
        setCountryData(data);
        setLang(laangs);
      }
    };
    fetchData(); // Call the async function to fetch country data
  }, [filterCountry]);

  if (filterCountry?.length > 10) {
    return <p>Too many matches, please specify your search</p>;
  } else if (filterCountry?.length === 1 && countryData) {
    return (
      <>
        <h2>{countryData[0].name.common}</h2>
        <p>Capital: {countryData[0].capital}</p>
        <p>Population: {countryData[0].population}</p>
        <h3>languages:</h3>
        <ul>
          {lang.map((l) => {
            console.log("lang", l);
            return <li> {l}</li>;
          })}
        </ul>
        <img src={countryData[0].flags.png}></img>
        <div>
          <h2>Weather in {countryData[0].capital} </h2>
          <p>Temprature {weather?.main.temp} C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
          <p>Wind {weather?.wind.speed} m/s </p>
        </div>
        {/* ... other country information */}
      </>
    );
  } else if (filterCountry) {
    return (
      <>
        {filterCountry.map((f, index) => (
          <>
            <p>{f}</p>
            <button
              onClick={() => {
                let filter = [];
                filter.push(f);
                setfilterCountry(filter);
              }}
            >
              View
            </button>
          </>
        ))}
      </>
    );
  } else {
    return null;
  }
};

function App() {
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        const countriesNames = [];
        response.data?.map((f) => {
          countriesNames.push(f.name.common);
        });
        setcountries(countriesNames);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, []);

  const [countries, setcountries] = useState([]);
  const [input, setInput] = useState("");
  const [filterCountry, setfilterCountry] = useState([]);

  const handleChange = async (e) => {
    const country = e.target.value;
    setInput(country);
    console.log(country);
    const filter = countries?.filter((f) =>
      f.toUpperCase().includes(country.toUpperCase())
    );

    console.log("countries :", countries);
    setfilterCountry(filter);
    console.log(filter);
  };

  return (
    <>
      <p> find countries</p>
      <input onChange={(e) => handleChange(e)} value={input}></input>
      <CountriesDisplay
        filterCountry={filterCountry}
        setfilterCountry={setfilterCountry}
      />
    </>
  );
}

export default App;
