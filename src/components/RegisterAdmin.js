import React from 'react'
import { Button, Form, Input} from "reactstrap";

export default class RegisterAdmin extends React.Component {

    state = {
        user_id: this.props.user.id,
        name: this.props.user.name,
        username: this.props.user.username,
        title: "",
        authorization_code: ""
    }

    generateForm = () => {
        return(
            <Form onSubmit={(e) => this.handleSumbit(e)}>
                <label>Your Name</label>
                <Input name="name" placeholder="Your Name" value={this.state.name} type="text" readOnly/>
                <br></br>
                <label>Username</label>
                <Input name="username" placeholder="Username" value={this.state.username} type="text" maxlength="20" readOnly/>
                <br></br>
                <label>Position Title</label>
                <Input name="title" placeholder="Position Title" type="text" maxlength="100" onChange={this.handleOnChange}/>
                <br></br>
                <label>Authorization Code</label>
                <Input name="authorization_code" placeholder="Authorization Code" type="password" maxlength="100" onChange={this.handleOnChange}/>
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

        if(this.state.authorization_code && this.state.title){
            let {user_id, title, authorization_code} = this.state
            let admin = {
                user_id,
                title,
                authorization_code
            }
            this.props.createAdmin(admin)
        }else{
            alert("Must include title and authorization code to register.")
        }

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