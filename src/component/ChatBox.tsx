import {Message} from "./Message.tsx";
import { useEffect, useRef} from "react";
import {UseRoom} from "../context/RoomsProvider.tsx";



export function ChatBox(){
    const { message, setMessage } = UseRoom()
    const messageRef  = useRef<HTMLDivElement>(null)
    const user  =  localStorage.getItem("currentuser")
    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({behavior : "smooth"})
    }


    useEffect ( () => {
        setMessage([])
    } , [user] );

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    return(
        <>
            <div >
                {message.map(message=>(
                    <Message  key={message.id} message={message}/>
                ))}
                <div ref={messageRef}></div>
            </div>
        </>
    )
}