import {ChatBox} from "../component/ChatBox.tsx";
import {SendMessage} from "../component/SendMessage.tsx";

export function Chatroom(){
    return(
        <>
            <div className="m-5">
                <ChatBox/>
            </div>
            <SendMessage/>
        </>
    )
}