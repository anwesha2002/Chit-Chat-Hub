import {Message} from "./Message.tsx";
import { useEffect, useRef, useState} from "react";
import {query ,  onSnapshot, collection, orderBy} from 'firebase/firestore'
import {db } from "../firebase.ts";
import {ChatMember} from "../model/ChatMember.ts";
import firebase from "firebase/compat/app"
import DocumentData = firebase.firestore.DocumentData;

export function ChatBox(){
    const [message, setMessage] = useState<DocumentData[] |  ChatMember[]>([])
    const chatCollectionRef = query(
        collection(db,"messages"),
        orderBy("createdAt")
        );
    const messageRef  = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messageRef?.current?.scrollIntoView({behavior : "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    useEffect(() => {
        const unsubscribe = onSnapshot(chatCollectionRef,(querySnapShot) => {
            const messages: DocumentData[] = [];
            querySnapShot.docs.map((doc)=>(
                messages.push({ ...doc.data()})
            ));
            setMessage(messages);
        })
        return unsubscribe;
    }, []);


    return(
        <>
            <div className="mb-28 mt-16">
                {message.map(message=>(
                    <Message key={message.id} message={message}/>
                ))}
                <div ref={messageRef}></div>
            </div>
        </>
    )
}