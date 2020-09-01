import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './containers/Landing';
import NotFound from './containers/NotFound';
import LoginSignUp from './components/LoginSignUp';
import HomePage from './components/HomePage';
import Settings from './components/Settings'
import UpcomingFestivals from './components/UpcomingFestivals'
import { Switch, Route, withRouter } from 'react-router-dom';
import NavHeader from './components/NavHeader'
import Artists from './components/Artists'
import Festival from './components/Festival'

class App extends React.Component {

  state = {
    user: {
      id: null,
      name: "",
      username: ""
    },
    token: "",
    festivals: [],
    currentFestival: null,
    artists: [],
    pieces: []
  }

  componentDidMount(){
    this.getAllFestivals()
    this.getAllArtists()
    this.getAllPieces()
    if(localStorage.token){
      fetch('http://localhost:3000/persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => {
        this.handleAuthResponse(json)
      })
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
  handleMenuSelection = (e, selection) => {
    switch (selection){
      case 'home':
        this.props.history.push('/home')
        // e.target.style.color = "#fff"
        break
      case 'artists':
        this.props.history.push('/artists')
        break
      case 'upcomingfestivals':
        this.props.history.push('/upcomingfestivals')
        break
      case 'settings':
        this.props.history.push('/settings')
        break
      // default:
      //   this.props.history.push('/home')
    }
    this.closeNav()
  }

  renderHomePage = () => {
    return <HomePage festivals={this.state.festivals} viewFestival={this.viewFestival}/>
  }

  renderArtists = () => {
    return <Artists />
  }

  renderFestival = () => {
    return <Festival festival={this.state.currentFestival} />
  }

  // FETCHES
  getAllFestivals = () => {
    fetch('http://localhost:3000/festivals')
    .then(res => res.json())
    .then(json => {
      this.setState({
        festivals: json
      })
    })
  }

  getAllArtists = () => {
    fetch('http://localhost:3000/artists')
    .then(res => res.json())
    .then(json => {
      this.setState({
        artists: json
      })    
    })
  }

  getAllPieces = () => {
    fetch('http://localhost:3000/pieces')
    .then(res => res.json())
    .then(json => {
      this.setState({
        pieces: json
      })
    })
  }

  // ADDITIONAL METHODS

  viewFestival = (festival) => {
    this.setState({
      currentFestival: festival
    })
    // document.querySelector(".home-page").innerHTML = ""
    this.props.history.push(`/festivals/${festival.id}`)
  }

  // Set the width of the sidebar to 250px and the left margin of the page content to 250px
  openNav = () => {
    document.getElementById("mySidebar").style.width = "28%"
    document.getElementById("main").style.marginLeft = "28%"
    document.querySelector(".openbtn").style.display = "none"
  }

  // Set the width of the sidebar to 0 and the left margin of the page content to 0
  closeNav = () => {
    document.getElementById("mySidebar").style.width = "0"
    document.getElementById("main").style.marginLeft = "0"
    document.querySelector(".openbtn").style.display = "inline-block"
  }
  
  render(){
    return (
      <div className="App">
        {this.state.token !== "" ? <NavHeader handleMenuSelection={this.handleMenuSelection} openNav={this.openNav} closeNav={this.closeNav}/> : false}
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/login" render={this.renderLogin}/>
        <Route path="/signup" render={this.renderSignUp}/>
        <Route path="/home" render={this.renderHomePage}/>
        <Route path="/artists" render={this.renderArtists}/>
        <Route path="/upcomingfestivals" render={this.renderUpcomingFestivals}/>
        <Route path="/settings" render={this.renderSettings}/>
        <Route path="/festivals" render={this.renderFestival} />
        <Route component={NotFound}/>
      </Switch>
    </div>
    )};
}

export default withRouter(App)