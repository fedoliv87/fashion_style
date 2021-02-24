import {Route, Switch, useHistory} from 'react-router-dom'

import Wardrobe from "../containers/wardrobe/Wardrobe";
import UploadGarment from "../containers/upload/UploadGarment";
import Login from "../containers/login/Login";
import Signup from "../containers/signup/Signup";

function Routes(props){
    console.log(props)

    let history = useHistory()

    return(
        <Switch>
            <Route exact path="/wardrobe">
                <Wardrobe />
            </Route>
            <Route path="/upload">
                <UploadGarment />
            </Route>
            <Route path="/login" >
                <Login authentication={props.authentication} history={history}/>
            </Route>
            <Route path="/signup">
                <Signup authentication={props.authentication} history={history}/>
            </Route>
        </Switch>
    )
}

export default Routes