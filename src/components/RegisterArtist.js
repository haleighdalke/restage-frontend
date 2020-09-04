import React from 'react'
import { Button, Form, Input} from "reactstrap";

export default class RegisterArtist extends React.Component {

    state = {
        user_id: this.props.user.id,
        name: this.props.user.name,
        username: this.props.user.username,
        company_title: "",
        bio: "",
        headshot: null
    }

    generateForm = () => {
        return(
            <Form onSubmit={(e) => this.handleSumbit(e)}>
                <label>Your Name</label>
                <Input name="name" placeholder={this.props.user.name} type="text" onChange={this.handleOnChange}/>
                <br></br>
                <label>Username</label>
                <Input name="username" placeholder={this.props.user.username} type="text" maxlength="20" onChange={this.handleOnChange}/>
                <br></br>
                <label>Company Title</label>
                <Input name="company_title" placeholder="Your Company Title" type="text" maxlength="100" onChange={this.handleOnChange}/>
                <br></br>
                <label>Bio</label>
                <Input name="bio" placeholder="Bio (500 characters or less)" type="text" maxlength="500" onChange={this.handleOnChange}/>
                <br></br>
                <label>Headshot</label>
                <Input name="photo" placeholder="upload your headshot" type="file" onChange={this.handleOnChange}/>
                <br></br>
                <Button className="btn-round" variant='secondary' type="submit">Submit</Button>
                <Button className="btn-round" variant='secondary' onClick={(e) => this.props.handleMenuSelection(e, 'settings')}>Back</Button>
            </Form>
        )
    }

    handleOnChange = (e) => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSumbit = (e) => {
        e.preventDefault()
        let {user_id, company_title, bio, headshot} = this.state
        let artist = {
            user_id,
            company_title,
            bio,
            headshot
        }
        this.props.createArtist(artist)
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