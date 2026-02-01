import ClampedInput from "./ClampedInput"

enum AMPM {
  AM = "AM",
  PM = "PM",
}

interface Time {
    hour: number,
    minute: number,
    ampm: AMPM
}

interface TimePickerProps {
    placeholderHour: string;
    placeholderMinute: string;
    value: Time;
    setValue: (value: Time) => void;
}

function TimePicker({ placeholderHour, placeholderMinute, value, setValue }: TimePickerProps) {
    const hourChange = (newValue: number) => {
        setValue({
            ...value,
            hour: newValue,
        });
    };

    const minuteChange = (newValue: number) => {
        setValue({
            ...value,
            minute: newValue,
        });
    };

    const AMPMChange = (newValue: AMPM) => {
        setValue({
            ...value,
            ampm: newValue,
        });
    };


    return (  
        <div>
            <ClampedInput
                placeholder={placeholderHour}
                min={1}
                max={12}
                value={value.hour}
                setValue={(newVal: number) => hourChange(newVal)}
            />
            <ClampedInput
                placeholder={placeholderMinute}
                min={0}
                max={59}
                value={value.minute}
                setValue={(newVal: number) => minuteChange(newVal)}
            />
            <select
                name="AMPM"
                value={value.ampm}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => AMPMChange(e.target.value as AMPM)}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
    )
}

export default TimePicker
export { Time, AMPM }