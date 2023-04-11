import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Accept from "./pages/Accept";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/accept-invite" element={<Accept />} />
                <Route path="/create-co-op" element={<Create />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
