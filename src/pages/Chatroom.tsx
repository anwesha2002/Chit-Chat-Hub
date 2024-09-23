import {ChatBox} from "../component/ChatBox.tsx";
import {SendMessage} from "../component/SendMessage.tsx";
import {UseRoom} from "../context/RoomsProvider.tsx";
import "../Style/chatroom.css"

export function Chatroom(){

    const { chatRoom } = UseRoom()


    return(
        <>
            {/*<div className="w-full drawer-content float-right h-screen">*/}
            {/*    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>*/}
            {/*    {chatRoom &&*/}
            {/*        <div className="navbar  bg-gray-500 flex justify-start items-center mt-12">*/}
            {/*            <div className="text-xl flex justify-start items-center text-gray-300">{chatRoom}</div>*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*    <div className="mb-3 mr-3" style={{ height:"60vh", overflowY: "scroll", scrollbarWidth:"none"}}>*/}
            {/*        <ChatBox />*/}
            {/*    </div>*/}
            {/*    <div >*/}
            {/*        <SendMessage />*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="lg:w-3/5 md:w-2/3 float-right h-screen chatroom flex-nowrap overflow-y-hidden">
                {chatRoom &&
                    <div className="navbar room_name bg-gray-500 flex justify-start items-center mt-12">
                        <div className="text-xl flex justify-start items-center text-gray-300">{chatRoom}</div>
                    </div>
                }
                <div className="mb-3 mr-3 chatbox" style={{ height:"72vh", overflowY: "scroll", scrollbarWidth:"none"}}>
                    <ChatBox />
                </div>
                <SendMessage />
            </div>
        </>
    )
}