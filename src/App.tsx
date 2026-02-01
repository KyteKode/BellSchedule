import { useState, useRef } from 'react'

import "./App.scss"

import Desc from "./Desc.js"
import ClassPeriodList from "./ClassPeriod/ClassPeriodList"
import { ClassInfo } from "./ClassPeriod/ClassInfo"

function App() {
    const [classes, setClasses] = useState<ClassInfo[]>([]);

    return (  
        <>
            <Desc />
            <br />
            <ClassPeriodList value={classes} setValue={setClasses} />
        </>
    )
}

export default App
