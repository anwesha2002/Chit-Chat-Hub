import './App.css'
import {Login} from "./pages/Login.tsx";
import {Navbar} from "./component/Navbar.tsx";
import {Chatroom} from "./pages/Chatroom.tsx";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./component/PrivateRoute.tsx";
import {ChatContextprovider} from "./context/ChatContext.tsx";

function App() {

  return (
    <ChatContextprovider>
        <Navbar />
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/chat" element={
                <PrivateRoute>
                    <Chatroom/>
                </PrivateRoute>
            }></Route>
        </Routes>
    </ChatContextprovider>
  )
}

export default App
