import {Component}  from "react"
import {CardDeck} from 'react-bootstrap'
import Axios from 'axios'
import {Auth} from 'aws-amplify'
import WardrobeCard from '../../components/WardrobeCard'
import Pagination from '../../components/Pagination'

import './Wardrobe.css'
import config from "../../config.json";
import testImages from "../../testImages";

class Wardrobe extends Component{

    constructor(props) {
        super(props)

        this.state = {
            allClothes: [],
            currentClothes: [],
            currentPage: null,
            totalPages: null,
            images: testImages,
            WardrobeLength : null
        }

        this.getList = this.getList.bind(this)
    }

    componentDidMount() {
        /*Auth.currentSession()
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
        */

        //const { data: allClothes = [] } = testImages;
        console.log(Object.keys(this.state.images).length)

        var arrayOfKeysImages = []
        Object.keys(this.state.images).map( key => arrayOfKeysImages.push(this.state.images[key]))

        console.log(arrayOfKeysImages)

        this.setState({
            allClothes : arrayOfKeysImages,
            WardrobeLength : arrayOfKeysImages.length
        })
    }

    getList(jwtToken){
        console.log('retrieve images')
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

    onPageChanged = data => {
        const { allClothes } = this.state
        const { currentPage, totalPages, pageLimit } = data
        const offset = (currentPage - 1) * pageLimit
        const currentClothes = allClothes.slice(offset, offset + pageLimit)

        this.setState({ currentPage, currentClothes, totalPages })
    }

    render() {
        const { allClothes, currentClothes, currentPage, totalPages } = this.state
        const totalClothes = this.state.WardrobeLength ?? 0;

        if (totalClothes === 0) return null

        return (
            <div className="container mb-5">
                <div className="py-1">My Wardrobe</div>
                <hr/>
                <div className="row d-flex flex-row">
                    <div className="w-100 px-4 d-flex flex-row-reverse flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination totalRecords={totalClothes} pageLimit={config.pagination.itemsPerPage} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                        </div>
                    </div>
                    <CardDeck className='card-grid'>
                        { currentClothes.map(imgUrl => <WardrobeCard url={imgUrl}/>) }
                    </CardDeck>
                </div>
            </div>
        );
    }
}

export default Wardrobe