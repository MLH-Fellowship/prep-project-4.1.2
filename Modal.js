import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transation-group'
import "./Modal.css"

const Modal = props => {
    const closeOnEscapeKeyDown = (e) => { 
    }

        useEffect(() => { 
            
        }, [])

    return ReactDOM.createPortal(
        <CSSTransition 
        document.getElementById('root')        
    )
}

export default Modal