import {Room} from "../component/Room.tsx";
import { useState} from "react";
import {UseRoom} from "../context/RoomsProvider.tsx";
import {JoinRoomModal} from "../component/JoinRoomModal.tsx";



export function Rooms(){
    const { room } = UseRoom()
    const [clickedJoin, setClickedJoin] = useState(false)

    return(
        <>
            <div className=" overflow-auto float-left w-1/3 h-screen bg-base-300">
                <div onClick={()=>setClickedJoin(true)} title="Join Room with id"  className="flex justify-center items-center m-5 fixed btn rounded-full btn-neutral bottom-0 overflow-hidden text-4xl">+</div>
                <div className="flex flex-col items-center justify-center gap-1 mx-16 my-16">
                    {room.map(room=>(
                        <Room key={room.id} {...room} />
                    ))}
                </div>
            </div>
                {clickedJoin &&
                    <JoinRoomModal
                        onDisMiss={()=>setClickedJoin(false)}
                        //id={id}
                    />
                }
        </>
    )
}