import { useCallback, useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import useAlgoliaPlaces from "./hooks/useAlgoliaPlaces";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [lat, setLat] = useState(40.7127);
  const [lng, setLng] = useState(-74.006);
  const [location, setLocation] = useState(
    "New York, United States of America"
  );

  const setContainer = useAlgoliaPlaces({
    options: {
      appId: process.env.REACT_APP_ALGOLIA_APP_ID,
      apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    },
    events: {
      onChange({ suggestion }) {
        const {
          name,
          administrative,
          country,
          latlng: { lat, lng },
        } = suggestion;
        setLat(lat);
        setLng(lng);
        setLocation(`${name}, ${administrative}, ${country}`);
        console.log(lat, lng);
      },
    },
  });

  const algoliaPlacesRef = useCallback((node) => {
    if (node !== null) {
      setContainer(node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lat == null || lng == null) {
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [lat, lng]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <input
            type="text"
            ref={algoliaPlacesRef}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
