import React from 'react'
import {Button} from 'reactstrap'

export default class UpcomingFestivals extends React.Component {

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
                                    <Button className="btn-round" variant='secondary' type="submit" style={{alignSelf: "right"}}>Apply Here</Button>
                                </div>   
                            </div>  
                        </div>
                    )
                } else{
                    even = !even
                    return(
                        <div className="upcoming-festival-item" key={festival.id}>
                            <div className="upcoming-festival-description">
                                <div className="festival-text" >
                                    <h4>{festival.title}</h4>
                                    <h6>{festival.description}</h6>
                                    <h6>Coming {festival.release_date}</h6>
                                    <br></br>
                                    <Button className="btn-round" variant='secondary' type="submit" style={{alignSelf: "right"}}>Apply Here</Button>
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