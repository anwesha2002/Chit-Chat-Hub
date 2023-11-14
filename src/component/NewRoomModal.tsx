import {Button, Form, Input, Modal} from "react-daisyui";
import {FormEvent, useRef, useState} from "react";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UseChat} from "../context/AuthContext.tsx";
import {UseChatRoom} from "../context/ChatRoomContext.tsx";

interface NewRoomModalProps {
    onDisMiss : () => void

}
export function NewRoomModal({onDisMiss}:NewRoomModalProps){
   // const nameRef = useRef<HTMLInputElement>(null)
   // const [value , setValue] = useState("")
    //const { currentUser } = UseChat()
    const { createRoom , roomName, setRoomName}=  UseChatRoom()

    function HandleSubmit(e : FormEvent<HTMLFormElement>){
        e.preventDefault()
        createRoom(roomName);
        //console.log(value)
        setRoomName("")
    }

    return(
        <Modal open backdrop className="modal-top">
            <Modal.Header>
                <Modal.Actions>
                    <form method="dialog">
                        <Button onClick={onDisMiss}>X</Button>
                    </form>
                </Modal.Actions>
                New Room
            </Modal.Header>
            <Modal.Body className="my-5">
                <Form onSubmit={HandleSubmit}>
                    <Form.Label >
                        Name
                    </Form.Label>
                    <Input type="text" onChange={(e)=>setRoomName(e.target.value)} value={roomName} size="xs" className="input text-black w-full bg-gray-300 my-5" />
                    <Button type="submit" className="w-full  ">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}