import React, {useContext, useEffect, useState} from "react";
import {AccessTokenContext} from "../../store/contexts/accessToken.context";



function SubscribedList(){
    const [results, setResults] = useState(null);
    const  user = useContext(AccessTokenContext);

    let boolVal = true;

    useEffect(() => {
        fetch("/post/subscribe")
            .then(res => res.json())
            .then(
                (result) => { setResults(result) }
            )
    })

    if (results === null || Object.keys(results).length === 0){
        boolVal = false;
    }
    return(
        <div>

            {user ? (
                <div>
                    <h2 style={{
                        fontSize:"2rem",
                        padding:"30px"
                    }}> Following are your subscribed list</h2>

                    {boolVal ? (
                        <div className="subscribersList">

                            <div className="subscribe">
                                <div>
                                    Title
                                </div>
                                <div>
                                    Location
                                </div>
                            </div>
                            <div className="subscribe">
                                <div>
                                    Title
                                </div>
                                <div>
                                    Location
                                </div>
                            </div>
                            <div className="subscribe">
                                <div>
                                    Title
                                </div>
                                <div>
                                    Location
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="subscribersList">
                            <div className="subscribe">
                                <div style={{
                                    fontSize: "3rem"
                                }}>
                                    Not Subscription yet
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2 style={{
                        fontSize:"2rem",
                        padding:"30px"
                    }}> You need to login first head</h2>
                </div>
            )}




        </div>
    );
}



export default SubscribedList