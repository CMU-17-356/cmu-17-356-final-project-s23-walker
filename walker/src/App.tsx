import { useState, useEffect, createContext } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Accept from "./pages/Accept";
import CoOpHome from "./pages/CoOpHome";
import WalkerCall from "./pages/WalkerCall";
import AuthWrapper from "./components/AuthWrapper";
import Logout from "./components/Logout";

export const UserContext = createContext();

function App() {
    const [user, setUser] = useState();

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("user");
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Logout />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/accept-invite/:coop_id"
                        element={<Accept />}
                    />
                    <Route path="/create-co-op" element={<Create />} />
                    <Route element={<AuthWrapper />}>
                        <Route path="/co-op-home/:id" element={<CoOpHome />} />
                        <Route
                            path="/create-walker-call"
                            element={<WalkerCall />}
                        />
                    </Route>
                </Routes>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App;
