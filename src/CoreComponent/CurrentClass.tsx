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

/*function hour12_to_hour24(time: Time) {
    let hour24_time: Hour24Time = {
        hour: 0,
        minute: classInfo.start.minute
    };

    if (classInfo.start.ampm == AMPM.AM) {
        start.hour = classInfo.start.hour;
    } else {
        start.hour = classInfo.start.hour + 12;
    }
}*/

function CurrentClass({ classes }: CurrentClassProps) {
    const current_class = () => {
        let hour24_start_times: Hour24Time[] = [];
        let hour24_end_times: Hour24Time[] = [];

        classes.forEach((classInfo) => {
            let start: Hour24Time = {
                hour: 0,
                minute: classInfo.start.minute
            };

            if (classInfo.start.ampm == AMPM.AM) {
                start.hour = classInfo.start.hour;
            } else {
                start.hour = classInfo.start.hour + 12;
            }

            hour24_start_times.push(start);

            let end: Hour24Time = {
                hour: 0,
                minute: classInfo.end.minute
            };

            if (classInfo.end.ampm == AMPM.AM) {
                end.hour = classInfo.end.hour;
            } else {
                end.hour = classInfo.end.hour + 12;
            }

            hour24_end_times.push(end);
        });

        const now = new Date();

        const hour = now.getHours();
        
    }

    return (
        <div id="CurrentClass">
            <span>Current Class:</span>
        </div>
    )
}

export default CurrentClass