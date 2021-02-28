import React, {Component} from "react"
import Axios from 'axios'
import config from '../../config.json'

import 'bootstrap/dist/css/bootstrap.min.css';

class Uploading extends Component{

    constructor() {
        super();

        this.state = {
            urlFile: null,
            file: null
        }

        this.preview = this.preview.bind(this)
        this.upload = this.upload.bind(this)
    }

    async preview(e) {

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        this.setState({
            urlFile: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
            base64 : await toBase64(e.target.files[0]).catch((error) => {console.log(error)})
        })

    }

    async upload(e) {

        Axios.post(
            config.apiBaseUrl+config.wardrobe.upload,
            {
                'format' : '.jpg',
                'file' : this.state.base64
            }
            )
            .then( (res) => {
                    console.log(res)
                    console.log(res.data)
                }
            )
            .catch( (err) => {
                    console.log(err)
                    //console.log(err.response.status)
                }
            )
    }

    render(){

        let preview
        if(this.state.urlFile !== null){
            preview = ( <img className="preview card-img" src={this.state.urlFile} alt='preview'/> )
        }

        return(
            <div>
                <h2>Upload your own Images</h2>
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
                <br/><br/><br/>

                {preview}

            </div>
        )
    }
}

export default Uploading
