import { useState } from 'react'

import "./App.css"

import Desc from "./Desc.jsx"

function App() {
    const [items, setItems] = useState([]);

    return (  
        <>
            <Desc />
        </>
    )
}

export default App
