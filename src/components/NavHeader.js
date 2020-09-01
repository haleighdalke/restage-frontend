import React from "react";
import logo from '../assets/img/restage_logo_green.png'

const NavHeader = ({handleMenuSelection, openNav, closeNav}) => {

    return (
      <div className="header-logo">
            <div id="mySidebar" className="sidebar">
                <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&#9776;</a>
                <br></br>
                <br></br>
                <a href="javascript:void(0)" onClick={(e) => handleMenuSelection(e, "home")}>Home</a>
                <a href="javascript:void(0)" onClick={(e) => handleMenuSelection(e, "artists")}>Artists</a>
                <a href="javascript:void(0)" onClick={(e) => handleMenuSelection(e, "upcomingfestivals")}>Upcoming Festivals</a>
                <a href="javascript:void(0)" onClick={(e) => handleMenuSelection(e, "settings")}>My Settings</a>
            </div>
            <div id="main">
                <img src={logo} alt="restage" id="logo-green"/>
                <h1 href="javascript:void(0)" className="openbtn" onClick={() => openNav()}>&#9776;</h1>
            </div>
      </div>
  );
}

export default NavHeader