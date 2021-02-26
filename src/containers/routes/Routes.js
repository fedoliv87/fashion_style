import {Route, Switch, useHistory} from 'react-router-dom'

import "./PrivateRoute"
import Wardrobe from "../wardrobe/Wardrobe";
import UploadGarment from "../upload/UploadGarment";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import PrivateRoute from "./PrivateRoute";

function Routes(props){
    console.log(props)

    let history = useHistory()

    return(
        <Switch>
            <PrivateRoute exact path="/wardrobe" authentication={props.authentication} history={history} component={Wardrobe} />
            <PrivateRoute exact path="/upload" authentication={props.authentication} history={history} component={UploadGarment} />

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