function ClassPeriod({name, period, start, end}) {
    return (  
        <div>
            Period {period}: {name} (Starts at {start.hour}:{start.minute} {start.ampm}, ends at {end.hour}:{end.minute} {end.ampm}) <br />
        </div>
    )
}

export default ClassPeriod