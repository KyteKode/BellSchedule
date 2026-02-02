import { useState, useEffect } from 'react'

import "./App.scss"

import Desc from "./Desc.js"
import ClassPeriodList from "./ClassPeriod/ClassPeriodList"
import CurrentClass from "./CoreComponent/CurrentClass.js"

import { ClassInfoType } from "./ClassPeriod/ClassInfo"

function App() {
    const [classes, setClasses] = useState<ClassInfoType[]>([]);

    useEffect(() => {
        let storedClasses = localStorage.getItem("classes");
        if (storedClasses) {
            setClasses(JSON.parse(storedClasses));
        } 
    }, []);

    useEffect(() => {
        localStorage.setItem("classes", JSON.stringify(classes));
    }, [classes])

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
