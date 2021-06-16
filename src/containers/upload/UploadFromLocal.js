import React, {Component} from "react"
import Axios from 'axios'
import {Auth} from 'aws-amplify'
import config from '../../config.json'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Figure} from "react-bootstrap"
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";

class UploadFromLocal extends Component{

    constructor(props) {
        super(props)

        this.state = {
            urlFile: null,
            file: null,
            uploaded : false,
            error: {
                visible: false,
                name: '',
                message: ''
            }
        }

        this.preview = this.preview.bind(this)
        this.upload = this.upload.bind(this)
    }

    async preview(e) {

        const toBase64 = file => new Promise((resolve, reject) => {
            let reader = new FileReader()
            //reader.readAsDataURL(file)
            // reader.onload = () => resolve(reader.result)
            // reader.onerror = error => reject(error)
            reader.onloadend = function() {
                console.log('RESULT', reader.result)
                let base64Cleaned = reader.result.replace("data:image/jpeg;base64,","")
                resolve(base64Cleaned)
            }
            reader.readAsDataURL(file);
        })

        this.setState({
            urlFile: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
            base64 : await toBase64(e.target.files[0]).catch((error) => {console.log(error)})
        })

    }

    async upload(e) {

        Auth.currentSession()
            .then( res => {
                //console.log(`myAccessToken: ${JSON.stringify(res.getIdToken())}`)
                let jwt = res.getIdToken().getJwtToken()
                //console.log('myJwt: ' + jwt)
                //console.log(config.apiBaseUrl+config.wardrobe.upload)
                console.log("FILE: " + this.state.base64)

                //UPLAOD
                Axios.post(
                    config.apiBaseUrl+config.wardrobe.upload,
                    {
                        format : '.jpeg',
                        file : this.state.base64
                    },
                    { headers: {Authorization: jwt}}
                )
                    .then( (res) => {
                            console.log(res)
                            console.log(res.data)
                            this.setState({uploaded: true})
                        }
                    )
                    .catch( (err) => {
                            console.log(err)
                            this.setState({
                                error:{
                                    visible: true,
                                    name: err.name,
                                    message: err.message
                                }
                            })
                        }
                    )

            })
            .catch( err => {
                console.log(err)
                this.setState({
                    error:{
                        visible: true,
                        name: err.name,
                        message: err.message
                    }
                })
            })
    }

    render(){

        let preview
        if(this.state.urlFile !== null){
            preview = (
                <Figure>
                    <Figure.Image
                        alt="..."
                        thumbnail
                        src={this.state.urlFile}
                    />
                </Figure>
            )
        }

        if(!this.props.visible)
            return null

        return(
            <div>
                <div className='row'>
                    <div className="col-8">
                        <label className="btn btn-default p-0">
                            {/*<input type="file" accept="image/*" onChange={this.selectFile} />*/}
                            <input type="file" onChange={this.preview} accept='.jpg'/>
                        </label>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className="col-4">
                        <button
                            className="btn btn-success btn-sm"
                            disabled={this.state.file === null}
                            onClick={this.upload}
                        >
                            Upload
                        </button>
                    </div>
                </div>
                <br/>

                <SuccessAlert success={this.state.uploaded}/>
                <ErrorAlert error={this.state.error} />

                <br/><br/>

                {preview}

            </div>
        )
    }
}

export default UploadFromLocal
