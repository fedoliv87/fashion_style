import {Component} from "react"
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Auth} from 'aws-amplify'

import LoaderButton from "../../components/LoaderButton";
import ErrorAlert from "../../components/ErrorAlert";

import './Login.css'

class Login extends Component{

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            error: {
                visible: false,
                name: '',
                message: ''
            }
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true })

        await Auth.signIn(this.state.email, this.state.password)
            .then( res => {
                console.log('login success!')
                console.log(res)

                this.props.authentication.userHasAuthenticated(true)
                this.props.history.push('/wardrobe')
            })
            .catch( err => {
                console.log('login failure')
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
            <div className="Login">

                <span>Login</span>
                <hr/>

                <ErrorAlert show={this.state.error.visible} error={this.state.error} />

                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
                    </FormGroup>

                    <LoaderButton
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />
                </form>
            </div>
        )
    }
}

export default Login