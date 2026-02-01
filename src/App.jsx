import { useState, useRef } from 'react'

import "./App.scss"

import Desc from "./Desc.jsx"
import ClassPeriodList from "./ClassPeriod/ClassPeriodList.jsx"

function StringToDate(input) {
    let timeStr = input.replaceAll(' ', '');

}

function App() {
    const ClassInputRef = useRef(null);
    const PeriodInputRef = useRef(null);
    const StartInputRef = useRef(null);
    const EndInputRef = useRef(null);

    const [classes, setClasses] = useState([]);

    const addClass = () => {
        let newClass = {};
        newClass.name = ClassInputRef.current.value;
        newClass.period = PeriodInputRef.current.value;
        newClass.start = StringToDate(StartInputRef.current.value);
        newClass.end = StringToDate(EndInputRef.current.value);

        setClasses([...classes, newClass]);
    };

    return (  
        <>
            <Desc />
            <br />
            <ClassPeriodList />
        </>
    )
}

export default App
