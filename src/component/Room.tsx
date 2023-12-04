import {Button, Card} from "react-daisyui";
import {RoomType} from "../model/room.ts";
import {UseRoom} from "../context/RoomsProvider.tsx";
import { IoTrash} from "react-icons/io5";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;

export function Room({id , room_name, createdBy} : RoomType | DocumentData){
    const { deleteGroup, setRoomId, setChatRoom } = UseRoom()

    function handleDelete(id : string){
        deleteGroup(id)
    }

    function handleRoomClick(id : string){
        setRoomId(id)
        setChatRoom(room_name)
    }

    return(
        <>
            <Card  onClick={()=>handleRoomClick(id)}  className=" p-5 m-4 bg-gray-400 hover:cursor-pointer shadow-gray-400-xl bg-base-false " compact bordered>
               <Card.Body className="text-neutral-400  flex flex-row justify-between items-center hover:cursor-pointer">
                       <div>
                            <Card.Title className=" font-bold" tag="h2">
                                <h2>{room_name}</h2>
                            </Card.Title>
                            <p>Created By : {createdBy}</p>
                        </div>
                       <div className="flex flex-col">
                            <Button className="btn btn-ghost btn-sm" onClick={()=>navigator.clipboard.writeText(`${id}`)}>copy Id</Button>
                           <button onClick={() => handleDelete(id)} className="btn btn-sm btn-ghost "><IoTrash style={{color: "red"}}/></button>
                       </div>
                </Card.Body>
            </Card>
        </>
    )
}