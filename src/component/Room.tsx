import {Button, Card} from "react-daisyui";
import {Link} from 'react-router-dom'
import {RoomType} from "../model/room.ts";
import {UseRoom} from "../context/RoomsProvider.tsx";
import { IoTrash} from "react-icons/io5";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;

export function Room({id , room_name, createdBy} : RoomType | DocumentData){
    const { deleteGroup } = UseRoom()

    function handleDelete(id : string){
        deleteGroup(id)
    }

    //console.log(id, "=>", group)
    return(
        <>
            <Card id="chatgroup"  className=" p-5 rounded-full m-4 bg-gray-400 flex justify-center items-center shadow-gray-400-xl  border-2 border-b-blue-500 border-t-blue-500 bg-base-false" compact bordered>
               <Card.Body className="text-neutral-400 hover:text-black flex flex-col justify-between items-center">
                   <Link to={`chat/${id}`}>
                       <div>
                            <Card.Title className="text-center" tag="h2">
                                <h2>{room_name}</h2>
                            </Card.Title>
                            <p>Created By : {createdBy}</p>
                        </div>
                   </Link>
                    <Button className="btn btn-ghost btn-sm" onClick={()=>navigator.clipboard.writeText(`${id}`)}>copy Id</Button>
                   <button onClick={() => handleDelete(id)} className="btn btn-sm btn-ghost "><IoTrash style={{color: "red"}}/></button>
                </Card.Body>
                {/*clickedJoin &&
                    <JoinRoomModal
                        onDisMiss={()=>setClickedJoin(false)}
                        id={id}
                    />
                */}
            </Card>
        </>
    )
}