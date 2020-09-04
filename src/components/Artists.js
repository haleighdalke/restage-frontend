import React from 'react'

export default class Artists extends React.Component {

    generateArtists = () => {
        return this.props.artists.map(artist => {
            return (
                <div className="hexagon" key={artist.id}>
                    <div className="hexagon-inside">
                        <div className="hexagon-image" style={{backgroundImage: `url(${artist.photo})`}}>
                            <h3 className="artist-text">{artist.company_title}</h3>
                            <p>{artist.description}</p>
                        </div>
                    </div>
                </div>
            )
        })

    }


    render() {
        return (
            <div className="artists">
                {this.generateArtists()}
            </div>
        )
    }
}