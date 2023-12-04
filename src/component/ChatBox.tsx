import {Message} from "./Message.tsx";
import { useEffect, useRef} from "react";
import {UseRoom} from "../context/RoomsProvider.tsx";



export function ChatBox(){
    const { message } = UseRoom()
    const messageRef  = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({behavior : "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    return(
        <>
            <div className="mb-28 ">
                {message.map(message=>(
                    <Message  key={message.id} message={message}/>
                ))}
                <div ref={messageRef}></div>
            </div>
        </>
    )
}