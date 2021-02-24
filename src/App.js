import { BrowserRouter as Router, Link} from "react-router-dom"
import {Navbar, Nav} from 'react-bootstrap';
import {Component} from 'react'
import { Auth } from 'aws-amplify';

import Routes from "./components/Routes";

import './App.css';

class App extends Component{

    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        }
    }

    async componentDidMount() {
        try {
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true)
            }
        } catch (e) {
            if (e !== 'No current user') {
                console.log(e)
            }
        }

        this.setState({ isAuthenticating: false })
    }

    userHasAuthenticated = (authenticated) => {
        this.setState({ isAuthenticated: authenticated })
    }

    handleLogout = async event => {
        console.log('logout')
        await Auth.signOut()
            .then( res => {
                console.log('success signOut')
                console.log(res)
            })
            .catch( err => {
                console.log('failure signOut')
                console.log(err)
            })
        this.userHasAuthenticated(false)
        this.props.history.push('/login')
    }

    render() {

        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        }

        return (
            <Router>
                <div className='App container'>

                    <h3 className="m-3 d-flex justify-content-center">Welcome</h3>

                    <Navbar bg="dark" expand="lg">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                                {this.state.isAuthenticated ? (
                                    <>
                                        <Nav className="mr-auto">
                                            <Link className="d-inline p-2 bg-dark text-white" to="/home">Home</Link>
                                            <Link className="d-inline p-2 bg-dark text-white" to="/wardrobe">Wardrobe</Link>
                                            <Link className="d-inline p-2 bg-dark text-white" to="/upload">Upload</Link>
                                        </Nav>
                                        <Nav className="justify-content-end">
                                            <Nav.Item className="d-inline p-2 bg-dark text-white" onClick={this.handleLogout}>Logout</Nav.Item>
                                        </Nav>
                                    </>
                                ) : (
                                    <>
                                        <Nav className="mr-auto">
                                            <Link className="d-inline p-2 bg-dark text-white" to="/home">Home</Link>
                                        </Nav>
                                        <Nav className="justify-content-end">
                                            <Link className="p-2 bg-dark text-white" to="/signup">Signup</Link>
                                            <Link className="p-2 bg-dark text-white" to="/login">Login</Link>
                                        </Nav>
                                    </>
                                )}
                        </Navbar.Collapse>
                    </Navbar>

                    <hr />

                    <Routes authentication={childProps}/>

                </div>
            </Router>
        )
    }
}

export default App
