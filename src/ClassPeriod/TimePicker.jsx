import ClampedInput from "./ClampedInput.jsx"

function TimePicker({ placeholderHour, placeholderMinute, value, setValue }) {
    const handleChange = (key, newValue) => {
        setValue({
            ...value,
            [key]: newValue,
        });
    };


    return (  
        <div>
            <ClampedInput
                placeholder={placeholderHour}
                min="1"
                max="12"
                value={value.hour}
                onChange={e => handleChange("hour", e.target.value)}
            />
            <ClampedInput
                placeholder={placeholderMinute}
                min="0"
                max="59"
                value={value.minute}
                onChange={e => handleChange("minute", e.target.value)}
            />
            <select
                name="AMPM"
                value={value.ampm}
                onChange={e => handleChange("ampm", e.target.value)}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
    )
}

export default TimePicker