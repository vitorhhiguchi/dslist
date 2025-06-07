import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Games from "./pages/Games";
import TipoGames from "./pages/TipoGames";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lists" element={<TipoGames />} />
                <Route path="/lists/:id/games" element={<Games />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;