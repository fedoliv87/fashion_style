import React from 'react'
import {Button, Card} from "react-bootstrap";
import Axios from 'axios'

function WardrobeCard(props){

    const handleClickDelete = event => {
        console.log(event)
        console.log(props.url)
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