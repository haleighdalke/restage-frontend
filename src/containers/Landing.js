import React from "react";
import { Button, Container } from "reactstrap";
import { useHistory } from 'react-router-dom'
import logo from '../assets/img/restage_logo.png'

const LandingPage = () => {
  let history = useHistory()

    return (
      <div className="page-header-landing">
            <div className="landing-line-container">
                {/* <hr className="landing-line"/> */}
                <Button className="login-button" onClick={() => history.push('/login')}>Login</Button>
                <Button className="login-button" onClick={() => history.push('/signup')}>Sign Up</Button>
            </div>  
            <div className="landing-logo" >
                <img src={logo} alt="restage"/>
            </div>
      </div>
  );
}

export default LandingPage