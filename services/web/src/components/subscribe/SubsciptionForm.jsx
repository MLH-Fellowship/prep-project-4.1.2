import React from "react"
import AddToListRequest from "./AddToListRequest";

/* eslint-disable */
class SubscriptionForm extends React.Component {

    bool = false;

    constructor(props) {
        super(props);
        this.state = {
            data: [
            ]
        }
    }



    onSubmit = event => {
        event.preventDefault()
        const triggers = this.triggers.value;
        const optionSelected = this.optionSelected.value;
        const webhook = this.webhook.value;
        const location = this.location.value;
        const info = {triggers: triggers, optionSelected: optionSelected, webhook: webhook, location: location};
        const data = [...this.state.data, info];
        this.bool = true;
        this.setState({
            data: data
        });
    };





    render() {
        return (
            <div>
                <h1 style={{
                    fontSize:"3rem",
                    padding:"10px"
                }}>#SparrowMessaging</h1>
                <h2 style={{
                    fontSize:"2rem",
                    padding:"10px"
                }}> Now get notified for Weather Updates for your favourite locations </h2>

                <div className="subscribe">
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor="triggers">Tag<br/>
                                <input type="text" minLength="4" maxLength="24"
                                       className="triggers" ref={input => this.triggers = input}
                                       placeholder="Office" required/><br/>

                            </label>
                        </div>
                        <h3> Choose how would like to get notified</h3>

                        <div id="radio">
                            <div  style={{
                                display: "inline-block"
                            }}>
                                <label htmlFor="triggers">1. Discord
                                </label>
                            </div>
                        <br/>
                            <div  style={{
                                display: "inline-block"
                            }}>
                                <label htmlFor="triggers">2.Mails
                                </label>
                            </div>
                        </div>

                        <div className="inputs-container">
                            <div id="choice InputContainer">
                                <label htmlFor="triggers">Enter option number<br/>
                                    <input type="number" id="hookInput"
                                           min="1" max="2"
                                           ref={input => this.optionSelected = input}
                                           placeholder="1"
                                           required/> <br/>
                                </label>
                            </div> <div id="hookInputContainer">
                                <label htmlFor="triggers">Discord Webhook url
                                    <small>(Only fill if selected)</small><br/>
                                    <input type="url" id="hookInput"
                                           ref={input => this.webhook = input}
                                           placeholder="https://api/discord/..."
                                           required/> <br/>
                                </label>
                            </div>
                        </div>

                        <div id="triggerLocation">
                            <label htmlFor="triggerLocation">Location<br/>
                                <input type="text" id="triggerLocationInput"
                                       name="triggerLocation"
                                       ref={input => this.location = input}
                                       placeholder="New Delhi"
                                       required/><br/>
                            </label>

                        </div>
                        <div className="sub-button">
                            <button type="submit" className="btn">Subscribe</button>
                        </div>
                    </form>
                </div>
                {                 console.log(this.bool)
                }
                {
                    this.bool ? (<AddToListRequest data = {this.state}/>)
                        : ("")
                }

            </div>

        )
    }
}

export default SubscriptionForm