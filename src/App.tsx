import './App.css'
import {Login} from "./pages/Login.tsx";
import {Navbar} from "./component/Navbar.tsx";
import {Chatroom} from "./pages/Chatroom.tsx";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./component/PrivateRoute.tsx";
import {AuthContextprovider} from "./context/AuthContext.tsx";
import {Rooms} from "./pages/Rooms.tsx";
import {RoomContextProvider} from "./context/RoomsProvider.tsx";
import {SendMEssageContextProvider} from "./context/SendMessageContext.tsx";
import {useState} from "react";

function App() {

    const [showsidebar, setShowsidebar] = useState(false)


    return (
        <div>
            <AuthContextprovider>
                <RoomContextProvider>
                <Navbar setShowsidebar={setShowsidebar} showsidebar={showsidebar}/>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                       <Route path="/home" element={
                            <PrivateRoute>
                                {/*<div className="drawer lg:drawer-open">*/}
                                {/*    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />*/}
                                    <Rooms showsidebar={showsidebar}/>
                                    <SendMEssageContextProvider>
                                        <Chatroom/>
                                    </SendMEssageContextProvider>
                                {/*</div>*/}
                            </PrivateRoute>
                        }>
                       </Route>
                </Routes>
                </RoomContextProvider>
            </AuthContextprovider>

        </div>
  )
}

export default App
