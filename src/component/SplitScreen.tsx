import {ReactNode} from "react";
import '../Style/SplitScreen.css'

type SplitScreenProps ={
    children : ReactNode
}

export function SplitScreen({children} : SplitScreenProps){
    return(
        <>
            <div className="split-screen">
                <div className="left-pane">{children}</div>
                <div className="right-pane">{children}</div>
            </div>
        </>
    )
}