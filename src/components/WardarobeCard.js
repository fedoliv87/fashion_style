import React, {useState} from 'react'
import {Button, Card} from "react-bootstrap";
import Axios from 'axios'
import config from "../config.json";
import {Auth} from "aws-amplify";

function WardarobeCard(props){
    const [isDeleted, setIsDeleted] = useState(false)
    //console.log(props)

    const handleClickDelete = event => {
        console.log(event)
        Auth.currentSession()
            .then( res => {
                //console.log(`myAccessToken: ${JSON.stringify(res.getIdToken())}`)
                let jwt = res.getIdToken().getJwtToken()
                console.log('myJwt: ' + jwt)
                console.log(config.apiBaseUrl+config.wardrobe.upload)

                //DELETE
                Axios.delete(
                    config.apiBaseUrl+config.wardrobe.update,
                    {
                        headers: {Authorization: jwt},
                        params: {imgId : props.name}
                    }
                )
                .then( (res) => {
                    console.log(res)
                    console.log(res.data)
                    console.log('refresh List after delete')
                    props.refreshList()
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

    const handleClickInfo = event => {
        //console.log(props)
        props.showCardInfo(props.name)
        console.log('open info')
    }

    const handleClickMatching = event => {
        //console.log(props)
        props.showCardMatching(props.name)
        console.log('open info')
    }

    const styleIsDeleted = () => {
        if(isDeleted === true){
            return "display: none"
        }
    }

    return(
        <Card className='shadow p-3 mb-5 bg-white rounded' style={{styleIsDeleted}}>
            <Card.Img variant="top" src={props.url}/>
            <Card.Body>
                <Button variant="danger" onClick={handleClickDelete}>Delete</Button>
                <br/><br/>
                <Button variant="info" onClick={handleClickInfo}>Info</Button>{' '}
                <Button variant="info" onClick={handleClickMatching}>Matching</Button>
            </Card.Body>
        </Card>
    )
}

export default WardarobeCard