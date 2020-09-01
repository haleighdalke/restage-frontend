import React from 'react'

const Festival = ({festival}) => {

    let generatePieces = () => {
        console.log(festival.pieces)
        return festival.pieces.map(piece => {
            return (
                <div key={piece.id} className="view-piece">
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