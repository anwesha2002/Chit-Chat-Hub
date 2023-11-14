import {Button, Card} from "react-daisyui";
import {RoomType} from "../model/room.ts";
import {useEffect, useState} from "react";
import {JoinRoomModal} from "./JoinRoomModal.tsx";
import {UseChatRoom} from "../context/ChatRoomContext.tsx";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase.ts";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;

export function Room({id , room_name, createdBy} : RoomType){
    const [clickedJoin, setClickedJoin] = useState(false)
    const {    setMessage } = UseChatRoom()
    const [roomId, setRoomId, ] = useState("")

    function handleclick(id : string){
        setRoomId(id)
    }

    useEffect(() => {
        const chatCollectionRef = query(
            collection(db,`message/${roomId}/messages`),
            orderBy("createdAt"),
        );
        console.log(roomId)
        const unsubscribe = onSnapshot(chatCollectionRef,(querySnapshot) => {
            const messages : DocumentData[] = []
            querySnapshot.docs.map((doc)=>(
                messages.push({...doc.data()})
            ))
            setMessage(messages);
        })
        return unsubscribe
    }, [roomId]);


    return(
        <>
            <Card onClick={()=>handleclick(id)} className="w-full p-3 rounded-full my-4 bg-gray-300 shadow-gray-400-xl" compact bordered>
                <Card.Body className="text-black flex flex-row justify-between items-center">
                    <div>
                        <Card.Title tag="h2">
                            <h2>{room_name}</h2>
                        </Card.Title>
                        <p>Created By : {createdBy}</p>
                    </div>
                    <Button onClick={()=>setClickedJoin(true)}>Join</Button>
                </Card.Body>
                {clickedJoin &&
                    <JoinRoomModal
                        onDisMiss={()=>setClickedJoin(false)}
                        id={id}
                    />
                }
            </Card>
        </>
    )
}