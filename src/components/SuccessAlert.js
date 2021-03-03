import React, {Component} from "react"
import {Alert} from "react-bootstrap";

class SuccessAlert extends Component {

    render(){
        if(this.props.success){

            return (
                <Alert variant="success">
                    <Alert.Heading> OK </Alert.Heading>
                </Alert>
            )
        }
        return <div />
    }
}

export default SuccessAlert