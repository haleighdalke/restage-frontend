import React from 'react';
import { Button, Card, Form, Input} from "reactstrap";

export default class LoginSignUp extends React.Component {
    state = {
        name: "",
        username: "",
        password: ""
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    generateSignUpForm = () => {
        return(
            <Form className="register-form" onSubmit={(e) => {
                e.preventDefault()
                this.props.handleSignUp(this.state)
            }}>
                <label>Your Name</label>
                <Input name="name" placeholder="name" type="text" onChange={this.handleOnChange}/>
                <label>Username</label>
                <Input name="username" placeholder="username" type="text" onChange={this.handleOnChange}/>
                <label>Password</label>
                <Input name="password" placeholder="password" type="password" onChange={this.handleOnChange}/><br/>
                <Button className="btn-round" variant='secondary' type="submit">Sign Up</Button>
                <Button className="btn-round" variant='secondary' onClick={() => window.location = "/"}>Go Back</Button>
            </Form>
        )
    }

    generateLoginForm = () => {
        return(
            <Form className="register-form" onSubmit={(e) => {
                e.preventDefault()
                this.props.handleLogin(this.state)
            }}>
                <label>Username </label>
                <Input name="username" placeholder="username" type="text" onChange={this.handleOnChange}/>
                <label>Password </label>
                <Input name="password" placeholder="password" type="password" onChange={this.handleOnChange}/><br/>
                <Button className="btn-round" variant='secondary'>Login</Button>
                <Button className="btn-round" variant='secondary' onClick={() => window.location = "/"}>Go Back</Button>
            </Form>            
        )
    }

    render(){
        return(
        <div className="page-header-landing">
            <div className="login-card">
                <Card className="card-register ml-auto mr-auto">
                    <h3 className="title mx-auto">Welcome!</h3>
                    {this.props.login ? this.generateLoginForm() : this.generateSignUpForm()}
                </Card>
            </div>
        </div>
        )};
}