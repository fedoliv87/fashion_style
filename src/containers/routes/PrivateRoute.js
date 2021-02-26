import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'

function PrivateRoute({component , ...rest}){

    console.log(rest)

    if(rest.authentication.isAuthenticated){
        return (<Route component={component} {...rest} />)
    }

    console.log("not logged-in")

    return (
        <Route {...rest}>
            <Redirect to={{pathname:"/login"}} />
        </Route>
    )


    /*return(
        <Route
            {...rest}
            render={ (props) => {
                console.log(props)

                if(authentication.isAuthenticated){
                        return(<Component {...props} />)
                    }
                    else{
                        return(<Redirect to={{pathname:"/login"}} />)
                    }
                }
            }
        />
    )*/
}

export default PrivateRoute
/*
props => authentication.isAuthenticated ?
                (<Component {...props} />)
                :
                (
                   <Redirect to={{
                       pathname:""
                   }}/>
                )


 */