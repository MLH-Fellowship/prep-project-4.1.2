import React from "react";

import "./Footer.css"

function Footer(){
    return(
        <div className="footer">
            <div className="social-icons">
                <ul>
                    <li>
                        <a href="https://github.com/MLH-Fellowship/prep-project-4.1.2">
                            <img src="https://img.icons8.com/color/48/000000/github--v1.png"
                                alt="github"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/MLHacks">
                            <img src="https://img.icons8.com/color/48/000000/twitter--v1.png"
                                 alt="tweet"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://mlh.io/">
                            <img src="https://img.icons8.com/color/48/000000/domain--v1.png"
                            alt="website"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="appreciation">
                Made with ❤️by Mocking Sparrows
            </div>
        </div>
    );
}

export default Footer