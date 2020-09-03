import React from 'react'

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
                                    <h3>{festival.title}</h3>
                                    <h5>{festival.description}</h5>
                                    <h5>Coming {festival.release_date}</h5>
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
                                    <h3>{festival.title}</h3>
                                    <h5>{festival.description}</h5>
                                    <h5>Coming {festival.release_date}</h5>
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