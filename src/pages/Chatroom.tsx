import {ChatBox} from "../component/ChatBox.tsx";
import {SendMessage} from "../component/SendMessage.tsx";
import {UseRoom} from "../context/RoomsProvider.tsx";

export function Chatroom(){

    const { chatRoom } = UseRoom()

    return(
        <>
            <div className="w-2/3 float-right h-screen">
                {chatRoom &&
                    <div className="navbar  bg-gray-500 flex justify-start items-center mt-12">
                        <div className="text-xl flex justify-start items-center text-bg-gray-100">{chatRoom}</div>
                    </div>
                }
                <div className="m-5">
                    <ChatBox />
                </div>
                <SendMessage />
            </div>
        </>
    )
}