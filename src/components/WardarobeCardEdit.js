import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import {Auth} from "aws-amplify";
import config from "../config.json";
import Axios from "axios";

class WardarobeCardEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            info : null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.name === null || prevProps.name === this.props.name){
            return
        }

        Auth.currentSession()
            .then( res => {
                let jwt = res.getIdToken().getJwtToken()
                console.log(config.apiBaseUrl+config.wardrobe.info)

                //INFO
                Axios.get(
                    config.apiBaseUrl+config.wardrobe.info,
                    {
                        headers: {Authorization: jwt},
                        params: {imgId: this.props.name}
                    }
                )
                    .then( (res) => {
                            console.log(res)
                            this.setState({info: res.data})
                        }
                    )
                    .catch( (err) => {
                            console.log(err)
                        }
                    )
            })
            .catch( err => {
                console.log(err)
            })
    }

    render() {
        return (<div>
            <Modal
                {...this.props}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"> INFORMATION </Modal.Title>
                </Modal.Header>

            </Modal>
        </div>)
    }

}
export default WardarobeCardEdit