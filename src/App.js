import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './containers/Landing';
import NotFound from './containers/NotFound';
import LoginSignUp from './components/LoginSignUp';
import MainContent from './containers/MainContent';
import Settings from './components/Settings'
import UpcomingFestivals from './components/UpcomingFestivals'
import { Switch, Route, withRouter } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import HeaderLogo from './components/HeaderLogo'
import Artists from './components/Artists'

class App extends React.Component {

  state = {
    user: {
      id: null,
      name: "",
      username: ""
    },
    token: ""
  }

  componentDidMount(){
    if(localStorage.token){
      fetch('http://localhost:3000/persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.handleAuthResponse(json))
    }
  }

  // RENDER METHODS
  renderLogin = () => {
    return <LoginSignUp login={true} handleLogin={this.handleLogin}/>
  }

  renderSignUp = () => {
    return <LoginSignUp login={false} handleSignUp={this.handleSignUp}/>
  }

  renderUpcomingFestivals = () => {
    return <UpcomingFestivals />
  }

  renderSettings = () => {
    return <Settings />
  }

  // LOGIN FUNCTIONALITY 
  handleLogin = ({username, password}) => {
    let user = {
      username: username,
      password: password
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.handleAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  handleSignUp = ({name, username, password}) => {
    let newUser = {
      name: name,
      username: username,
      password: password
    }
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error) {
        this.handleAuthResponse(json)
      } else {
        alert(json.error)
      }
      })
    }

  handleAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
      this.setState({
        user: JSON.parse(json.user),
        token: json.token
      }, () => this.props.history.push('/home'))
    }
  }

  // NAVIGATION
  handleMenuSelection = (selection) => {
    switch (selection){
      case 'home':
        this.props.history.push('/home')
      case 'artists':
        this.props.history.push('/artists')
      case 'upcoming':
        this.props.history.push('/upcomingfestivals')
      case 'settings':
        this.props.history.push('/settings')
      default:
        this.props.history.push('/home')
    }
  }

  
  render(){
    return (
      <div className="App">
        {/* render nav bar and header with conditional to determine if this is a login or home page */}
        {/* {this.state.token !== "" ? <HeaderLogo /> : false} */}
        {/* {this.state.token !== "" ? <SideNavigation /> : false} */}
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/login" render={this.renderLogin}/>
        <Route path="/signup" render={this.renderSignUp}/>
        <Route path="/home" render={MainContent}/>
        <Route path="/artists" render={Artists}/>
        <Route path="/upcomingfestivals" render={this.renderUpcomingFestivals}/>
        <Route path="/settings" render={this.renderSettings}/>

        <Route component={NotFound}/>
      </Switch>
    </div>
    )};
}

export default withRouter(App)