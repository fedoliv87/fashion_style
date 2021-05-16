import React from 'react'
import Webcam from 'react-webcam'

function UploadFromCamera(props){

    const videoConstraints = {
        width: 360,
        height: 440 ,
        facingMode: "environment"
    }

    if(!props.visible)
        return null

    return(
        <div>
            <Webcam
                audio={false}
                videoConstraints= {videoConstraints}
            />
            <button>Capture photo</button>
        </div>
    )
}

export default UploadFromCamera