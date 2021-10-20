import React from "react";
import "./PD.css"
import moment from "moment";
// /import dateAndTime from "./WeeklyDataCard"
function dateAndTime(unixStamp){
    const unixTimestamp = unixStamp.data?.dt;

    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);

    const weekday = dateObject.toLocaleString("en-US", { weekday: "long" });
    const month = dateObject
        .toLocaleString("en-US", { month: "long" })
        .slice(0, 3);
    const date = dateObject.toLocaleString("en-US", { day: "numeric" });

    return [weekday, month, date];
}


function ParticularDayData(data){
     // eslint-disable-next-line react/destructuring-assignment
      const [weekday, month, day] = dateAndTime(data)

    return(
        <div className="data">

            <div className="first-row">
                <div className="date">
                    <div className="date">{day} {month}, 2021</div>
                    <div className="day-of-week">{weekday}</div>
                </div>
            </div>
            <div className="second-row">
                <div className="aqi">
                <h3>
                    <img src="https://img.icons8.com/color/36/000000/weather-forecast.png"
                    alt="description"/>
                        Forecast -
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    {data.data?.weather[0].description.toUpperCase()}!!
                </h3>
                </div>
                <div className="visibility">
                    <h3>Visibility <img src="https://img.icons8.com/color/36/000000/look.png"
                    alt="visibility"/>
                        {/* eslint-disable-next-line react/destructuring-assignment */}
                        :{data.data?.visibility}</h3>
                </div>
            </div>
            <div className="third-row">
                <div className="inner-row-1">
                    <div>
                        <h3>
                            <img src="https://img.icons8.com/color/36/000000/morning.png"
                            alt ="Sunrise"/> SUNRISE
                        </h3>
                        <p className="dataFetched">
                            {/* eslint-disable-next-line react/destructuring-assignment */}
                            {moment(data.data?.sys.sunrise * 1000).format('LT')}
                        </p>
                    </div><div>
                        <h3>
                            <img src="https://img.icons8.com/color/36/000000/vaporwave.png"
                            alt="Sunset"/> SUNSET
                        </h3>
                        <p className="dataFetched">
                            {/* eslint-disable-next-line react/destructuring-assignment */}
                            {moment(data.data?.sys.sunset * 1000).format('LT')}</p>
                    </div><div>
                        <h3>
                            <img src="https://img.icons8.com/color/36/000000/wet.png"
                            alt="humidity"/> HUMIDITY
                        </h3>
                        <p className="dataFetched">
                            {/* eslint-disable-next-line react/destructuring-assignment */}
                            {data.data?.main.humidity}%
                        </p>
                    </div>
                </div>
                <div className="inner-row-2">
                    <div>
                        <h3>WIND
                            <img src="https://img.icons8.com/color/36/000000/wind.png"
                            alt="wind"/>
                        </h3>
                        {/* eslint-disable-next-line react/destructuring-assignment */}
                        <p className="dataFetched">{data.data?.wind.speed}</p>
                    </div><div>
                    <h3>FEELS LIKE
                        <img src="https://img.icons8.com/color/36/000000/feels-guy.png"
                        alt="feels like"/>
                    </h3>
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    <p className="dataFetched">{data.data?.main.feels_like}</p>
                </div><div>
                    <h3>Pressure
                        <img src="https://img.icons8.com/color/36/000000/atmospheric-pressure.png"
                        alt="pressure"/>
                    </h3>
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    <p className="dataFetched">{data.data?.main.pressure}</p>
                </div>
                </div>
            </div>
        </div>
    );
}


export default ParticularDayData