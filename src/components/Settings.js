import React from 'react'
import { Button, Form, Input} from "reactstrap";

export default class Settings extends React.Component {

    state = {
        name: this.props.user.name,
        username: this.props.user.username
    }

    generateForm = () => {
        return(
            <Form onSubmit={(e) => this.handleSumbit(e)}>
                <label>Your Name</label>
                <Input name="name" placeholder={this.props.user.name} type="text" onChange={this.handleOnChange}/>
                <br></br>
                <label>Username</label>
                <Input name="username" placeholder={this.props.user.username} type="text" onChange={this.handleOnChange}/>
                <br></br>
                <Button className="btn-round" variant='secondary' type="submit">Update</Button>
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
                        <Button className="btn-round" variant='secondary' type="submit">Register as an Artist</Button>
                        <Button className="btn-round" variant='secondary' type="submit">Resister as an Admin</Button>
                    </div>
                </div>
                
            </div>
        )
    }
}