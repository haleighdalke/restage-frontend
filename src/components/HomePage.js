import React from "react";
import Carousel from 'react-bootstrap/Carousel'

const HomePage = ({festivals, viewFestival}) => {


  let renderCarouselItems = () => {
    return festivals.map(festival => {
      return (
        <Carousel.Item key={festival.id} onClick={(e) => viewFestival(festival)}>
              <img
                className="d-block w-100"
                src={festival.cover_photo}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{festival.title}</h3>
                <p>{festival.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
      )
    })
  }

  return (
      <div className="home-page">
        <Carousel className="festivals-carousel">
          {renderCarouselItems()}
        </Carousel>
      </div>
  )

}

export default HomePage