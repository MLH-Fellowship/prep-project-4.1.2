import React from "react";

import "../assets/style/trip.css"

function TripPlanner(){
    const data  = [
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        },
        {
            "place_name": "New Delhi",
            "state": "Delhi",
            "district": "South West",
            "votes" : "1500"
        }

    ]

    return (
            <div className="trip">
        <h1> Welcome find your place to explore here</h1>
            <div className="placesContainer">
                {
                    data.map((item, index)=>{
                        if(index !== -1){
                            return (
                                <div className="conatinerTrip">
                                    <div className="weatherTrip">23 °C</div>
                                    <div className="nameTrip">{item.place_name}</div>
                                    <div className="district">{item.district}, {item.state}</div>
                                    <br/>
                                        ❤️ by {item.votes} wanderer
                                        <div className="go-corner" href="#">
                                            <div className="go-arrow">
                                                →
                                            </div>
                                        </div>
                                </div>
                            );
                        }
                        return <div className="key" key="0"> </div>
                    })
                    }
            </div>
    </div>

    );
}

export default TripPlanner