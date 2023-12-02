import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {
    addDoc,
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    deleteDoc ,
    query,
    arrayRemove,
    onSnapshot, orderBy
} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UseChat} from "./AuthContext.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import {RoomType} from "../model/room.ts";

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
}

const roomContext = createContext({} as chatContextProps)
export function UseRoom(){
    return useContext(roomContext)
}

export function RoomContextProvider({children} : roomContextRroviderPros){
    const { currentUser } = UseChat()
    const [roomName , setRoomName] = useState("");
    const [roomId, setRoomId] = useState("")
    const [room , setRoom ] = useState<RoomType[] | DocumentData[]>([])
    //const [docdata , setDocdata] = useState<string[]>([])
    const userGroupRef = doc(db, "users" , `${currentUser?.uid}`)
    const groupCollectionRef = query(
        collection(db,"group"),
        orderBy("room_name")
    );
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
                    setRoom(room=> [...room,docRef])
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
        const groupArray : string[] = [];
        (async ()=>{
            try {
                //const querysnapshot =  doc(db,"users", `${currentUser?.uid}`);
                const docsnap= await getDoc(userGroupRef)
                groupArray.push(docsnap.data()?.group)
            }catch (err){
                console.log(err)
            }
        })();
        const unsubscribe = onSnapshot(groupCollectionRef,(querySnapShot) => {
            const group: DocumentData[] = [];
            querySnapShot.docs.map((document)=>{
                groupArray.map(doc=>
                    doc.includes(`${document.id}`) && group.push({ ...document.data(), id : document.id})
                )
            });
            setRoom(group);
        })
        return unsubscribe;
    }, []);

    async function joinGroup(id : string){
        await updateDoc(userGroupRef,{
            group : arrayUnion(id)
        })
    }

    async function deleteGroup(id:string){
        try {
            //const users = collection(db, "users")
            await deleteDoc(doc(db, "group",`${id}`))
            await deleteDoc(doc(db, "message",`${id}`))
            await updateDoc(userGroupRef, {
                group : arrayRemove(id)
            })
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
        <roomContext.Provider value={{createRoom, roomName, setRoomName, setRoomId, roomId, joinGroup, room, deleteGroup}}>
            {children}
        </roomContext.Provider>
    )
}