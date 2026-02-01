import "./CreatedBy.scss"

function CreatedByKyteKode() {
    const KyteKodeImageLink = "https://avatars.githubusercontent.com/u/231786375?s=96&v=4";

    return (
        <a href="https://github.com/KyteKode" id="CreatedBy">
            <img src={KyteKodeImageLink} alt="" id="KyteKodeImage" />
            Created by KyteKode
        </a>
    )
}

export default CreatedByKyteKode