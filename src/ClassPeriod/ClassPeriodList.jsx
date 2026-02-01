import { useState, useRef } from 'react'

import "./ClassPeriodList.css"

import ClassPeriod from "./ClassPeriod.jsx"
import NewClassInfo from "./NewClassInfo.jsx"

function StringToDate(input) {
    let timeStr = input.replaceAll(' ', '');
    
}

function ClassPeriodList() {
    const [classInfo, setClassInfo] = useState({
        name: "Homeroom",
        period: "0",
        start: { hour: "7", minute: "51", ampm: "am" },
        end: { hour: "7", minute: "58", ampm: "am" }
    });

    const [classes, setClasses] = useState([]);

    const addClass = () => {
        let newClass = {};
        newClass.name = classInfo.name;
        newClass.period = classInfo.period;
        newClass.start = classInfo.start;
        newClass.end = classInfo.end;

        setClasses([...classes, newClass]);
    };

    return (  
        <div id="ClassPeriodList">
            <NewClassInfo onClick={addClass} value={classInfo} setValue={setClassInfo}/>
            <div>{classes.map((item) => (
                <ClassPeriod name={item.name} period={item.period} start={item.start} end={item.end} key={item.period} />
            ))}</div>
        </div>
    )
}

export default ClassPeriodList
