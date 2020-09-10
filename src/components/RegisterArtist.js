import React from 'react'
import { Button, Form, Input} from "reactstrap";

export default class RegisterArtist extends React.Component {

    state = {
        user_id: this.props.user.id,
        ...this.props.artist
        // company_title: "", //look into how the state is being sent back up (maybe can use ...this.props.artist)
        // bio: "",
        // headshot: null
    }

    generateHeadshotButton = () => {
        if(this.state.id){
            return (<div>
                        <img src={this.props.artist.photo} alt="Your Headshot" height="100px" />
                        <br></br>
                    </div>
            )
        } else{
            return <Input name="headshot" placeholder="Attach Your Headshot" type="file" accept="image/*" onChange={this.handleOnChange}/>
        }
    }

    generateForm = () => {
        return(
            <Form onSubmit={(e) => { Object.keys(this.props.artist).length === 0 ? this.handleSumbit(e) : this.handleUpdate(e) }}>
                <label>Your Name</label>
                <Input name="name" placeholder="Your Name" value={this.props.user.name} readOnly type="text"/>
                <br></br>
                <label>Username</label>
                <Input name="username" placeholder="Username" value={this.props.user.username} readOnly type="text"/>
                <br></br>
                <label>Company Title</label>
                <Input name="company_title" value={this.state.company_title ? this.state.company_title : ""} placeholder="Your Company Title" type="text" maxLength="100" onChange={this.handleOnChange}/>
                <br></br>
                <label>Bio</label>
                <Input name="bio" value={this.state.bio ? this.state.bio : ""} placeholder="Bio (500 characters or less)" type="text" maxLength="500" onChange={this.handleOnChange}/>
                <br></br>
                <label>Headshot</label>
                {this.generateHeadshotButton()}
                <br></br>
                <Button className="btn-round" variant='secondary' type="submit">Submit</Button>
                <Button className="btn-round" variant='secondary' onClick={(e) => this.props.handleMenuSelection(e, 'settings')}>Back</Button>
            </Form>
        )
    }

    handleOnChange = (e) => {
        
        if(e.target.name === 'headshot'){
            // debugger
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        }
        else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        console.log(this.state)
    }

    handleSumbit = (e) => {
        e.preventDefault()

        // check to be sure none are empty
        // if empty, alert and don't fetch
        if(this.state.user_id && this.state.company_title && this.state.bio && this.state.headshot){
            let {user_id, company_title, bio, headshot} = this.state
            let artist = {
                user_id,
                company_title,
                bio
            }
            this.props.createArtist(e, artist, headshot)
        }
        else{
            alert("Must include company title, bio, and headshot.")
        }
    }

    handleUpdate = (e) => {
        e.preventDefault()
        // check to be sure none are empty
        // if empty, alert and don't fetch
        if(this.state.user_id && this.state.company_title && this.state.bio && this.state.headshot){
                let artist = {
                ...this.state,
                id: this.props.artist.id
            }
            this.props.updateArtist(artist)
        } 
        else {
            alert("Must include company title, bio, and headshot.")
        }
    }

    render() {
        return (
            <div className="settings">
                
                <div className="settings-form">
                    <h1>Register as an Artist</h1>
                    <br></br>
                    {this.generateForm()}
                </div>
                
            </div>
        )
    }
}