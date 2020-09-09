import React from 'react'

export default class ViewArtist extends React.Component {

    getReleaseDate = (release_date) => {
        let dateArr = release_date.split("-").map(day => parseInt(day))
        let currentDate = new Date(dateArr[0], dateArr[1], dateArr[2]) 
        return currentDate.toDateString()
    }

    generateFestivals = () => {

        // commented out logic for separating upcoming vs current festivals

        // let today = new Date(2020, 2, 23)
        let artist = this.props.artist
        // let currentFestivals = []
        // let upcomingFestivals = []
        let filteredPieces = this.props.pieces.filter(piece => piece.artist.id === artist.id)

                // let dateArr = piece.festival.release_date.split("-").map(day => parseInt(day))
                // let currentDate = new Date(dateArr[0], dateArr[1], dateArr[2])
                // if(currentDate <= today){
                //     currentFestivals.push(piece.festival)
                // }else{
                //     upcomingFestivals.push(piece.festival)
                // }

        

        // console.log(currentFestivals)
        // console.log(upcomingFestivals)

        return filteredPieces.map(piece => {
            let festival = piece.festival
            return(
            <tr key={piece.id} className="artist-table-row" onClick={(e) => this.props.handleMenuSelection(e, "home")}>
                <td>
                    "{festival.title}" coming {this.getReleaseDate(festival.release_date)}
                </td>
            </tr>
            )     
        })
    }

    generateArtist = () => {
        let artist = this.props.artist
            return (
                <div className="view-artist">
                    <div className="artist-photo">
                        <img src={artist.photo} alt={artist.title} height="500px"/>
                    </div>
                    <div className="artist-info">
                        <h1>{artist.company_title}</h1>
                        <h5>{artist.bio}</h5>
                        <br></br>
                        <h2>Upcoming Festivals:</h2>
                        <table className="artist-table">
                            <tbody>
                                {this.generateFestivals()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        

    }


    render() {
        return (
            <div className="artists">
                {this.props.artist ? this.generateArtist() :false}
            </div>
        )
    }
}