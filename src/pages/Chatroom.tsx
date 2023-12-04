import {ChatBox} from "../component/ChatBox.tsx";
import {SendMessage} from "../component/SendMessage.tsx";

export function Chatroom(){
    return(
        <>
            <div className="w-2/3 p-5 float-right ">
                <div className="m-5">
                    <ChatBox/>
                </div>
                <SendMessage />
            </div>
        </>
    )
}