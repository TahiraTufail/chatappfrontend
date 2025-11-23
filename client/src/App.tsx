import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Chat from "./pages/chat/chat";
import Profileupdate from "./pages/profileupdate/profileupdate";


const App = () => {
  return(
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<Profileupdate/>}/>
    </Routes>
    </>
  )
};

export default App;
