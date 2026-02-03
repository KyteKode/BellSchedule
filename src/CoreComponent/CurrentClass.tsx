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

const NO_CLASS = {
        name: "ERROR",
        period: "ERROR",
        room: "ERROR",
        start: { hour: 99999, minute: 99999, ampm: AMPM.PM},
        end: { hour: 99999, minute: 99999, ampm: AMPM.PM }
    } as const;

function CurrentClass({ classes }: CurrentClassProps) {

    const [currentClass, setCurrentClass] = useState<ClassInfoType>(NO_CLASS);

    const update_current_class = () => {
        const now = new Date();

        const nowMS = now.getTime();
        const activeClasses = classes.filter((classInfo) => {
            const start = hour12_to_date(classInfo.start).getTime();
            const end = hour12_to_date(classInfo.end).getTime();

            if (nowMS >= start && nowMS < end) {
                console.log(classInfo.name);
            }
            return nowMS >= start && nowMS < end;
        });
        
        if (activeClasses.length > 0) {
            const activeClass = activeClasses.reduce((earliest, current) => {
                const earliestEnd = hour12_to_date(earliest.end);
                const currentEnd = hour12_to_date(current.end);
                console.log(earliest.name);
                return currentEnd < earliestEnd ? current : earliest;
            }, NO_CLASS);
            
            if (activeClass && activeClass != currentClass) {
                setCurrentClass(activeClass);
            }
        } else if (currentClass.name !== "") {
            setCurrentClass(NO_CLASS);
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

        let padded_mins = String(minutes);
        if (padded_mins.length == 1) { padded_mins = " " + padded_mins; }

        let padded_secs = String(minutes);
        if (padded_secs.length == 1) { padded_secs = " " + padded_secs; }

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
    }, [classes]);

    return (
        <div id="CurrentClass">
            {classes.length != 0 && currentClass != NO_CLASS ? (
                <>
                    <span>Current Class: {currentClass.name}</span>
                    <span>Period {currentClass.period}</span>
                    <span>Room {currentClass.room}</span>
                    <span>Ends in {untilEnd}</span>
                </>
            ) : (
                <span>You're free! 🥳</span>
            )}
        </div>
    )
}

export default CurrentClass