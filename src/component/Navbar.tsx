import {UseChat} from "../context/ChatContext.tsx";

export function Navbar(){
    const { currentUser, signOut } = UseChat()

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
                {currentUser && <div className="navbar-end">
                    <button onClick={handlesSignOut} className="btn text-gray-500 btn-ghost">Logout</button>
                </div>
                }
            </div>
        </>
    )
}