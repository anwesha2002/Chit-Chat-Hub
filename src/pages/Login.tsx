import {UseChat} from "../context/ChatContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export function Login(){
    const { currentUser, signInWithGoogle } = UseChat()
    const navigate = useNavigate()
    async function handleSignIn(){
        try {
            await signInWithGoogle()

        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(currentUser){
            navigate("/chat")
        }
    }, [currentUser]);

    console.log(currentUser)
    return(
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">HELLO THERE </h1>
                        <p className="py-6">Get connected with many people in the same platform</p>
                        <button onClick={handleSignIn} className="btn btn-neutral">Login with google</button>
                    </div>
                </div>
            </div>
        </>
    )
}