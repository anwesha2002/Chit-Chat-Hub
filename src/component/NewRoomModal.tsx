import {FormEvent} from "react";
import {UseRoom} from "../context/RoomsProvider.tsx";

interface NewRoomModalProps {
    onDisMiss : () => void

}
export function NewRoomModal({onDisMiss}:NewRoomModalProps){
    const { createRoom , roomName, setRoomName}=  UseRoom()


    function HandleSubmit(e : FormEvent<HTMLFormElement>){
        e.preventDefault()
        createRoom(roomName);
        setRoomName("")
        onDisMiss()
    }

    return(
        <>
        <dialog open className="modal modal-middle  ">
            <div className="modal-box">
            <div className="modal-box">
                <div className="modal-action ">
                    <form method="dialog">
                        <button onClick={onDisMiss} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">x</button>
                    </form>
                </div>
                <span className="font-bold text-md">New Room</span>
            </div>
            <div className="modal-box my-5">
                <form onSubmit={HandleSubmit}>
                    <div className="form-control">
                        Name
                    </div>
                    <input type="text" onChange={(e)=>setRoomName(e.target.value)} value={roomName}  className="input text-black w-full bg-gray-300 my-5" />
                    <button value="submit" type="submit" className="btn w-full">Save</button>
                </form>
            </div>
            </div>
        </dialog>
        </>
    )
}