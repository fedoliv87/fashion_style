import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Auth} from "aws-amplify";
import config from "../config.json";
import Axios from "axios";

class WardarobeCardEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            info : {}
        }

        this.handleUpdate = this.handleUpdate.bind(this)
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

    handleUpdate(event){


        Auth.currentSession()
            .then( res => {
                let jwt = res.getIdToken().getJwtToken()
                console.log(config.apiBaseUrl+config.wardrobe.update)

                //INFO
                Axios.put(
                    config.apiBaseUrl+config.wardrobe.update,
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

                <Form onSubmit={this.handleUpdate}>
                    <Modal.Body>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Colors</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue = {this.state.info.hasOwnProperty('colors') ? this.state.info.colors : null}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formCategory">
                            <Form.Label column sm="2">Category</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="category"
                                    required
                                    defaultValue = {this.state.info.hasOwnProperty('category') ? this.state.info.category : null}
                                    placeholder="Category"
                                />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Group>
                            <Button variant="primary" type="submit">Update</Button>
                        </Form.Group>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>)
    }

}
export default WardarobeCardEdit