import { useState } from 'react'

import "./ClassPeriodList.scss"

import ClassInfoComponent, { ClassInfoType } from "./ClassInfo"
import { Time, AMPM } from "./TimePicker"

interface ClassPeriodProps {
    classes: ClassInfoType[],
    setClasses: (value: ClassInfoType[]) => void
}

function ClassPeriodList({ classes, setClasses }: ClassPeriodProps) {
    const [classInfo, setClassInfo] = useState<ClassInfoType>({
        name: "Class",
        period: "1",
        room: "1",
        start: { hour: 8, minute: 50, ampm: AMPM.AM },
        end: { hour: 3, minute: 0, ampm: AMPM.PM }
    });

    const addClass = () => {
        let newClass = {...classInfo};
        setClasses([...classes, newClass]);
    };

    const setClassValue = (newVal: ClassInfoType, idx: number) => {
        const updated = [...classes];
        updated[idx] = newVal;
        setClasses(updated);
    }

    const deleteClass = (idx: number) => {
        setClasses(
            classes.filter((_, i) => i != idx)
        );
    }

    return (  
        <div id="ClassPeriodList">
            <button onClick={addClass} id="AddClassButon">Add Class</button>
            <div id="Classes">
                {classes.map((item, idx) => (
                    <ClassInfoComponent
                        key={idx}
                        value={item}
                        setValue={(newVal: ClassInfoType) => setClassValue(newVal, idx)}
                        deleteClass={() => {deleteClass(idx)}}
                    />
                ))}
            </div>
        </div>
    )
}

export default ClassPeriodList
