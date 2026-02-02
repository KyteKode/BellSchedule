import { useState, useRef } from 'react'

import "./App.scss"

import Desc from "./Desc.js"
import ClassPeriodList from "./ClassPeriod/ClassPeriodList"
import CurrentClass from "./CoreComponent/CurrentClass.js"

import { ClassInfoType } from "./ClassPeriod/ClassInfo"

function App() {
    const [classes, setClasses] = useState<ClassInfoType[]>([]);

    return (  
        <>
            <Desc />
            <br />
            <ClassPeriodList classes={classes} setClasses={setClasses} />
            <CurrentClass classes={classes} />
        </>
    )
}

export default App
