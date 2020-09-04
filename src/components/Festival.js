import React from 'react'

const Festival = ({festival}) => {

    let generatePieces = () => {
        return festival.pieces.map(piece => {
            return (
                <div key={piece.id} className="view-piece">
                    <iframe key={piece.id} width="80%" height="800px" src={`https://www.youtube-nocookie.com/embed/${piece.trailer_id}?controls=0`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <h1>{piece.title}</h1>
                    <h3>{piece.description}</h3>
                </div>
            )
        })
    }

    return (
        <div className="festival">
            {festival ? generatePieces() : false}
        </div>
    )

}

export default Festival