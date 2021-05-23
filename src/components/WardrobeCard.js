import React from 'react'
import {Button, Card} from "react-bootstrap";
import Axios from 'axios'
import config from "../config.json";
import {Auth} from "aws-amplify";

function WardrobeCard(props){

    const handleClickDelete = event => {
        console.log(event)
        console.log(props.url)
        Auth.currentSession()
            .then( res => {
                //console.log(`myAccessToken: ${JSON.stringify(res.getIdToken())}`)
                let jwt = res.getIdToken().getJwtToken()
                console.log('myJwt: ' + jwt)
                console.log(config.apiBaseUrl+config.wardrobe.upload)

                //UPLAOD
                Axios.delete(
                    config.apiBaseUrl+config.wardrobe.update,
                    { headers: {Authorization: jwt}}
                )
                .then( (res) => {
                        console.log(res)
                        console.log(res.data)
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

    return(
        <Card className='shadow p-3 mb-5 bg-white rounded'>
            <Card.Img variant="top" src={props.url}/>
            <Card.Body>
                <Button variant="danger" onClick={handleClickDelete}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default WardrobeCard