import React, { useState } from "react";

function ClampedInput({min, max, placeholder, value, setValue}) {
    const handleChange = (e) => {
        let val = e.target.value;
        if (val === "") {
            setValue("");
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