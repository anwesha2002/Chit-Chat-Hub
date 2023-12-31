import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UseChat} from "./AuthContext.tsx";
import {UseRoom} from "./RoomsProvider.tsx";


type sendMessageContextProps = {
    children : ReactNode
}

type UseSendMessgaeProps = {
    value : string,
    setValue : Dispatch<SetStateAction<string>>
    sendMessage : () => void
    chatRoom :string
}

const sendMessageContext = createContext({} as UseSendMessgaeProps)

export function UseSendmessgae(){
    return useContext(sendMessageContext)
}

export function SendMEssageContextProvider({children} : sendMessageContextProps){
    const [value , setValue] = useState("")
    const { currentUser } = UseChat()
    const { roomId, chatRoom } = UseRoom()


    async function sendMessage(){
        try {
            await addDoc(collection(db, "message", `${roomId}`, "messages"), {
                name: currentUser?.displayName,
                text: value,
                avatar: currentUser?.photoURL,
                createdAt: serverTimestamp(),
                id : currentUser?.uid,
            })
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <sendMessageContext.Provider value={{value , setValue, sendMessage, chatRoom}}>
            {children}
        </sendMessageContext.Provider>
    )
}