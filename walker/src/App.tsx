import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Accept from "./pages/Accept";
import CoOpHome from "./pages/CoOpHome";
import WalkerCall from "./pages/WalkerCall";

function App() {
    const [user, setUser] = useState(null);

    const getUser = async (email: string) => {
        const response = await axios.get(`/api/users/${email}`);
        setUser(response.data);
    };

    // TODO: replace this once the actual login is implemented
    // Temporarily, hardcode the default user to be logged in
    const handleLogin = (email = "abcd@gmail.com") => {
        sessionStorage.setItem("user", email);
        getUser(email);
    };

    useEffect(() => {
        /* TODO: once backend is done, replace with post request to /login
      & set token instead of directly setting user */
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            getUser(storedUser);
        } else {
            // TODO: redirect to login page instead of directly calling
            handleLogin();
        }
        console.log("user", user);
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/accept-invite" element={<Accept />} />
                <Route
                    path="/create-co-op"
                    element={<Create handleLogin={handleLogin} />}
                />
                <Route
                    path="/co-op-home"
                    element={
                        <CoOpHome
                            userName="JohnD"
                            petName="Buddy"
                            groupName="Happy Paws Co-Op"
                        />
                    }
                />
                <Route path="/create-walker-call" element={<WalkerCall />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
