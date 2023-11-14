/*import {Message} from "./Message.tsx";
import { useEffect, useRef, useState} from "react";
import {query, onSnapshot, collection, orderBy, doc} from 'firebase/firestore'
import {db } from "../firebase.ts";
import {ChatMember} from "../model/ChatMember.ts";
import firebase from "firebase/compat/app"
import DocumentData = firebase.firestore.DocumentData;
import {UseChatRoom} from "../context/ChatRoomContext.tsx";

export function ChatBox(){
    const { message } = UseChatRoom()
    /*const [messages, setMessages] = useState<DocumentData[] |  ChatMember[]>([])
    const chatCollectionRef = query(
        doc(collection(db,"message","messages"),)
        //orderBy("createdAt")
        );*/
    /*const messageRef  = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({behavior : "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    //console.log("message", message)

   /* useEffect(() => {
        const unsubscribe = onSnapshot(chatCollectionRef,(querySnapShot) => {
            const messages: DocumentData[] = [];
            querySnapShot.docs.map((doc)=>(
                messages.push({ ...doc.data()})
            ));
            setMessages(messages);
        })
        return unsubscribe;
    }, []);

    console.log(message)*/

    /*return(
        <>
            <div className="mb-28 mt-16">
                {message.map(message=>(
                    <Message key={message.id} message={message}/>
                ))}
                <div ref={messageRef}></div>
            </div>
        </>
    )
}*/