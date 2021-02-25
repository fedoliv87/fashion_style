import React, {Component} from "react"
import {Alert} from "react-bootstrap";

class ErrorAlert extends Component {

    render(){
        if(this.props.error.visible){
            const name = this.props.error.name !== '' ? (<span>{this.props.error.name}</span>) : (<span>Generic Error</span>)
            const message = this.props.error.message !== '' ? (<p>{this.props.error.message}</p>) : (<div/>)

            return (
                <Alert variant="danger">
                    <Alert.Heading>
                        {name}
                    </Alert.Heading>
                    {message}
                </Alert>
            )
        }
        return <div />
    }
}

export default ErrorAlert