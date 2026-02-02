import { useRef, useEffect, useState } from 'react';

import "./Core.scss"

import { ClassInfoType } from "../ClassPeriod/ClassInfo"
import { AMPM, Time } from "../ClassPeriod/TimePicker"

interface CurrentClassProps {
    classes: ClassInfoType[]
}

interface Hour24Time {
    hour: number,
    minute: number
}

// TODO: finish hour12 to hour24, finish CurrentClass component

function hour12_to_date(time: Time) {
    let hour24 = time.hour;
    
    if (time.ampm === AMPM.PM && time.hour !== 12) {
        hour24 += 12;
    } else if (time.ampm === AMPM.AM && time.hour === 12) {
        hour24 = 0;
    }
    
    let date = new Date();
    date.setHours(hour24);
    date.setMinutes(time.minute);
    date.setSeconds(0);
    return date;
}

function CurrentClass({ classes }: CurrentClassProps) {
    let [currentClass, setCurrentClass] = useState<ClassInfoType>({
        name: "",
        period: "",
        room: "",
        start: { hour: 0, minute: 0, ampm: AMPM.AM},
        end: { hour: 0, minute: 0, ampm: AMPM.AM }
    });

    const update_current_class = () => {
        const now = new Date();

        const activeClasses = classes.filter((classInfo) => {
            const start = hour12_to_date(classInfo.start);
            const end = hour12_to_date(classInfo.end);
            return now >= start && now < end;
        });
        
        if (activeClasses.length > 0) {
            const activeClass = activeClasses.reduce((earliest, current) => {
                const earliestEnd = hour12_to_date(earliest.end);
                const currentEnd = hour12_to_date(current.end);
                return currentEnd < earliestEnd ? current : earliest;
            });
            
            if (activeClass && activeClass != currentClass) {
                setCurrentClass(activeClass);
                console.log("changed to:", activeClass.name);
            }
        } else if (currentClass.name !== "") {
            setCurrentClass({
                name: "", period: "", room: "",
                start: { hour: 0, minute: 0, ampm: AMPM.AM },
                end: { hour: 0, minute: 0, ampm: AMPM.AM }
            });
        }
    }

    const until_class_end = () => {
        let class_end_date = hour12_to_date(currentClass.end);
        let ms: number = class_end_date.getTime() - Date.now();

        let hours = Math.floor(ms / 3600000);
        let remainder = ms % 3600000;
        let minutes = Math.floor(remainder / 60000);
        remainder %= 60000;
        let seconds = Math.round(remainder / 1000);

        return String(hours)+":"+String(minutes)+":"+String(seconds);
    }

    const [untilEnd, setUntilEnd] = useState("");
    const animationRef = useRef<number>(null);

    const update = (time: number) => {
        update_current_class();
        setUntilEnd(until_class_end());
        animationRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(update);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [classes, currentClass]);

    return (
        <div id="CurrentClass">
            <span>Current Class: {currentClass.name}</span>
            <span>Period {currentClass.period}</span>
            <span>Room {currentClass.room}</span>
            <span>Ends in {untilEnd}</span>
        </div>
    )
}

export default CurrentClass