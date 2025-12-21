import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Chat from "./pages/chat/chat";
import ProfileUpdate from "./pages/profileupdate/profileupdate";
import Popup from "./pages/profileupdate/popup/popup";
import DeleteProfilePopup from "./components/leftsidebar/deletePopUp/deletepopup";
import ProtectedRoute from "./utils/ProtectedRoute";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/profile" element={<ProfileUpdate />} />
          <Route path="/chat/addcontact" element={<Popup />} />
          <Route
            path="/chat/deleteprofile"
            element={<DeleteProfilePopup closePopup={() => {}} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
