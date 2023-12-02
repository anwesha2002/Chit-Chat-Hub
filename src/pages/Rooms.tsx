import {Room} from "../component/Room.tsx";
import { useState} from "react";
import {UseRoom} from "../context/RoomsProvider.tsx";
import {JoinRoomModal} from "../component/JoinRoomModal.tsx";



export function Rooms(){
    const { room } = UseRoom()
    const [clickedJoin, setClickedJoin] = useState(false)


    console.log(room)
    return(
        <>
            <div className="overflow-auto">
                <div onClick={()=>setClickedJoin(true)} title="Join Room with id"  className="flex justify-center m-5 fixed btn rounded-full btn-active right-0 bottom-0 overflow-hidden text-4xl">+</div>
                <div className="flex justify-center flex-wrap gap-1 mx-16 my-16">
                    {room.map(room=>(
                        <div key={room.id}><Room {...room}  createdBy="" id="" room_name=""/></div>
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