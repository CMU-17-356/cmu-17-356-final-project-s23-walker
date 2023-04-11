import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Landing from "./pages/Landing";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
