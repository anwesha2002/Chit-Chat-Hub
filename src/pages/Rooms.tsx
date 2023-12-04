import {Room} from "../component/Room.tsx";
import { useState} from "react";
import {UseRoom} from "../context/RoomsProvider.tsx";
import {JoinRoomModal} from "../component/JoinRoomModal.tsx";
import {IoAdd} from "react-icons/io5";



export function Rooms(){
    const { room } = UseRoom()
    const [clickedJoin, setClickedJoin] = useState(false)
    const { roomId } = UseRoom()

    return(
        <>
            <div className="scroll-auto  float-left w-1/3 h-screen bg-base-300">
                <div onClick={()=>setClickedJoin(true)} title="Join Room with id"  className="flex justify-center items-center m-4 fixed btn rounded-full btn-primary bottom-0 overflow-hidden text-2xl"><IoAdd/></div>
                <div className="flex flex-col items-center justify-center gap-1  my-16">
                    {room.map(room=>(
                         <div className={`bg-base-200  hover:bg-gray-800 w-full ${room.id === roomId && "bg-gray-800"}`}><Room key={room.id} {...room} /></div>
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