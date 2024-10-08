import {UseChat} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import wallpaper from  '../assets/wallpaper1.jpg';
import chatbot from  '../assets/chatbot.jpg';
import createGroup from  '../assets/createGroup.jpg';
import joinWdId from  '../assets/joinId.jpg';
import '../Style/LoginPage.css';

export function Login(){
    const { currentUser, signInWithGoogle } = UseChat()
    const navigate = useNavigate()
    async function handleSignIn(){
        try {
            await signInWithGoogle()
            navigate("/home")
        }catch (err){
            console.log(err)
        }
    }

    // useEffect(() => {
    //     if(currentUser){
    //
    //     }
    // }, [currentUser]);

    console.log(currentUser)
    return(
        <>
            <div className=" flex flex-wrap justify-between items-center overflow-hidden max-w-full  h-full login-background" >
                <div className=" max-w-3xl float-left  ms-10  " >
                    <h1 className=" text-6xl  overflow-hidden">DISCOVER MORE PEOPLE AND GET MORE SWIPES!</h1>
                    <h5 className="my-10 text-2xl">Great software that allows you to chat from any place at any place without any interruption</h5>
                    <button onClick={handleSignIn} className="bg-rose-800 text-3xl mb-5 p-4 rounded-full overflow-hidden">Login with google</button>
                </div>
                <img src={wallpaper} className="h-screen float-right right-0"/>
            </div>
            <div className="my-10">
                <h1 className="text-5xl text-center overflow-hidden">Features for a better experience</h1>
                <div className="flex mt-10 justify-around flex-wrap gap-1 items-center ">
                    <div className="flex flex-col justify-center items-center item">
                        <img className="m-2  border-dark border-3 rounded-full" src={chatbot}/>
                         <h6 className="text-center ">Get connected with many people in the same chat-room</h6>
                    </div>
                    <div className="flex flex-col justify-center items-center item">
                        <img className="m-2  border-dark border-3 rounded-full" src={createGroup}/>
                        <h6 className="text-center ">Create private chat-rooms</h6>
                    </div>
                    <div className="flex flex-col justify-center items-center item">
                        <img className="m-2  border-dark border-3 rounded-full" src={joinWdId}/>
                        <h6 className="text-center ">Join chat-room with private id</h6>
                    </div>
                </div>
            </div>
            {/*<div style={{backgroundColor: "rgb(67, 54, 74)"}}
                  className="icon-image h-full overflow-hidden flex flex-wrap justify-around  flex-row">
                <img className="w-1/4 " src={unlimitedChat}/>
                <div className="flex justify-around  flex-col flex-wrap text-4xl ">
                    <div className="overflow-visible ">Chat without limits out</div>
                    <div className="overflow-visible">Login with multiple google account</div>
                    <div className="overflow-visible ">Delete unwanted group</div>
                </div>
            </div>*/}
        </>
    )
}