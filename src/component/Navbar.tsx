import {UseChat} from "../context/AuthContext.tsx";
import {useState} from "react";
import {NewRoomModal} from "./NewRoomModal.tsx";

export function Navbar(){
    const { currentUser, signOut } = UseChat();
    const [clicked , setClicked] = useState(false)


    async function handlesSignOut(){
        try {
            await signOut()
        }catch (err){
            console.log(err)
        }
    }

    return(
        <>
            <div className="navbar bg-gray-300 fixed z-10 top-0" >
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-gray-400 text-xl">Chatter Box</a>
                </div>
                {currentUser &&
                <div className="navbar-end flex  items-center">
                    <button onClick={()=>setClicked(true)} className="btn text-gray-500 btn-ghost">Create Room +</button>
                    <button onClick={handlesSignOut} className="btn text-gray-500 btn-ghost">Logout</button>
                </div>
                }
                {clicked &&
                    <NewRoomModal
                        onDisMiss={()=>setClicked(false)}
                    />
                }
            </div>
        </>
    )
}