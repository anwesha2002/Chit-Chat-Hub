import {UseChat} from "../context/AuthContext.tsx";
import {Dispatch , SetStateAction , useState} from "react";
import {NewRoomModal} from "./NewRoomModal.tsx";
import {FaBars} from "react-icons/fa";
import "../Style/rooms.css"

type navbarProps = {
    showsidebar : boolean,
    setShowsidebar : Dispatch<SetStateAction<boolean>>
}

export function Navbar({showsidebar, setShowsidebar } : navbarProps){
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
                {currentUser &&
                    <div className="navbar fixed bg-gray-700 z-10 top-0">
                    <div className="flex-1">
                        <div onClick={()=>setShowsidebar(!showsidebar)} className="ml-3 text-2xl menu-bar"><FaBars/></div>
                        <a className="btn btn-ghost logo normal-case text-gray-400 text-xl">Chatter Box</a>
                    </div>
                    {currentUser &&
                        <div className="navbar-end flex  items-center">
                            <button onClick={() => setClicked(true)} className="btn text-gray-300 btn-ghost">Create Room +
                            </button>
                            <button onClick={handlesSignOut} className="btn text-gray-300 btn-ghost">Logout</button>
                            {currentUser.photoURL && <img className="h-8 mr-1 rounded-full" src={currentUser.photoURL}/>}
                        </div>
                    }
                    {clicked &&
                        <NewRoomModal
                            onDisMiss={() => setClicked(false)}
                        />
                    }
                </div>}
            </>
        )
}