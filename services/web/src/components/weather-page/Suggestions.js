import React from "react";

function provideSuggestions(status){
    if(status === "Clear"){
        return "Go play outside the weather looks great." +
            " It will improve your health";
    }

    if(status === "Rain" || status === "Clouds"){
        return "There can be heavy downpour. Don't forget to carry your umbrella, rain coat and" +
            "non slippery boots";
    }

    if(status === "Snow" || status === "Extreme"){
        return "Caution only necessary movement should be considered.";
    }

    return "The weather is great but don't forget to carry water. It is good to be hydrated";
}

function Suggestions(type){
    return(
        <div>
            <div>
                <img src="https://img.icons8.com/color/96/000000/bot.png"
                     alt="bot"/>
                <h1 style={{
                    fontSize: "1.5rem",
                    fontWeight: "bolder"
                }}>
                     Hi! there Myself <strong>TheBot</strong>
                </h1>
            </div>
            <div style={{
                fontSize: "1.25rem"
            }}>
                {/* eslint-disable-next-line react/destructuring-assignment */}
                Hey! just a suggestion {provideSuggestions(type.type)}
            </div>
        </div>
    );
}

export default Suggestions