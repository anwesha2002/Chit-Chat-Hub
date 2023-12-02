import {Message} from "./Message.tsx";
import { useEffect, useRef} from "react";
import {UseChatRoom} from "../context/ChatRoomContext.tsx";

export function ChatBox(){
    const { message } = UseChatRoom()
    const messageRef  = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({behavior : "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    return(
        <>
            <div className="mb-28 mt-16">
                {message.map(message=>(
                    <Message key={message.id} message={message}/>
                ))}
                <div ref={messageRef}></div>
            </div>
        </>
    )
}