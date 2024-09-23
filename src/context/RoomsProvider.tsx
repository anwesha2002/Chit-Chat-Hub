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
    setChatRoom : Dispatch<SetStateAction<string>>,
    chatRoom :string,
    leaveGroup : (id :string) => void,
    setMessage :  Dispatch<SetStateAction<DocumentData[] | ChatMember[]>>
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
    const groupCollectionRef = query(
        collection(db,"group"),
        orderBy("room_name")
    );

    const [message, setMessage] = useState<DocumentData[] |  ChatMember[]>([])
    const [chatRoom , setChatRoom] = useState("")

    const user  =  localStorage.getItem("currentuser")


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
                    setChatRoom(roomName)
                })
            }
        } catch (err) {
            console.log(err);
        }
        //console.log(value)
        setRoomName("")
    }

    useEffect(() => {
        if(!roomId) return

        const chatCollectionRef = query(
            collection(db,"message", `${roomId}`, "messages"),
            orderBy("createdAt"),
        );
        const unsubscribe = onSnapshot(chatCollectionRef,(querySnapshot) => {
            const messages : DocumentData[] = []
            querySnapshot.docs.map((doc)=>(
                messages.push({...doc.data()})
            ))

            // setMessage((prevmesg)=>{
            //     const updatedMessages = messages;
            //     console.log('Previous Messages:', prevmesg);
            //     console.log('New Messages:', messages);
            //     return updatedMessages
            // });

            setMessage(messages)
            // console.log(messages)
        })
        return unsubscribe
    }, [roomId, currentUser?.uid]);


    useEffect ( () => {
        setMessage([])
        setChatRoom("")
        setRoomName("")
        setRoomId("roomId")
    } , [user] );


    // useEffect(() => {
    //     if(!roomId) return
    //
    //     const fetchMessages = async () => {
    //         try {
    //             const chatCollectionRef = query(
    //                 collection(db,"message", `${roomId}`, "messages"),
    //                 orderBy("createdAt"),
    //             );
    //
    //             const unsubscribe = onSnapshot(chatCollectionRef, async (querySnapshot) => {
    //                 const messages: DocumentData[] = [];
    //
    //                 // This can be asynchronous if you want to perform any async tasks like mapping over docs or fetching additional data
    //
    //                     querySnapshot.docs.map( (doc) => {
    //                         messages.push({ ...doc.data() });
    //                     })
    //
    //
    //                 setMessage((prevMessages) => {
    //                     console.log('Previous Messages:', prevMessages);
    //                     console.log('New Messages:', messages);
    //                     const updatedMessages = [...messages];
    //                     return updatedMessages;
    //                 });
    //                 console.log('Messages after update:', messages);
    //             });
    //             return unsubscribe;
    //         }catch (error){
    //             console.error("Error fetching messages:", error);
    //         }
    //     }
    //
    //     fetchMessages()
    //
    //     return () => {
    //         // Unsubscribe when the component unmounts or roomId changes
    //         fetchMessages().then(unsubscribe => {
    //             if (unsubscribe) unsubscribe();
    //         });
    //     };
    // }, [roomId, currentUser?.uid]);






    useEffect(() => {
        const unsubscribe = onSnapshot(groupCollectionRef,(querySnapShot) => {
           onSnapshot(collection(db,"users", `${currentUser?.uid}`, "LoggedIn"),(documents)=>{
               const group : DocumentData[] = []
               querySnapShot.docs.map(docs=>(
                   documents.docs.map((doc)=>doc.id).includes(`${docs.id}`) && group.push({...docs.data(), id : docs.id})
               ))

            setRoom(group);
           })
        })
        return unsubscribe;
    }, [currentUser?.uid]);

    async function joinGroup(id : string){
        await setDoc(doc(db, "users" , `${currentUser?.uid}` , "LoggedIn" , `${id}` ), {})
        setRoomId(id)
    }

    async function deleteGroup(id:string){
        try {
            await deleteDoc(doc(db, "group",`${id}`))
            const messages = collection(db, "message" , `${id}`, "messages")
            getDocs(messages).then(docs=>docs.docs.map(document=>deleteDoc(doc(db,"message",`${id}`,"messages",`${document.id}`))))
            await deleteDoc(doc(db, "message",`${id}`))
            const logedUsers = collection(db, "users")
            const docsnap = getDocs(logedUsers)
            docsnap.then(docs=>docs.docs.map(document=>
                deleteDoc(doc(db,"users", `${document.id}`, "LoggedIn" , `${id}`))
            ))
            setChatRoom("")
        }catch (err){
            console.log(err)
        }
    }

    async function leaveGroup(id : string){
        await deleteDoc(doc(db,"users", `${currentUser?.uid}`, "LoggedIn" , `${id}`))
        setChatRoom("")
        setMessage([])
    }

    useEffect(() => {
        (async() => {
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
        })()
    }, [(currentUser?.email)]);


    return(
        <roomContext.Provider value={{createRoom, roomName, setRoomName, setRoomId, roomId, joinGroup, room, deleteGroup, message, setChatRoom, chatRoom, leaveGroup, setMessage}}>
            {children}
        </roomContext.Provider>
    )
}