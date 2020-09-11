import React from 'react'
import { Button, Form, Input} from "reactstrap";

export default class RegisterAdmin extends React.Component {

    state = {
        user_id: this.props.user.id,
        name: this.props.user.name,
        username: this.props.user.username,
        ...this.props.admin
    }

    generateForm = () => {
        return(
            <Form onSubmit={(e) => this.handleSumbit(e)}>
                <label>Your Name</label>
                <Input name="name" placeholder="Your Name" value={this.state.name} type="text" readOnly/>
                <br></br>
                <label>Username</label>
                <Input name="username" placeholder="Username" value={this.state.username} type="text" readOnly/>
                <br></br>
                <label>Position Title</label>
                <Input name="title" value={this.props.admin.title ? this.props.admin.title : ""} placeholder="Position Title" type="text" maxLength="100" onChange={this.handleOnChange}/>
                <br></br>
                <label>Authorization Code</label>
                <Input name="authorization_code" value={this.props.admin.authorization_code ? this.props.admin.authorization_code : ""} placeholder="Authorization Code" type="password" maxLength="100" onChange={this.handleOnChange}/>
                <br></br>
                {this.props.admin.title ? false : <Button className="btn-round" variant='secondary' type="submit">Submit</Button> }
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
        let {user_id, title, authorization_code} = this.state
        let admin = {
            user_id,
            title,
            authorization_code
        }
        this.props.createAdmin(admin)
    }

    render() {
        return (
            <div className="settings">
                
                <div className="settings-form">
                    <h1>Register as an Admin</h1>
                    <br></br>
                    {this.generateForm()}
                </div>
                
            </div>
        )
    }
}