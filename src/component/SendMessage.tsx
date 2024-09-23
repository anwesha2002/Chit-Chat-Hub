import {FormEvent } from "react";
import {IoSend} from "react-icons/io5";
import {UseSendmessgae} from "../context/SendMessageContext.tsx";
import "../Style/chatroom.css"

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
                <div className="bg-gray-500 rounded-l-lg w-full messagebar  lg:px-10 md:px-5 py-5  shadow-sm flex " >
                    <form onSubmit={handleSubmit} className="container flex w-full">
                        <input value={value} onChange={e => setValue(e.target.value)} className="input  focus:outline-none w-full rounded-r-none"  type="text"/>
                        <button type="submit" className="bg-gray-200 w-auto rounded-r-lg text-black flex flex-row justify-center items-center">
                            <IoSend className="mx-5 text-xl md:text-2xl"/>
                        </button>
                    </form>
                </div>
            }

            {/*{chatRoom&&*/}
            {/*    <div className=" bg-gray-500 rounded-l-lg  w-full  ">*/}
            {/*        <form onSubmit={handleSubmit} className="container flex w-full">*/}
            {/*            <input value={value} onChange={e => setValue(e.target.value)} className="input  focus:outline-none w-full rounded-r-none"  type="text"/>*/}
            {/*            <button type="submit" className="bg-gray-200 w-auto rounded-r-lg text-black flex flex-row justify-center items-center">*/}
            {/*                <IoSend className="mx-5 text-xl"/>*/}
            {/*            </button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*}*/}




        </>
    )
}