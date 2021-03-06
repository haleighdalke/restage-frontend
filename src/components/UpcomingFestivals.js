import React from 'react'
import {Button} from 'reactstrap'

export default class UpcomingFestivals extends React.Component {

    appliedToFestival = (festival_id) => {
        let answer = false
        this.props.pieces.map(piece => {
            if(piece.artist.id === this.props.artist.id && piece.festival.id === festival_id){
                answer = true
            }
        })
        return answer
    }

    renderApplyButton = (festival) => {
        if(Object.keys(this.props.artist).length === 0){
            return false
        }
        else if(this.appliedToFestival(festival.id)){
            return <Button className="btn-round" variant='secondary' type="submit" style={{alignSelf: "right"}} id={festival.id}>Applied</Button>
        }
        else {
            return <Button className="btn-round" variant='secondary' type="submit" style={{alignSelf: "right"}} id={festival.id} onClick={(e) => this.props.handleViewFestival(e, festival)}>Apply Here</Button>
        }
    }

    generateUpcomingFestivals = () => {
        let today = new Date()
        let even = true

        return this.props.festivals.map(festival => {

            if(festival.release_date > today.toISOString().slice(0, 10)){
                if(even){
                    even = !even
                    return(
                        <div className="upcoming-festival-item" key={festival.id}>
                            <div className="upcoming-festival-cover-photo">
                                <img src={festival.cover_photo} alt="Upcoming Festival Photo" />
                            </div>
                            <div className="upcoming-festival-description">
                                <div className="festival-text" >
                                    <h4>{festival.title}</h4>
                                    <h6>{festival.description}</h6>
                                    <h6>Coming {festival.release_date}</h6>
                                    <br></br>
                                    {this.renderApplyButton(festival)}
                                </div>   
                            </div>  
                        </div>
                    )
                } else{
                    even = !even
                    return(
                        <div className="upcoming-festival-item" key={festival}>
                            <div className="upcoming-festival-description">
                                <div className="festival-text" >
                                    <h4>{festival.title}</h4>
                                    <h6>{festival.description}</h6>
                                    <h6>Coming {festival.release_date}</h6>
                                    <br></br>
                                    {this.renderApplyButton(festival)}                                
                                    </div>   
                            </div>
                            <div className="upcoming-festival-cover-photo">
                                <img src={festival.cover_photo} alt="Upcoming Festival Photo" />
                            </div>
                        </div>
                    )
                }
                
            }
            
        })
    }

    render() {
        return (
            <div className="upcoming-festivals">
                {this.generateUpcomingFestivals()}
            </div>
        )
    }
}