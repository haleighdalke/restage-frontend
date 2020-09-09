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
import RegisterArtist from './components/RegisterArtist'
import RegisterAdmin from './components/RegisterAdmin'
import ViewArtist from './components/ViewArtist';
import FestivalApplication from './components/FestivalApplication';

class App extends React.Component {

  state = {
    user: {
      id: null,
      name: "",
      username: ""
    },
    artist: {},
    admin: {},
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
    return <UpcomingFestivals festivals={this.state.festivals} handleViewFestival={this.handleViewFestival} artist={this.state.artist}/>
  }

  renderSettings = () => {
    return <Settings user={this.state.user} artist={this.state.artist} admin={this.state.admin} updateUserInfo={this.updateUserInfo} handleMenuSelection={this.handleMenuSelection} handleLogout={this.handleLogout}/>
  }

  renderHomePage = () => {
    return <HomePage festivals={this.state.festivals} viewFestival={this.viewFestival}/>
  }

  renderArtists = () => {
    return <Artists artists={this.state.artists} viewArtist={this.viewArtist} handleMenuSelection={this.handleMenuSelection}/>
  }

  renderFestival = () => {
    return <Festival festival={this.state.currentFestival} />
  }

  renderRegisterArtist = () => {
    return <RegisterArtist user={this.state.user} artist={this.state.artist} createArtist={this.createArtist} updateArtist={this.updateArtist} handleMenuSelection={this.handleMenuSelection}/>
  }

  renderRegisterAdmin = () => {
    return <RegisterAdmin user={this.state.user} createAdmin={this.createAdmin} handleMenuSelection={this.handleMenuSelection}/>
  }

  renderViewArtist = () => {
    return <ViewArtist artist={this.state.currentViewArtist} festivals={this.state.festivals} pieces={this.state.pieces} handleMenuSelection={this.handleMenuSelection}/>
  }

  renderFestivalApplication = () => {
    return <FestivalApplication artist={this.state.artist} festival={this.state.currentViewFestival} createPiece={this.createPiece} handleMenuSelection={this.handleMenuSelection}/>
  }

  viewArtist = (artist) => {
    this.setState({
      currentViewArtist: artist
    })
    this.props.history.push(`/artists/${artist.id}`)
  }

  viewFestival = (festival) => {
    this.setState({
      currentFestival: festival
    })
    // document.querySelector(".home-page").innerHTML = ""
    this.props.history.push(`/festivals/${festival.id}`)
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
      if (json.admin){
        this.setState({admin: JSON.parse(json.admin)})
      }
      if (json.artist){
        this.setState({artist: JSON.parse(json.artist)})
      }
      this.setState({
        user: JSON.parse(json.user),
        token: json.token
      }, () => this.props.history.push('/home'))
    }
  }

  // NAVIGATION
  handleMenuSelection = (e, selection) => {

    this.handleMenuSelectionCSS(selection)

    switch (selection){
      case 'home':
        this.props.history.push('/home')
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
      case 'registerartist':
        this.props.history.push('/registerartist')
        break
      case 'registeradmin':
        this.props.history.push('/registeradmin')
        break
      case 'festivalapplication':
        this.props.history.push('/festivalapplication')
        break
      // end
      // default:
      //   this.props.history.push('/home')
    }
    this.closeNav()
  }

  handleMenuSelectionCSS = (selection) => {

    if(selection == "home" || selection == "artists" || selection == "upcomingfestivals" || selection == "settings"){

      let allLinks = document.querySelectorAll(".sidebar a")
      allLinks.forEach(link => {
        if(link.className !== "closebtn"){
          link.style.color = "#3B945E"
        }
      })
      
      let item = document.getElementById(`nav-${selection}`)
      item.style.color = "#f2f2f2"
    }
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

  updateUserInfo = (user) => {
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        user: json
      })
      alert("User Information Succesfully Updated")
    })
  }

  createArtist = (e, artist, headshot) => {
    // fetch and handle bad data error
    // update state with information and "artist=true" ?
    debugger

    let formData = new FormData();
    formData.append("user_id", artist.user_id)
    formData.append("company_title", artist.company_title)
    formData.append("bio", artist.bio)
    formData.append("headshot", headshot)

    fetch('http://localhost:3000/artists', {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        artist: json,
        artists: this.state.artists.push(json)
      })
      this.props.history.push('/settings')
      alert("Successfully registered as an Artist")
    })

  }

  createAdmin = (admin) => {
    console.log(admin)
    fetch('http://localhost:3000/admins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    })
    .then(res => res.json())
    .then(json => {
      if (json.id) {
        this.setState({
          admin: json
        })
        this.props.history.push('/settings')
        alert("Successfully registered as an Admin.")
      } else {
        alert("This user is already associated with an Admin account.")
      }
    })
  }

  updateArtist = (artist) => {
    let artists = this.state.artists.map(eachArtist => {
      if(eachArtist.id == artist.id){
        return artist
      }
      return eachArtist
    })
    this.setState({
      artists: artists,
      artist: artist
    })

    fetch(`http://localhost:3000/artists/${artist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(artist)
    })
    .then(res => res.json())
    .then(json => {
      this.props.history.push('/settings')
      alert("Artist Information Succesfully Updated")
    })
  }

  createPiece = (piece) => {
    // don't forget to add: validation that there are no duplicate piece submittions (title can't be taken)
    fetch('http://localhost:3000/pieces', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(piece)
    })
    .then(res => res.json())
    .then(json => {

      // **FIX LOGIC HERE to update festival's pieces
      let festivals = this.state.festivals.map(festival => {
        if(festival.id == json.festival_id){
          festival.pieces = [...festival.pieces, json]
          return festival
        }
        return festival
      })

      this.setState({
        pieces: [...this.state.pieces, json],
        festivals
      })
      this.props.history.push('/upcomingfestivals')
      alert("Your piece has been submitted successfully.")
    })
  }

  handleViewFestival = (e, festival) => {
    this.setState({
      currentViewFestival: festival
    })
    this.handleMenuSelection(e, "festivalapplication")
  }

  handleLogout = () => {
    localStorage.clear()
    window.location = "/"
    this.setState({
      user: {},
      artist: {},
      admin: {}
    })
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
        <Route path="/artists" exact render={this.renderArtists}/>
        <Route path="/upcomingfestivals" render={this.renderUpcomingFestivals}/>
        <Route path="/settings" render={this.renderSettings}/>
        <Route path="/festivals" render={this.renderFestival} />
        <Route path="/registerartist" render={this.renderRegisterArtist} />
        <Route path="/registeradmin" render={this.renderRegisterAdmin} />
        <Route path="/artists/" render={this.renderViewArtist} />
        <Route path="/festivalapplication" render={this.renderFestivalApplication} />
        <Route component={NotFound}/>
      </Switch>
    </div>
    )};
}

export default withRouter(App)