import { HashRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Accept from "./pages/Accept";
import CoOpHome from "./pages/CoOpHome";
import WalkerCall from "./pages/WalkerCall";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/accept-invite" element={<Accept />} />
                <Route path="/create-co-op" element={<Create />} />
                <Route path="/co-op-home" element={<CoOpHome userName = "JohnD" petName="Buddy" groupName="Happy Paws Co-Op" />} />
                <Route path="/create-walker-call" element={<WalkerCall />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
