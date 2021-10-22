import {useEffect, useState} from "react";

/* eslint-disable */
function AddToListRequest(data){

    const [results, setResults] = useState(null);

    useEffect(() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + `${data.data.data[0].location}` + "&units=metric" + "&appid=" + `${process.env.REACT_APP_APIKEY}`)
            .then(res => res.json())
                .then(
                    (result) => {setResults(result)}
                )
    });


    let url;
    let dataToSend;
    const lat = results?.coord.lat;
    const long = results?.coord?.lon;

    let i = true;

    if(i){
        if (data.data.data[0].optionSelected === 1) {
            url = "/post/subscribe/email";

            dataToSend = {
                "trigger_name": data.data.data[0].triggers,
                "lat": lat,
                "lon": long
            }.toString()
        } else {
            url = "/post/subscribe/webhook";
            dataToSend = {
                "trigger_name": data.data.data[0].triggers,
                "lat": lat,
                "lon": long,
                "webhook": data.data.webhook
            }.toString()
        }
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                i = false;
            }
        };


        xhr.send(dataToSend);
    }

        return null;

}

export default AddToListRequest