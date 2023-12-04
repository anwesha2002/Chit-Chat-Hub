/*import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import {db} from "../firebase.ts";*/
/*import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import {ChatMember} from "../model/ChatMember.ts";
import { useParams} from "react-router-dom";

type ChatRoomProviderProps = {
    children : ReactNode
}

type chatContextProps = {
    message : DocumentData[] |  ChatMember[]
    setMessage : Dispatch<SetStateAction<DocumentData[] | ChatMember[]>>
}

const chatContext = createContext({} as chatContextProps)
export function UseChatRoom(){
    return useContext(chatContext)
}

export function ChatRoomProvider({children}: ChatRoomProviderProps){
    //const [id , setId] = useState("");
    const [message, setMessage] = useState<DocumentData[] |  ChatMember[]>([])
    //const [value , setValue] = useState("");

    // const chatCollectionRef = query((collection(db,"message",roomId,"messages")));
    //orderBy("createdAt")
    const { roomId } = useParams()*/



        //console.log("doc id", roomId)

    /*function getChats(id : string){
        setRoomId(id)
        console.log("id ",id)
        navigate("/chat")

    }*/







    /*async function sendMessage(){
        try {
            await addDoc(collection(db, "messages"), {
                name: currentUser?.displayName,
                text: value,
                avatar: currentUser?.photoURL,
                createdAt: serverTimestamp(),
                id : currentUser?.uid
            })
        } catch (err) {
            console.log(err);
        }
    }*/


        // const querydata = `message/${roomId}/messages`
        // console.log(querydata)
        // const queryData = collection(db, querydata)
        // const [doc,loading, error] = useCollection<DocumentData>(queryData)

    /*useEffect(() => {
        const chatCollectionRef = query(
            collection(db,"message", `${roomId}`, "messages"),
            orderBy("createdAt"),
        );
        const unsubscribe = onSnapshot(chatCollectionRef,(querySnapshot) => {
            const messages : DocumentData[] = []
            querySnapshot.docs.map((doc)=>(
                messages.push({...doc.data()})
            ))
            setMessage(messages);
            console.log("message",messages)
        })
        return unsubscribe
    }, [roomId]);*/
    /*console.log("message 1", message)

    //console.log("doc id",doc_id)


    return(
        <chatContext.Provider value={{message , setMessage}}>
            {children }
        </chatContext.Provider>
    )

}*/