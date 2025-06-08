import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import './gameInfo.css';

function GameInfo() {

    const { id } = useParams();
    const [jogo, setJogo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadJogo(){
            const response = await api.get(`/games/${id}`);

            console.log(response);
            setJogo(response.data);
            setLoading(false);
        }

        loadJogo();
    }, [id]);

    console.log(jogo);

    if(loading) {
       return <p>Carregando...</p> 
    }

    function renderStars(score) {
        const fullStars = Math.floor(score);
        const hasHalfStar = score - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];

        for(let i = 0; i < fullStars; i++){
            stars.push(<FaStar key={`full-${id}`}/>);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half"/>)
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`}/>);
        }

        return stars;
    }

    return(
        <div className="gameInfo-container">
            <article className="card-jogo-info" key={jogo.id}>
                <h1>{jogo.title}</h1>
                <img src={jogo.imgUrl} alt={jogo.title}/>
                <div className="score-container">
                    <span className="score-number">{jogo.score}/5</span>
                    <div className="stars"> {renderStars(jogo.score)} </div>
                </div>
                <p className="year-info">Ano de Lançamento: {jogo.year}</p>
                <p className="description">{jogo.longDescription}</p>
            </article>
        </div>
    )
}

export default GameInfo;