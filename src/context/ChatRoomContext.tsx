import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, where, documentId, getDoc, FieldPath} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UseChat} from "./AuthContext.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import {ChatMember} from "../model/ChatMember.ts";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import {useCollection} from "react-firebase-hooks/firestore";
import {useNavigate} from "react-router-dom";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

type ChatRoomProviderProps = {
    children : ReactNode
}

type chatContextProps = {
    createRoom : (value : string) => void,
    roomName : string,
    setRoomName : Dispatch<SetStateAction<string>>
    message : DocumentData[] |  ChatMember[]
    setMessage : Dispatch<SetStateAction<DocumentData[] | ChatMember[]>>
    setRoomId : Dispatch<SetStateAction<string>>
}

const chatContext = createContext({} as chatContextProps)
export function UseChatRoom(){
    return useContext(chatContext)
}

export function ChatRoomProvider({children}: ChatRoomProviderProps){
    const [roomName , setRoomName] = useState("");
    //const [id , setId] = useState("");
    const { currentUser } = UseChat()
    const [message, setMessage] = useState<DocumentData[] |  ChatMember[]>([])
    const [roomId, setRoomId] = useState("")
    const navigate = useNavigate()
   // const chatCollectionRef = query((collection(db,"message",roomId,"messages")));
    //orderBy("createdAt")
    async function createRoom(roomName : string){
        try {
            await addDoc(collection(db, "group"), {
                room_name: roomName,
                createdBy: currentUser?.displayName,
            }).then((docRef)=>{
                //setId(docRef.id);
                setDoc(doc(db,"message",`${docRef.id}`),{})

                // const message = collection(db,"message")
                // doc(message,`${docRef.id}`).set({})
            })
        } catch (err) {
            console.log(err);
        }
        //console.log(value)
        setRoomName("")
    }



        console.log("doc id", roomId)

    /*function getChats(id : string){
        setRoomId(id)
        console.log("id ",id)
        navigate("/chat")

    }*/


        // const querydata = `message/${roomId}/messages`
        // console.log(querydata)
        // const queryData = collection(db, querydata)
        // const [doc,loading, error] = useCollection<DocumentData>(queryData)






    /*useEffect(() => {
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
    }, [roomId,]);*/
    console.log("message 1", message)

    //console.log("doc id",doc_id)


    return(
        <chatContext.Provider value={{createRoom, roomName, setRoomName, message, setRoomId , setMessage}}>
            {children}
        </chatContext.Provider>
    )

}