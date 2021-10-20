import React, {useEffect, useState} from "react";

import "./WeeklyDataStyle.css"
import WeeklyDataCard from "./WeeklyDataCard";


function WeeklyData({lat, long}) {

    const [currentData, setCurrentData] = useState();

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}` +
            // eslint-disable-next-line max-len
            `&exclude=current,minutely,hourly,alerts&&units=metric&APPID=${process.env.REACT_APP_APIKEY}`,
        )
            .then((res) => res.json())
            .then((result) => {
                setCurrentData(result.daily);
            });
    }, [lat, long]);



    return(


        <div className="weeklyData">
            <h1 style={{
                fontSize: "3rem",
                textAlign: "center"
            }}>Next 7 days</h1>

            <div className="weatherCards">
                <table>
                    <thead>
                    <div className="headings">
                    <tr>
                        <th>Date</th>
                        <th className="bug">        </th>
                        <th>High°C</th>
                        <th>Low°C</th>
                        <th>Weather</th>
                    </tr>
                    </div>
                    </thead>
                    <tbody>
                {currentData &&
                // eslint-disable-next-line array-callback-return,consistent-return
                currentData?.map((day, index) => {
                    if (index !== 0) {
                        // eslint-disable-next-line react/no-array-index-key
                        return <WeeklyDataCard day={day} index={index} key={index} />;
                    }
                })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WeeklyData