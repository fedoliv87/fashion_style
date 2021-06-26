import {Component}  from "react"
import {CardDeck} from 'react-bootstrap'
import Axios from 'axios'
import {Auth} from 'aws-amplify'
import WardarobeCard from '../../components/WardarobeCard'
import WardarobeCardEdit from "../../components/WardarobeCardEdit";
import WardarobeCardMatching from "../../components/WardarobeCardMatching";
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
            images: {},
            WardrobeLength : null,
            editModal: {show: false, id: null},
            matchingModal: {show: false, id: null }
        }

        this.getList = this.getList.bind(this)
        this.getNameOfImgUrl = this.getNameOfImgUrl.bind(this)
    }

    componentDidMount() {
        this.getList()
    }

    getList(){
        Auth.currentSession()
            .then( res => {
                //console.log(`myAccessToken: ${JSON.stringify(res.getIdToken())}`)
                let jwt = res.getIdToken().getJwtToken()
                console.log('myJwt: ' + jwt)

                console.log('retrieve images')
                Axios.get(
                    config.apiBaseUrl+config.wardrobe.getList,
                    {
                        headers: {Authorization: jwt}
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

                            var arrayOfKeysImages = []
                            Object.keys(data).map(key => arrayOfKeysImages.push(data[key]))

                            console.log(arrayOfKeysImages)

                            this.setState({
                                images: data,
                                allClothes: arrayOfKeysImages,
                                WardrobeLength: arrayOfKeysImages.length
                            })
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
    }

    onPageChanged = data => {
        const { allClothes } = this.state
        const { currentPage, totalPages, pageLimit } = data
        const offset = (currentPage - 1) * pageLimit
        const currentClothes = allClothes.slice(offset, offset + pageLimit)

        this.setState({ currentPage, currentClothes, totalPages })
        return true
    }

    getNameOfImgUrl(imgUrl) {
        let name = null
        Object.keys(this.state.images).map( (key, index) => {
            if(this.state.images[key] === imgUrl){
                name = key
            }
            return true
        })
        console.log(name)
        return name
        //return this.state.images.findIndex(element => element === imgUrl)
    }

    render() {
        const { currentClothes } = this.state
        const totalClothes = this.state.WardrobeLength ?? 0;

        if (totalClothes === 0) return null

        let editModalClose = () => this.setState({editModal: {show: false, id:null}})
        let editModalOpen = (id) => this.setState({editModal: {show:true, id:id}})

        let matchingModalClose = () => this.setState({matchingModal: {show: false, id:null}})
        let matchingModalOpen = (id) => this.setState({matchingModal: {show:true, id:id}})

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
                        { currentClothes.map((imgUrl, index) => <WardarobeCard
                                                                    key={index}
                                                                    url={imgUrl}
                                                                    name={this.getNameOfImgUrl(imgUrl)}
                                                                    showCardInfo={editModalOpen}
                                                                    showCardMatching={matchingModalOpen}
                                                                    refreshList={this.getList}
                                                                />
                        )}
                    </CardDeck>
                </div>

                <WardarobeCardEdit show={this.state.editModal.show} name={this.state.editModal.id} onHide={editModalClose}/>
                <WardarobeCardMatching show={this.state.matchingModal.show} name={this.state.matchingModal.id} onHide={matchingModalClose}/>
            </div>
        );
    }
}

export default Wardrobe