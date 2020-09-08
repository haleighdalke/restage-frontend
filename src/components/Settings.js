import React from 'react'
import { Button, Form, Input, ButtonToggle} from "reactstrap";

export default class Settings extends React.Component {

    state = {
        name: this.props.user.name,
        username: this.props.user.username
    }

    generateForm = () => {
        return(
            <Form onSubmit={(e) => this.handleSumbit(e)}>
                <label>Your Name</label>
                <Input name="name" placeholder="Your Name" value={this.state.name} type="text" onChange={this.handleOnChange}/>
                <br></br>
                <label>Username</label>
                <Input name="username" placeholder="Username" value={this.state.username} type="text" maxlength="20" onChange={this.handleOnChange}/>
                <br></br>
                <Button className="btn-round" variant='secondary' type="submit">Update</Button>
            </Form>
        )
    }

    renderArtistButton = (artistControl="Register as an Artist") => {
        return <Button className="btn-round" variant='secondary' type="submit" onClick={(e) => this.props.handleMenuSelection(e, 'registerartist')}>{artistControl}</Button>
    }

    renderAdminButton = (adminControl="Register as an Admin") => {
            return <Button className="btn-round" variant='secondary' type="submit" onClick={(e) => this.props.handleMenuSelection(e, 'registeradmin')}>{adminControl}</Button>
    }


    handleOnChange = (e) => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSumbit = (e) => {
        e.preventDefault()
        let user = {
            ...this.state,
            id: this.props.user.id
        }
        this.props.updateUserInfo(user)
    }

    render() {
        return (
            <div className="settings">
                
                <div className="settings-form">
                    <h1>Edit User Info</h1>
                    <br></br>
                    {this.generateForm()}
                    <br></br>
                    <div className="settings-register">
                        {Object.keys(this.props.artist).length ? this.renderArtistButton("Update Artist Info") : this.renderArtistButton()}
                        {Object.keys(this.props.admin).length ? this.renderAdminButton("Update Admin Info") : this.renderAdminButton()}
                    </div>
                    <br></br>
                    <Button className="btn-round" variant='secondary' onClick={this.props.handleLogout}>Logout</Button>
                </div>
                
            </div>
        )
    }
}