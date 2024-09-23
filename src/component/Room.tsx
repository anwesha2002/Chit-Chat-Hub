import {Button, Card} from "react-daisyui";
import {RoomType} from "../model/room.ts";
import {UseRoom} from "../context/RoomsProvider.tsx";
import { IoTrash} from "react-icons/io5";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;

export function Room({id , room_name, createdBy} : RoomType | DocumentData){
    const { deleteGroup, setRoomId, setChatRoom, leaveGroup } = UseRoom()

    function handleDelete(id : string){
        confirm("Sure, want to delete the group?") &&  deleteGroup(id)
    }

    function handleRoomClick(id : string){
        console.log(room_name + ": " + id)
        setRoomId(id)
        setChatRoom(room_name)
    }

    function handleLeave(id:string){
        confirm("Sure, want to leave the group?") && leaveGroup(id)
    }

    return(
        <>
            <Card  onClick={()=>handleRoomClick(id)}  className=" p-3 m-4 bg-gray-400 hover:cursor-pointer shadow-gray-400-xl bg-base-false " compact bordered>
               <Card.Body className="text-neutral-400  flex flex-row justify-between items-center hover:cursor-pointer">
                       <div>
                            <Card.Title className=" font-bold" tag="h2">
                                <h2>{room_name}</h2>
                            </Card.Title>
                            <p>Created By : {createdBy}</p>
                           <Button className="btn mt-2 btn-neutral btn-sm overflow-hidden" onClick={()=>navigator.clipboard.writeText(`${id}`)}>copy Id</Button>
                        </div>
                       <div className="flex flex-col">
                           <button onClick={()=>handleLeave(id)} className="btn btn-ghost btn-sm overflow-hidden">Leave</button>
                           <button onClick={() => handleDelete(id)} className="btn btn-sm btn-ghost "><IoTrash style={{color: "red"}}/></button>
                       </div>
                </Card.Body>
            </Card>
        </>
    )
}