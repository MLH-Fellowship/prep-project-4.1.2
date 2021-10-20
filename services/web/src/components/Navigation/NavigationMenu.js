import React from "react";

import "./NavigationStyles.css"

function NavigationMenu(){
    return(
        <div>
        <nav className="main-nav">
            <ul>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                        {/* eslint-disable-next-line max-len */}
                        <img className="icon" src="https://img.icons8.com/color/48/000000/clouds.png" alt="Clouds"/>
                        <span className="nav-text">
                            Weather & Home
                        </span>
                    </a>
                </li>

                <li className="has-subnav">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                        {/* eslint-disable-next-line max-len */}
                        <img className="icon" src="https://img.icons8.com/color/48/000000/newspaper-.png" alt="Click to see news"/>
                        <span className="nav-text">
                            News
                        </span>
                    </a>
                </li>

                <li className="has-subnav">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" >
                        {/* eslint-disable-next-line max-len */}
                        <img className="icon" src="https://img.icons8.com/color/50/000000/around-the-globe.png"
                        alt="Trip Advisor"/>

                        <span className="nav-text">
                            Trip
                        </span>
                    </a>
                </li>

                <li className="has-subnav">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                        {/* eslint-disable-next-line max-len */}
                        <img className="icon" src="https://img.icons8.com/color/48/000000/appointment-reminders--v1.png"
                        alt="Notifications"/>
                        <span className="nav-text">
                            Notify
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
        </div>
    );
}

export default NavigationMenu