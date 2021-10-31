import React from "react"
import Modal from './Modal/Modal'

export default function App() {
    const [show, setShow] = useState(false)

    return (
        <div className="App">
            <button onClick={() => setShow(true) }>Show Modal</button>
            <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
                <p>This is modal body</p>
            </Modal>
        </div>
    )
}