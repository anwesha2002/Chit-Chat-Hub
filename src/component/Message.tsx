import {ChatMember} from "../model/ChatMember.ts";
import {UseChat} from "../context/AuthContext.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import {FormatDate} from "../Util/DateFormat.tsx";
type messgeProps ={
    message : ChatMember | DocumentData
}

export function Message({message}: messgeProps){
    const { currentUser } = UseChat()
    return(
        <>
            {currentUser &&
                <div className={`chat ${ message.id === currentUser.uid ? "chat-end" : "chat-start"}`}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={message.avatar} />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message.name}
                        <time className="text-xs opacity-50"></time>
                    </div>
                    <div className="chat-bubble chat-bubble-primary">{message.text}</div>
                    <div className="chat-footer opacity-50">
                        {FormatDate(message.createdAt)}
                    </div>
                </div>
            }
        </>
    )
}