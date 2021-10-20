import React, {useEffect, useState} from "react";
import WeeklyData from "./WeeklyData";

import "./data.css"
import ParticularDayData from "./ParticularDayData";
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Suggestions from "./Suggestions";

function LandingWeatherData({city, lat, long, aqi}){
    const [currentData, setCurrentData] = useState();

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric` +
            `&appid=${process.env.REACT_APP_APIKEY}`,
        )
            .then((res) => res.json())
            .then((result) => {
                setCurrentData(result);
            });
    }, [city, lat, long]);

    return(
        <div className="weatherData">
            <div className="mainArea">
                <div className="particularWeather">
                   <div id="location">{city}, {currentData?.sys?.country} </div>

                   <div id="displayData">
                       <div id="weatherIcon">🌞</div>
                       <div id="temperature">
                           <div id="currentTemp">{currentData?.main.temp} °C</div>
                           <div >
                           <p
                           style={{
                               paddingTop:"10px"
                           }}>
                               {currentData?.main.temp_max} <br/>
                               <br/>{currentData?.main.temp_min}</p>
                           </div>
                       </div>
                   </div>
                    <div id="descAqi">{currentData?.weather[0].main} | AQI : {aqi}</div>
                    <div id="feelsLike">Feels Like {currentData?.main.feels_like}</div>
                </div>
                <div className="otherUsefulData">
                    <ParticularDayData data = {currentData}/>
                </div>
                <div className="suggestionBox">
                    <Suggestions type = {currentData?.weather[0].main}/>
                </div>
            </div>

            <div className="nextSevenDaysUpdate">
                <WeeklyData lat={lat} long={long}/>
            </div>
        </div>
    );
}

export default LandingWeatherData;