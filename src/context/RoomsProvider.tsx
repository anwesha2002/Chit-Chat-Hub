import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {
    addDoc,
    collection,
    doc,
    setDoc,
    getDoc,
    deleteDoc ,
    query,
    onSnapshot, orderBy, getDocs
} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UseChat} from "./AuthContext.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import {RoomType} from "../model/room.ts";
import {ChatMember} from "../model/ChatMember.ts";

type roomContextRroviderPros = {
    children : ReactNode
}

type chatContextProps ={
    createRoom : (value : string) => void,
    roomName : string,
    setRoomName : Dispatch<SetStateAction<string>>
    roomId : string
    setRoomId : Dispatch<SetStateAction<string>>
    joinGroup : (id : string) => void,
    room : DocumentData[] | RoomType[]
    deleteGroup : (id: string) => void
    message : DocumentData[] |  ChatMember[]
}

const roomContext = createContext({} as chatContextProps)
export function UseRoom(){
    return useContext(roomContext)
}

export function RoomContextProvider({children} : roomContextRroviderPros){
    const { currentUser } = UseChat()
    const [roomName , setRoomName] = useState("");
    const [roomId, setRoomId] = useState("roomId")
    const [room , setRoom ] = useState<RoomType[] | DocumentData[]>([])
    //const userGroupRef = doc(db, "users" , `${currentUser?.uid}`)
    const groupCollectionRef = query(
        collection(db,"group"),
        orderBy("room_name")
    );

    const [message, setMessage] = useState<DocumentData[] |  ChatMember[]>([])


    //const [group, setGroup] = useState(false)
    async function createRoom(roomName : string){
        try {
            if(roomName.trim() !== ""){
                await addDoc(collection(db, "group"), {
                    room_name: roomName,
                    createdBy: currentUser?.displayName,
                }).then((docRef)=>{
                    //setId(docRef.id);
                    setDoc(doc(db,"message",`${docRef.id}`),{})
                    joinGroup(docRef.id)
                    setRoomId(docRef.id)
                   /* const document  = doc(db, "group", `${docRef.id}`)
                    const docSnap = await getDoc(document)
                    console.log(docSnap.data())
                    setRoom(room=>({...room, }))*/
                    // const message = collection(db,"message")
                    // doc(message,`${docRef.id}`).set({})
                })
            }
        } catch (err) {
            console.log(err);
        }
        //console.log(value)
        setRoomName("")
    }

    useEffect(() => {
        console.log(roomId)
        const chatCollectionRef = query(
            collection(db,"message", `${roomId}`, "messages"),
            orderBy("createdAt"),
        );
        const unsubscribe = onSnapshot(chatCollectionRef,(querySnapshot) => {
            const messages : DocumentData[] = []
            querySnapshot.docs.map((doc)=>(
                messages.push({...doc.data()})
            ))
            setMessage(messages);
            console.log("message",messages)
        })
        return unsubscribe
    }, [roomId]);

    useEffect(() => {
       // const groupArray : string[] = [];
        /*(async ()=>{
            try {
                //const querysnapshot =  doc(db,"users", `${currentUser?.uid}`);
                const docsnap= await getDoc(userGroupRef)
                groupArray.push(docsnap.data()?.group)
            }catch (err){
                console.log(err)
            }
        })();*/
        /*const unsub = onSnapshot(collection(db, "users" , `${currentUser?.uid}`, "LoggedIn"  )
            , (doc) =>{
            groupArray.push(doc.data()?.group)
        })*/
        const unsubscribe = onSnapshot(groupCollectionRef,(querySnapShot) => {
           onSnapshot(collection(db,"users", `${currentUser?.uid}`, "LoggedIn"),(documents)=>{
               const group : DocumentData[] = []
               querySnapShot.docs.map(docs=>(
                   documents.docs.map((doc)=>doc.id).includes(`${docs.id}`) && group.push({...docs.data(), id : docs.id})
               ))

            setRoom(group);
            console.log(group)
           })
        })
        return unsubscribe;
    }, []);

    async function joinGroup(id : string){
        /*await updateDoc(userGroupRef,{
            group : arrayUnion(id)
        })*/
        await setDoc(doc(db, "users" , `${currentUser?.uid}` , "LoggedIn" , `${id}` ), {})
        //return setDoc(doc(db,"users",`${currentUser?.uid}`, "LoggedIn" , `${id}`),{})
    }

    async function deleteGroup(id:string){
        try {
            //const users = collection(db, "users")
            await deleteDoc(doc(db, "group",`${id}`))
            //await deleteField(doc(db, "message",`${id}`, "messages"))
            const messages = collection(db, "message" , `${id}`, "messages")
            getDocs(messages).then(docs=>docs.docs.map(document=>deleteDoc(doc(db,"message",`${id}`,"messages",`${document.id}`))))
            await deleteDoc(doc(db, "message",`${id}`))
            const logedUsers = collection(db, "users")
            const docsnap = getDocs(logedUsers)
            docsnap.then(docs=>docs.docs.map(document=>
                deleteDoc(doc(db,"users", `${document.id}`, "LoggedIn" , `${id}`))
            ))
        }catch (err){
            console.log(err)
        }
    }

     /*async function userCheck(id : string){
        const querysnapshot = await getDocs(collection(db,"users"));
        const groupArray : string[] = []
         querysnapshot.forEach((doc)=>{
             groupArray.push({...doc.data().group})
         })
         groupArray.map(group=>(
             group === id ? setGroup(true) : setGroup(false)
         ))
    }*/


    useEffect(() => {
        async function joinUser() {
            try{
                const docRef = doc(db, "users",`${currentUser?.uid}`)
                const docSnap = await getDoc(docRef)
                if(!docSnap.exists()){
                    await setDoc(doc(db,"users",`${currentUser?.uid}`),{
                        displayName : currentUser?.displayName,
                        email : currentUser?.email
                    })
                }
            }catch (err){
                console.log(err)
            }
        }
        joinUser()
    }, [(currentUser?.email)]);

    return(
        <roomContext.Provider value={{createRoom, roomName, setRoomName, setRoomId, roomId, joinGroup, room, deleteGroup, message}}>
            {children}
        </roomContext.Provider>
    )
}