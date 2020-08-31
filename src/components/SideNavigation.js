import React from 'react'
import { useHistory } from 'react-router-dom'

const SideNavigation = () => {

    let history = useHistory()

   let handleMenuSelection = (selection) => {
        switch (selection){
          case 'home':
            history.push('/home')
            break
          case 'artists':
            history.push('/artists')
            break
          case 'upcoming':
            history.push('/upcomingfestivals')
            break
          case 'settings':
            history.push('/settings')
            break
          default:
            history.push('/home')

        }
    }
  

    
    return (
        <div className="side-navigation">

        </div>
    )
    
}

export default SideNavigation