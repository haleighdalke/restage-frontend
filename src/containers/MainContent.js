import React from "react";
import SideNavigation from '../components/SideNavigation'
import { useHistory } from 'react-router-dom'

const MainContent = (history) => {

    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    let openNav = () => {
        document.getElementById("mySidebar").style.width = "250px"
        document.getElementById("main").style.marginLeft = "250px"
    }
    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    let closeNav = () => {
        document.getElementById("mySidebar").style.width = "0"
        document.getElementById("main").style.marginLeft = "0"
    }

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
      <div className="main-content">
            {/* <SideNavigation /> */}
            {/* <FestivalCarousel /> */}
            <div id="mySidebar" class="sidebar">
                <a href="javascript:void(0)" class="closebtn" onClick={() => closeNav()}>&times;</a>
                <h3 onClick={(e) => handleMenuSelection(e.target.value)}>settings</h3>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
            <div id="main">
                <button class="openbtn" onClick={() => openNav()}>&#9776; Open Sidebar</button>
            </div>
      </div>
  );
}

export default MainContent