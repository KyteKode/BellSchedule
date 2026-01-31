function Desc() {
    const KyteKodeImageLink = "https://avatars.githubusercontent.com/u/231786375?s=96&v=4";

    return (
        <>
            <h1>Bell Schedule</h1>
            <a href="https://github.com/KyteKode" id="CreatedBy">
                <img src={KyteKodeImageLink} alt="" id="KyteKodeImage"></img>
                Created by KyteKode
            </a>

            <br /><br />

            <p>Bell schedule is an app that is used for looking at how much time is left until your next class period.</p> <br />
            <span>
                I got bored in class often and just wanted to look at how much time is left until next class,
                but I got tired of going to <a href="https://time.is">time.is</a> all the time.
            </span> <br />
            <p>So, I made this.</p>
        </>
    )
}

export default Desc