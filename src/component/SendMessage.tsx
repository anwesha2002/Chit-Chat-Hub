import {FormEvent } from "react";
import {IoSend} from "react-icons/io5";
import {UseSendmessgae} from "../context/SendMessageContext.tsx";

export function SendMessage(){
    //const [value , setValue] = useState("")
    const { value, setValue, sendMessage, chatRoom } = UseSendmessgae()
    //const { currentUser  } = UseChat();
    async function handleSubmit(e : FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(value.trim() === ""){
            alert("type something");
            return;
        }
        sendMessage()
        //console.log(value)
        setValue("")
    }


    return(
        <>
            {chatRoom&&
                <div className="bg-gray-500 rounded-l-lg fixed bottom-0 w-2/3 px-10 py-5 shadow-sm flex justify-center">
                    <form onSubmit={handleSubmit} className="container flex justify-around">
                        <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none  rounded-r-none" type="text"/>
                        <button type="submit" className="bg-gray-200 w-auto rounded-r-lg text-black flex flex-row justify-center items-center">
                            <IoSend className="mx-5 text-xl"/>
                        </button>
                    </form>
                </div>
            }
        </>
    )
}