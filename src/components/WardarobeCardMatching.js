import React, { useState, useEffect } from "react"
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import {Auth} from "aws-amplify";
import Axios from "axios";
import config from "../config.json";
import {Container} from "@material-ui/core";

function WardarobeCardMatching(props){

    useEffect(() => {
        console.log('use effect: ' + props)
        if(props.show === false){
            return
        }
        console.log('recupera abbinamenti ')
        Auth.currentSession()
            .then( res => {
                let jwt = res.getIdToken().getJwtToken()
                console.log('myJwt: ' + jwt)
                Axios.get(
                    config.apiBaseUrl+config.wardrobe.getList,
                    {
                        headers: {Authorization: jwt},
                        params: {imgId: props.name}
                    }
                )
                    .then( (res) => {
                            console.log(res)
                            if (res.status !== 200) {
                                console.log("not 200")
                                throw Error('ERROR!')
                                //TODO
                            }
                            let data = res.data
                            //let data = JSON.stringify(res.data)
                            //this.setState({images: data})

                            //var arrayOfKeysImages = []
                            //Object.keys(data).map(key => arrayOfKeysImages.push(data[key]))

                            console.log(data)

                        }
                    )
                    .catch( (err) => {
                            console.log(err)
                            //console.log(err.response.status)
                        }
                    )
            })
            .catch( err => {
                console.log(err)
            })
    })

    return(
        <div>
            <Modal
                {...props}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"> MATCHING </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>

                    <Container>
                        <Row className="justify-content-md-center">
                           <Col xs={12} sm={4} md={4}>
                               <Card className='shadow p-3 mb-5 bg-white rounded'>
                                   <Card.Img variant="top" src="https://s3.eu-west-3.amazonaws.com/ffs-user-image/cognito/ffs/02c93562-79ce-4ce0-8123-3fff68828101/1a50571c4dff4350b66ea2b042ff3d2f.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA2OXW2TJQVRR3ZL7A%2F20210626%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20210626T134603Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCWV1LXdlc3QtMyJHMEUCIQDhyX4Rq8pYRrt%2B7ccvfCpvwWyBLESStsY8Zjk4GeKlNwIgPA5av8ktcGlqiGMaH2SJ4cG%2Bi%2FVYtA29Aw%2BgylVEz4gqngIIRxACGgw3MTg4NTA5MjMxMDUiDJJ6PLssmFHnfTw2KCr7AfxXMW3nonUkf8XgsHoiY7EYUvA2vgXV9TyWjP12Bngwwai8r3vUX%2BYvwaV95ezAv8JBWbJo4OTlAsoInO3fZGw6vgX91b5AuA4Y4tu1FZIjpMP82nfEJLOtBo%2FSFPuNiE496LOb4CX1e3kX25AQF1Ldu48eZF5TISj%2FLILxzVQCHYDaNbJD9Ie4kSn7jiJfQgFLZ7zw5ChBH6B9Df%2BMG5yMVYNaM8giRAqy%2Bkxqe73kDiAMqlE1QnM1r8BkuR4ykKHjritiEfKYH%2F9iq%2BKQE42PIbLLigu3jsJRJIP1md9Azy4YMol6E3%2BTI3fgu7FEClDqjPlJ8D3LdkcmMLvd3IYGOpoBur31y1HM5lESzg5BVp1bsb3GNEoBlAccKiEi0yoWwn7KqpYGs5AYlug353BYBVwO8YiYEilNxrEp3VBpvuQ0h8ul6M5xeCbzD4B9XEFlU3hJ%2B%2F7eZ6Sx6nyQvBsHGDPkfhNcudgYTxCtz4cDTKOjlCt1zDabv0KptOH37Q4Jz3raHkV6xNG4qZJr228fm2vxycaAgM0Oz8Bgvw%3D%3D&X-Amz-Signature=9c7209c251d2940ea6189d29e4df7a522a6e612c9905e675d6299c10d8069c67"/>
                               </Card>
                           </Col>
                        </Row>
                    </Container>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default WardarobeCardMatching