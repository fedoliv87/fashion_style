import React from "react"

import testImages from "../../testImages";

function Wardrobe(){

    const images = testImages.map(image => <img src={image.url} alt={'image '+image.id}/>)

    return(
        <div>
            <div>My Wardrobe</div>

            <hr/>

            {images}
        </div>
    )
}

export default Wardrobe