import React from 'react'
import {Button, Card} from "react-bootstrap";

function WardrobeCard(props){

    return(
        <Card className='shadow p-3 mb-5 bg-white rounded'>
            <Card.Img variant="top" src={props.url}/>
            <Card.Body>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default WardrobeCard