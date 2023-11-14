import {Room} from "../component/Room.tsx";
import {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase.ts";
import {RoomType} from "../model/room.ts";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;

export function Rooms(){
    const [room, setRoom] = useState<RoomType[] | DocumentData[]>([])
    const groupCollectionRef = query(
        collection(db,"group")
    );

    useEffect(() => {
        const unsubscribe = onSnapshot(groupCollectionRef,(querySnapShot) => {
            const group: DocumentData[] = [];
            querySnapShot.docs.map((doc)=>(
                group.push({ ...doc.data(), id : doc.id})
            ));
            setRoom(group);
        })
        return unsubscribe;
    }, []);

    console.log(room)
    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen mx-14 my-14">
                {room.map(room=>(
                    <Room key={room.id} {...room}/>
                ))}

            </div>
        </>
    )
}