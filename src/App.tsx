import './App.css'
import {Login} from "./pages/Login.tsx";
import {Navbar} from "./component/Navbar.tsx";
import {Chatroom} from "./pages/Chatroom.tsx";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./component/PrivateRoute.tsx";
import {AuthContextprovider} from "./context/AuthContext.tsx";
import {Rooms} from "./pages/Rooms.tsx";
import {NewRoomModal} from "./component/NewRoomModal.tsx";
import {useState} from "react";
import {ChatRoomProvider} from "./context/ChatRoomContext.tsx";

function App() {


    return (
        <div>
            <AuthContextprovider>
                <ChatRoomProvider>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Login/>}></Route>
                        <Route path="/room" element={
                            <PrivateRoute>
                                <Rooms/>
                            </PrivateRoute>
                        }></Route>
                        <Route path="/chat" element={<Chatroom/>}></Route>
                    </Routes>
                </ChatRoomProvider>
            </AuthContextprovider>

        </div>
  )
}

export default App
