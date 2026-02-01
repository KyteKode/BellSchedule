interface ClampedInputProps {
  min: number;
  max: number;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
}

function ClampedInput({ min, max, placeholder, value, setValue }: ClampedInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        if (val === "") {
            setValue(min);
            return;
        }
        const num = Number(val);
        if (!isNaN(num) && num >= min && num <= max) {
            setValue(num);
        }
    };

    return (  
        <input
            type="number"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            min={min}
            max={max}
        />
    )
}

export default ClampedInput