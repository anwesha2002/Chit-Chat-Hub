import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {UseChat} from "../context/AuthContext.tsx";

type privateRouteprops = {
    children : ReactNode
}

export function PrivateRoute({children} : privateRouteprops){
    const {currentUser} = UseChat()
    console.log("current" , currentUser)
    return currentUser ?  <>{children}</> : <Navigate to="/"/>
}