import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Accept from "./pages/Accept";
import CoOpHome from "./pages/CoOpHome";
import WalkerCall from "./pages/WalkerCall";
import AuthWrapper from "./components/AuthWrapper";
import { useEffect } from "react";

function App() {
    // TODO: replace this once the actual login is implemented
    // Temporarily, hardcode the default user to be logged in
    const [user, setUser] = useState()

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("user");
        if (sessionUser) {
            setUser(JSON.parse(sessionUser))
        }
    }, [])
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/accept-invite/:coop_id" element={<Accept />} />
                <Route
                    path="/create-co-op"
                    element={<Create />}
                />
                <Route element={<AuthWrapper />}>
                    <Route
                        path="/co-op-home/:id"
                        element={<CoOpHome user={user} />}
                    />
                    <Route path="/create-walker-call" element={<WalkerCall user={user} />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
