import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import User = firebase.User;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {auth} from "../firebase.ts";
import {ChatMember} from "../model/ChatMember.ts";
import UserCredential = firebase.auth.UserCredential;

type ChatContextproviderProps ={
    children : ReactNode
 }
{/*
    type currentUserProps = {
        id: number
        name: string
    }
*/}

type chatContextProps = {
    currentUser: ChatMember | User | null,
    signInWithGoogle: () => Promise<UserCredential>
    signOut : () => Promise<void>
}

const authContext = createContext({} as chatContextProps);

export function UseChat(){
    return useContext(authContext)
}

export function AuthContextprovider({children} : ChatContextproviderProps){
    const [currentUser, setCurrentUser] = useState<ChatMember | User | null >(null)
    const [loading, setLoading] = useState(true)
    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return auth.signInWithPopup(provider)
    }

    function signOut(){
        return auth.signOut()
    }


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(  (firebaseUser   )     => {
            setCurrentUser(firebaseUser);
            localStorage.setItem("currentuser" , JSON.stringify(firebaseUser))
            setLoading(false);
            // setChatRoom("")
            // setMessage([])
        })
        return ()=>{
            unsubscribe();
        }
    },[currentUser])

    return(
        <authContext.Provider value={{currentUser, signInWithGoogle, signOut}}>
            {!loading && children}
        </authContext.Provider>
    )
}