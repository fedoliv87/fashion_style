import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {CirclePicker} from "react-color";
import {Auth} from "aws-amplify";
import config from "../config.json";
import Axios from "axios";

class WardarobeCardEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            info : {
                colors : [],
                category: null
            }
        }

        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.name === null || prevProps.name === this.props.name){
            return
        }

        this.setState({info: {colors: [], category: null}})

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

                        let arrayColors = [];
                        if(res.data.hasOwnProperty('colors')){
                            let txtColors = res.data.colors

                            // Extract HEX of colors
                            let regex = /\(\d*\.\d*\)/gm
                            let txtColorsCleaned = txtColors.replace(regex,'')

                            arrayColors = txtColorsCleaned.split(',')
                        }

                        console.log(arrayColors)
                        this.setState({info: {
                                colors: arrayColors,
                                category: res.data.category
                            }
                        })
                    })
                    .catch( (err) => {
                        console.log(err)
                    })
            })
            .catch( err => {
                console.log(err)
            })
    }

    handleUpdate(event){
        event.preventDefault();

        if(event.target.formCategory.value === this.state.info.category){
            return
        }

        Auth.currentSession()
            .then( res => {
                let jwt = res.getIdToken().getJwtToken()
                console.log(config.apiBaseUrl+config.wardrobe.update)

                //UPDATE CATEGORY
                Axios.put(
                    config.apiBaseUrl+config.wardrobe.update,
                    {"category": event.target.formCategory.value},
                    {
                        headers: {Authorization: jwt},
                        params: {imgId: this.props.name}
                    }
                )
                    .then( (res) => {
                            console.log(res)
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
                                <CirclePicker colors={this.state.info.colors}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formCategory">
                            <Form.Label column sm="2">Category</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="category"
                                    required
                                    placeholder = {this.state.info.category}
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