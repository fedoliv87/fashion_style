import React from 'react';
import { Button } from 'react-bootstrap';

function LoaderButton({ isLoading, text, loadingText, className = '', disabled = false, ...props }){
    console.log(props)

    return(
        <Button variant='secondary'
                className={`LoaderButton ${className}`}
                disabled={disabled || isLoading}
                {...props}
        >
            {!isLoading ? text : loadingText}
        </Button>
    )
}

export default LoaderButton