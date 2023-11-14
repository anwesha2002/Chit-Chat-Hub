import {Button, Form, Input, Modal} from "react-daisyui";
import {FormEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {setDoc, doc, collection, document, addDoc} from 'firebase/firestore'
import {db} from "../firebase.ts";
import {UseChat} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface NewRoomModalProps{
    onDisMiss : () => void
    id : string
}

export function JoinRoomModal({onDisMiss, id}:NewRoomModalProps){
    const [value, setValue] = useState("")
    const { currentUser } = UseChat();
    console.log(id)
    const navigate = useNavigate();
    async function handleJoin(e : FormEvent<HTMLInputElement>){
        e.preventDefault();
        try{
            if(value === id){
                navigate("/chat")
            }
            /*const message = doc(db,"message",id)
            const messages = collection(message, "messages")
            await addDoc(messages,{
                    text : value,
                    name : currentUser?.displayName
                })*/
            }
        catch (err){
            console.log(err)
        }
    }

    return(
        <>
            <Modal open backdrop className="modal-top">
                <Modal.Header>
                    <Modal.Actions>
                        <form method="dialog">
                            <Button onClick={onDisMiss}>X</Button>
                        </form>
                    </Modal.Actions>
                    Join Id
                </Modal.Header>
                <Modal.Body className="my-5">
                    <Form onSubmit={handleJoin}>
                        <Input type="text" onChange={(e)=>setValue(e.target.value)} value={value} size="xs" className="input text-black w-full bg-gray-300 my-5" />
                        <Button type="submit" className="w-full  btn btn-primary">Add</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}