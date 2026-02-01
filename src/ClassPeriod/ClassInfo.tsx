import { useState, useRef } from 'react'

import TimePicker, { Time, AMPM } from "./TimePicker"

interface ClassInfo {
    name: string,
    period: string,
    room: string,
    start: Time,
    end: Time
}
interface ClassInfoProps {
    value: ClassInfo,
    setValue: (value: ClassInfo) => void,
    deleteClass: () => void
}

function ClassInfoComponent({ value, setValue, deleteClass }: ClassInfoProps) {
    const handleChange = (key: keyof ClassInfo, newValue: any) => {
        setValue({
            ...value,
            [key]: newValue,
        });
    };

    return (  
        <div className="ClassInfo">
            <div className="ClassInfoData">
                <span>Name:</span>
                <input
                    placeholder="Homeroom"
                    value={value.name}
                    onChange={e => handleChange("name", e.target.value)}
                />
            </div>
            <div className="ClassInfoData">
                <span>Period:</span>
                <input
                    placeholder="0"
                    value={value.period}
                    onChange={e => handleChange("period", e.target.value)}
                />
            </div>
            <div className="ClassInfoData">
                <span>Room:</span>
                <input
                    placeholder="1"
                    value={value.room}
                    onChange={e => handleChange("room", e.target.value)}
                />
            </div>
            <div className="ClassInfoData">
                <span>Start:</span>
                <TimePicker
                    placeholderHour="7"
                    placeholderMinute="51"
                    value={value.start}
                    setValue={(newVal: Time) => handleChange("start", newVal)}
                />
            </div>
            <div className="ClassInfoData">
                <span>End:</span>
                <TimePicker
                    placeholderHour="7"
                    placeholderMinute="58"
                    value={value.end}
                    setValue={(newVal: Time) => handleChange("end", newVal)}
                />
            </div>
            <button onClick={deleteClass}>Delete Class</button>
        </div>
    )
}

export default ClassInfoComponent
export { ClassInfo }