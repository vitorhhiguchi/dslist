import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Games from "./pages/Games";
import TipoGames from "./pages/TipoGames";
import GameInfo from "./pages/GameInfo";

import Header from './components/Header';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lists" element={<TipoGames />} />
                <Route path="/lists/:id/games" element={<Games />} />
                <Route path="/games/:id" element={<GameInfo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;