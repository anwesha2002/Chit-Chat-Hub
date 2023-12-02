import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UseRoom} from "../context/RoomsProvider.tsx";

interface NewRoomModalProps{
    onDisMiss : () => void
    //id : string
}

export function JoinRoomModal({onDisMiss}:NewRoomModalProps){
    const [value, setValue] = useState("")
    const { joinGroup } = UseRoom()

    //console.log(id)
    const navigate = useNavigate();
    function HandleJoin(e : FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            if(value){
                navigate(`chat/${value}`)
                joinGroup(value)
            }
            onDisMiss()
            }
        catch (err){
            console.log(err)
        }
    }

    return(
        <>
            <dialog open className="modal modal-middle ">
                <div className="modal-box flex justify-center align-middle flex-col">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={onDisMiss} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                        </form>
                    </div>
                    <span className="font-bold text-md">Join Id</span>
                </div>
                <div className="modal-box my-5">
                    <form onSubmit={HandleJoin}>
                        <input type="text" onChange={(e)=>setValue(e.target.value)} value={value} className="input text-black w-full bg-gray-300 my-5" />
                         <button type="submit" className="btn w-full ">Add</button>
                    </form>
                </div>
                </div>
            </dialog>
        </>
    )
}