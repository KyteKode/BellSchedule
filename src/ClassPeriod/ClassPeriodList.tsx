import { useState, useRef } from 'react'

import "./ClassPeriodList.scss"

import ClassInfoComponent, { ClassInfo } from "./ClassInfo"
import { Time, AMPM } from "./TimePicker"

interface ClassPeriodProps {
    value: ClassInfo[],
    setValue: (value: ClassInfo[]) => void
}

function ClassPeriodList({ value, setValue}: ClassPeriodProps) {
    const [classInfo, setClassInfo] = useState<ClassInfo>({
        name: "Class",
        period: "1",
        room: "1",
        start: { hour: 8, minute: 50, ampm: AMPM.AM },
        end: { hour: 3, minute: 0, ampm: AMPM.PM }
    });

    const addClass = () => {
        let newClass = {...classInfo};
        setValue([...value, newClass]);
    };

    const setClassValue = (newVal: ClassInfo, idx: number) => {
        const updated = [...value];
        updated[idx] = newVal;
        setValue(updated);
    }

    const deleteClass = (idx: number) => {
        setValue(
            value.filter((_, i) => i != idx)
        );
    }

    return (  
        <div id="ClassPeriodList">
            <button onClick={addClass} id="AddClassButon">Add Class</button>
            <div id="Classes">
                {value.map((item, idx) => (
                    <ClassInfoComponent
                        key={idx}
                        value={item}
                        setValue={(newVal: ClassInfo) => setClassValue(newVal, idx)}
                        deleteClass={() => {deleteClass(idx)}}
                    />
                ))}
            </div>
        </div>
    )
}

export default ClassPeriodList
