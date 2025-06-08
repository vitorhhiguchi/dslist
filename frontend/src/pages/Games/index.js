import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useParams } from 'react-router-dom';
import './games.css';

function Games() {

    const { id } = useParams();
    const [jogos, setJogos] = useState([]);
    const [loading, setLoading] = useState(true);

    const nomes = {
        1: 'Aventura e RPG',
        2: 'Jogos de Plataforma'
    };

    const nomeDaLista = nomes[id] || 'Categoria desconhecida';

    const conteudoCardJogos = loading ? (
        <p className="loading">Carregando jogos...</p>
    ) : (
        jogos.map((jogo) => (
            <article key={jogo.id}>
                <img src={jogo.imgUrl} alt={jogo.title} />
                <div>
                    <strong>{jogo.title}</strong>
                    <p>{jogo.shortDescription}</p>
                    <p className="year">{jogo.year}</p>
                    <Link className="enter-info" to={`/games/${jogo.id}`}>Acessar</Link>
                </div>
            </article>
        ))
    );

    useEffect(() => {
        async function loadJogos(){
            const response = await api.get(`/lists/${id}/games`)

            console.log(response.data);
            setJogos(response.data);
        }

        loadJogos();
        setLoading(false);
    }, [id]);

    return (
        <div className="container-games">
            <div className="card-jogos">
                <h1 className="titulo-lista">{nomeDaLista}</h1>
                {conteudoCardJogos}
            </div>
        </div>
    )
}

export default Games;