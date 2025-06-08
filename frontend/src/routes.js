import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Games from "./pages/Games";
import TipoGames from "./pages/TipoGames";
import GameInfo from "./pages/GameInfo";

import Header from './components/Header';

function AppRoutes() {
    const location = useLocation();

    const hideHeaderRoutes = ["/"];
    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lists" element={<TipoGames />} />
                <Route path="/lists/:id/games" element={<Games />} />
                <Route path="/games/:id" element={<GameInfo />} />
            </Routes>
        </>
    );
}

function RoutesApp() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default RoutesApp;