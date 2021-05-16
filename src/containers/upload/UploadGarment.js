import React, {Component} from "react"
import UploadFromLocal from "./UploadFromLocal"
import {Button} from "react-bootstrap"
import UploadFromCamera from "./UploadFromCamera"
import {isMobile} from 'react-device-detect'

class UploadGarment extends Component{

    constructor() {
        super()

        this.state = {
            uploadFromLocal: false,
            uploadFromCamera: false
        }

        this.uploadFromCameraHandler = this.uploadFromCameraHandler.bind(this)
        this.uploadFromLocalHandler = this.uploadFromLocalHandler.bind(this)
    }

    uploadFromCameraHandler(){
        this.setState({
            uploadFromLocal: false,
            uploadFromCamera: true
        })
    }

    uploadFromLocalHandler(){
        this.setState({
            uploadFromLocal: true,
            uploadFromCamera: false
        })
    }

    render(){
        return(
            <div>
                <h2>Upload your images from</h2>
                <hr />

                <Button variant="outline-secondary" onClick={this.uploadFromLocalHandler}>Local</Button>
                {isMobile ? <Button variant="outline-secondary" onClick={this.uploadFromCameraHandler}>Camera</Button> : null}

                <UploadFromLocal visible={this.state.uploadFromLocal}/>
                <UploadFromCamera visible={this.state.uploadFromCamera}/>


            </div>
        )
    }
}

export default UploadGarment