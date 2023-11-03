import {FormEvent, useState} from "react";
import {UseChat} from "../context/ChatContext.tsx";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {db} from "../firebase.ts";
import {IoSend} from "react-icons/io5";

export function SendMessage(){
    const [value , setValue] = useState("")
    const { currentUser  } = UseChat();
    async function handleSubmit(e : FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(value.trim() === ""){
            alert("type something");
            return;
        }
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
        //console.log(value)
        setValue("")
    }


    return(
        <>
            <div className="bg-gray-500 fixed bottom-0 w-full px-10 py-5 shadow-sm flex justify-center">
                <form onSubmit={handleSubmit} className="container flex justify-around">
                    <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none  rounded-r-none" type="text"/>
                    <button type="submit" className="bg-gray-200 w-auto rounded-r-lg text-black flex flex-row justify-center items-center">
                        <h6 className="m-2">Send</h6>
                        <IoSend className="me-2"/>
                    </button>
                </form>
            </div>
        </>
    )
}