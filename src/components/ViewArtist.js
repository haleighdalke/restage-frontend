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

        // TRYING TO FILTER OUT DUPLICATE FESTIVALS STILL WORKING THRU
        let temp = []
        let uniqueFestivals = filteredPieces.filter(piece => {
            if(!temp.includes(piece.festival.id)){
                temp.push(piece.festival.id)
                return piece.festival
            }
        })

                // let dateArr = piece.festival.release_date.split("-").map(day => parseInt(day))
                // let currentDate = new Date(dateArr[0], dateArr[1], dateArr[2])
                // if(currentDate <= today){
                //     currentFestivals.push(piece.festival)
                // }else{
                //     upcomingFestivals.push(piece.festival)
                // }

        

        // console.log(currentFestivals)
        // console.log(upcomingFestivals)

        return uniqueFestivals.map(festival => {
            return(
            <tr key={festival.id}>
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
                        <h1>{artist.title}</h1>
                        <h3>{artist.bio}</h3>
                        <h2>Festivals: </h2>
                        <table>
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