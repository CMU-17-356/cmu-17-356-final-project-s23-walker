import { useState, useEffect, createContext } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Accept from "./pages/Accept";
import CoOpHome from "./pages/CoOpHome";
import WalkerCall from "./pages/WalkerCall";
import AuthWrapper from "./components/AuthWrapper";
import IUser from "./types/IUser";

function App() {
    const [user, setUser] = useState({} as IUser);

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("user");
        if (sessionUser) {
            setUser(JSON.parse(sessionUser) as IUser);
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/accept-invite" element={<Accept />} />
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

export const UserContext = createContext();
export default App;
