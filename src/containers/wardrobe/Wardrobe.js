import {Component}  from "react"
import {Button, Card, CardDeck} from 'react-bootstrap'
import Axios from 'axios'
import {Auth} from 'aws-amplify'

import './Wardrobe.css'
import config from "../../config.json";

class Wardrobe extends Component{

    constructor(props) {
        super(props)

        this.state = {
            myWardrobe: {}
        }

        this.getList = this.getList.bind(this)
    }

    componentDidMount() {
        Auth.currentSession()
            .then( res => {
                //console.log(`myAccessToken: ${JSON.stringify(res.getIdToken())}`)
                let jwt = res.getIdToken().getJwtToken()
                console.log('myJwt: ' + jwt)

                //GETLIST
                this.getList(jwt)

            })
            .catch( err => {
                console.log(err)
            })
    }

    getList(jwtToken){
        console.log('getList')
        Axios.get(
            config.apiBaseUrl+config.wardrobe.getList,
            {
                headers: {Authorization: jwtToken}
            }
        )
        .then( (res) => {
                console.log(res)
                if(res.status !== 200){
                    console.log("not 200")
                    throw Error('ERROR!')
                    //TODO
                }
                let data = JSON.stringify(res.data)
                this.setState({myWardrobe: data})
            }
        )
        .catch( (err) => {
                console.log(err)
                //console.log(err.response.status)
            }
        )
    }

    render(){
        //const images = testImages.map(image => <img src={image.url} alt={'image '+image.id}/>)

        return(
            <div>
                <div>My Wardrobe</div>
                <hr/>
                <CardDeck className="card-deck">
                    <Card className='shadow p-3 mb-5 bg-white rounded' >
                        <Card.Img variant="top" src="https://cdn4.buysellads.net/uu/1/41369/1551198561-Adobe_Stock_260x200.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card className='shadow-lg p-3 mb-5 bg-white rounded' >
                        <Card.Img variant="top" src="https://cdn4.buysellads.net/uu/1/41369/1551198561-Adobe_Stock_260x200.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card className='shadow-sm p-3 mb-5 bg-white rounded' >
                        <Card.Img variant="top" src="https://cdn4.buysellads.net/uu/1/41369/1551198561-Adobe_Stock_260x200.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card className='shadow-none p-3 mb-5 bg-white rounded' >
                        <Card.Img variant="top" src="https://cdn4.buysellads.net/uu/1/41369/1551198561-Adobe_Stock_260x200.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>

                </CardDeck>

            </div>
        )
    }
}

export default Wardrobe