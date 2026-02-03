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

const NO_CLASS: ClassInfoType = {
    name: "ERROR",
    period: "ERROR",
    room: "ERROR",
    start: { hour: 99999, minute: 99999, ampm: AMPM.PM},
    end: { hour: 99999, minute: 99999, ampm: AMPM.PM }
} as const;

const EARLY_CLASS: ClassInfoType = {
    name: "EARLY",
    period: "EARLY",
    room: "EARLY",
    start: { hour: 0, minute: 0, ampm: AMPM.AM},
    end: { hour: 0, minute: 0, ampm: AMPM.AM }
} as const;


const INBETWEEN_CLASS: ClassInfoType = {
    name: "INBETWEEN",
    period: "INBETWEEN",
    room: "INBETWEEN",
    start: { hour: 99999, minute: 99999, ampm: AMPM.PM},
    end: { hour: 99999, minute: 99999, ampm: AMPM.PM }
} as const;

function CurrentClass({ classes }: CurrentClassProps) {
    let resolvedClass: ClassInfoType = NO_CLASS;

    const [currentClass, setCurrentClass] = useState<ClassInfoType>(NO_CLASS);

    const update_current_class = () => {
        const now = new Date();

        const nowMS = now.getTime();

        let earliestClass = { ...NO_CLASS};
        let latestClass = { ...EARLY_CLASS};

        const activeClasses = classes.filter((classInfo) => {
            const start = hour12_to_date(classInfo.start).getTime();
            const end = hour12_to_date(classInfo.end).getTime();

            if (
                earliestClass == NO_CLASS ||
                start < hour12_to_date(earliestClass.start).getTime()
            ) {
                earliestClass = classInfo;
            }

            if (
                latestClass == EARLY_CLASS ||
                start > hour12_to_date(latestClass.start).getTime()
            ) {
                latestClass = classInfo;
            }

            return nowMS >= start && nowMS < end;
        });

        let schoolStarted = 
            earliestClass != NO_CLASS &&
            hour12_to_date(earliestClass.start).getTime() < nowMS;
        
        let schoolEnded = 
            latestClass != EARLY_CLASS &&
            hour12_to_date(latestClass.start).getTime() > nowMS;
        
        if (activeClasses.length > 0) {
            const activeClass = activeClasses.reduce((earliest, current) => {
                const earliestEnd = hour12_to_date(earliest.end);
                const currentEnd = hour12_to_date(current.end);
                console.log(earliest.name);
                return currentEnd < earliestEnd ? current : earliest;
            }, NO_CLASS);
            
            if (activeClass && activeClass != resolvedClass/*currentClass*/) {
                resolvedClass = activeClass;
                setCurrentClass(activeClass);
            }
        } else if (schoolStarted && !schoolEnded) {
            resolvedClass = INBETWEEN_CLASS;
            setCurrentClass(INBETWEEN_CLASS);
        } else {
            resolvedClass = NO_CLASS;
            setCurrentClass(NO_CLASS);
        }
    }

    const until_class_end = () => {
        let class_end_date = hour12_to_date(/*currentClass*/resolvedClass.end);
        let ms: number = class_end_date.getTime() - (new Date).getTime();

        let hours = Math.floor(ms / 3600000);
        let remainder = ms % 3600000;
        let minutes = Math.floor(remainder / 60000);
        remainder %= 60000;
        let seconds = Math.round(remainder / 1000);

        let padded_mins = String(minutes);
        if (padded_mins.length == 1) { padded_mins = " " + padded_mins; }

        let padded_secs = String(seconds);
        if (padded_secs.length == 1) { padded_secs = " " + padded_secs; }

        return String(hours)+":"+String(padded_mins)+":"+String(padded_secs);
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
            {classes.length == 0 ? (
                /*currentClass*/resolvedClass == NO_CLASS ? (
                    <span>You're free! 🥳</span>
                ) : (
                    <span>Inbetween Classes...</span>
                )
                
            ) : (
                <>
                    <span>Current Class: {currentClass.name}</span>
                    <span>Period {currentClass.period}</span>
                    <span>Room {currentClass.room}</span>
                    <span>Ends in {untilEnd}</span>
                </>
            )}
        </div>
    )
}

export default CurrentClass