import React from 'react'

export default class Artists extends React.Component {

    generateArtists = () => {
        console.log(this.props.artists)
        return this.props.artists.map(artist => {
            return (
                <div className="hexagon" key={artist.id} id={artist.id}>
                    <div className="hexagon-inside">
                        <div className="hexagon-image" style={{backgroundImage: `url(${artist.photo})`}}>
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