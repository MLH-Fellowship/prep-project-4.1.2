import React from 'react';

import SubscribedList from "../components/subscribe/SubscribedList";

import "../assets/sublist.css"
import SubsciptionForm from "../components/subscribe/SubsciptionForm";

function Subscribe(){
    return(
        <>
        <SubsciptionForm/>

         <SubscribedList/>
        </>
    )
}

export default Subscribe