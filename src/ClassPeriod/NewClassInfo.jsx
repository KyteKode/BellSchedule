import { useState, useRef } from 'react'
import TimePicker from "./TimePicker.jsx"

function NewClassInfo({onClick, value, setValue}) {
    const handleChange = (key, newValue) => {
        setValue({
            ...value,
            [key]: newValue,
        });
    };
    const [name, setName] = useState("Homeroom");
    const [period, setPeriod] = useState("0");
    const [start, setStart] = useState({ hour: 7, minute: 51, ampm: "AM" });
    const [end, setEnd] = useState({ hour: 7, minute: 58, ampm: "AM" });

    return (  
        <div id="NewClassInfo">
            <button onClick={onClick}>Add Class</button>
            <div>
                <span>Name:</span>
                <input
                    placholder="Homeroom"
                    value={value.name}
                    onChange={e => handleChange("name", e.target.value)}
                />
            </div>
            <div>
                <span>Period:</span>
                <input
                    placholder="0"
                    value={value.period}
                    onChange={e => handleChange("period", e.target.value)}
                />
            </div>
            <div>
                <span>Start:</span>
                <TimePicker
                    placeholderHour="7"
                    placeholderMinute="51"
                    value={value.start}
                    setValue={e => handleChange("start", e.target.value)}
                    />
            </div>
            <div>
                <span>End:</span>
                <TimePicker
                    placeholderHour="7"
                    placeholderMinute="58"
                    value={value.end}
                    setValue={e => handleChange("end", e.target.value)}
                />
            </div>
        </div>
    )
}

export default NewClassInfo