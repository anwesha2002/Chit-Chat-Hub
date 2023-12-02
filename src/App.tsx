import './App.css'
import {Login} from "./pages/Login.tsx";
import {Navbar} from "./component/Navbar.tsx";
import {Chatroom} from "./pages/Chatroom.tsx";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./component/PrivateRoute.tsx";
import {AuthContextprovider} from "./context/AuthContext.tsx";
import {Rooms} from "./pages/Rooms.tsx";
import {ChatRoomProvider} from "./context/ChatRoomContext.tsx";
import {RoomContextProvider} from "./context/RoomsProvider.tsx";
import {SendMEssageContextProvider} from "./context/SendMessageContext.tsx";

function App() {

    return (
        <div>
            <AuthContextprovider>
                            <RoomContextProvider>
                                <Navbar/>
                    <Routes>
                        <Route path="/" element={<Login/>}></Route>
                            <Route path="/room" element={
                                <PrivateRoute>
                                    <ChatRoomProvider>
                                        <Rooms/>
                                    </ChatRoomProvider>
                                </PrivateRoute>
                            }></Route>
                            <Route path="room/chat/:roomId" element=
                                {
                                    <ChatRoomProvider>
                                        <SendMEssageContextProvider>
                                            <Chatroom/>
                                        </SendMEssageContextProvider>
                                    </ChatRoomProvider>
                                }>
                            </Route>
                    </Routes>
                            </RoomContextProvider>
            </AuthContextprovider>

        </div>
  )
}

export default App
