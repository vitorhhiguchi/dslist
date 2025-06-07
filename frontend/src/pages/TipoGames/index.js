import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './tipoGames.css';

function TipoGames() {

    const [tipos, setTipos] = useState([]);
    
    useEffect(() => {
        async function loadTipos() {
            const response = await api.get("/lists");

            console.log(response.data);
            setTipos(response.data);
        }

        loadTipos();
    }, [])

    return(
        <div className="container-list">
            <div className="container-type-list">
                <h1>Minhas Coleções</h1>
                {tipos.map((tipo) => {
                    return (
                        <Link className="lista-game" to={`/lists/${tipo.id}/games`}>{tipo.name}</Link>
                    )
                })}
            </div>
        </div>
    )

}

export default TipoGames;