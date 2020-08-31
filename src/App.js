import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './containers/Landing';
import NotFound from './containers/NotFound';
import LoginSignUp from './components/LoginSignUp';
import MainContent from './containers/MainContent';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends React.Component {

  state = {
    user: {
      id: null,
      name: "",
      age: "",
      location: ""
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
        // this.getAllHabits()
        console.log("success")
        this.setState({
          user: {
            id: json.user.id,
            name: json.user.name,
            username: json.user.username
          },
          token: json.token
        }, () => this.props.history.push('/home'))
      }
    }

  
  render(){
    return (
      <div className="App">
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/login" render={this.renderLogin}/>
        <Route path="/signup" render={this.renderSignUp}/>
        <Route path="/home" render={MainContent}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
    )};
}

export default withRouter(App)