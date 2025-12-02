import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Chat from "./pages/chat/chat";
import ProfileUpdate from "./pages/profileupdate/profileupdate";
import PopUp from "./pages/popup/popup";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
        <Route path="/chat/addcontact" element={<PopUp/>}/>
      </Routes>
    </>
  );
};

export default App;
