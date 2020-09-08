import React from 'react'

export default class ViewArtist extends React.Component {

    generateFestivals = () => {
        let artist = this.props.artist
        let artistFestivals = this.props.pieces.map(piece => {
            if(piece.artist.id == artist.id){
                return piece.festival
            }
        })

        let sortedFestivals = artistFestivals.sort((a, b) => b.release_date - a.release_date)
        debugger
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
                        <table>
                            {this.generateFestivals()}
                            <tr>

                            </tr>
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