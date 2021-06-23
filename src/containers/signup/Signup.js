import {Component} from "react";
import {FormGroup, FormControl, FormLabel, Form} from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import LoaderButton from '../../components/LoaderButton';
import ErrorAlert from "../../components/ErrorAlert";

import './Signup.css';

class Signup extends Component{

    constructor(props) {
        super(props)

        console.log(props)

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            error: {
                visible: false,
                name: '',
                message: ''
            }
        }
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        )
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault()

        this.setState({ isLoading: true })

        await Auth.signUp({
            username: this.state.email,
            password: this.state.password
        })
            .then( res => {
                console.log('successfully signed up!')
                console.log(res)

                this.props.authentication.userHasAuthenticated(true)
                this.props.history.push('/wardrobe')
            })
            .catch( err => {
                console.log('signUp failure')
                console.log(err)
                this.setState({
                    error:{
                        visible: true,
                        name: err.name,
                        message: err.message
                    }
                })
                console.log(this.state)
            })
        this.setState({ isLoading: false })
    }

    render(){
        return(
            <div className='Signup'>

                <hr/>

                <ErrorAlert show={this.state.error.visible} error={this.state.error} />

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" >
                        <FormLabel>Email</FormLabel>
                        <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FormLabel>Password</FormLabel>
                        <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" >
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl value={this.state.confirmPassword} onChange={this.handleChange} type="password" />
                    </FormGroup>

                    <LoaderButton
                        block
                        text="Signup"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        loadingText="Signing up…"
                    />
                </Form>
            </div>
        )
    }
}

export default Signup