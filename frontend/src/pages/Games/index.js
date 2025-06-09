import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
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

    function reorder (list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    function onDragEnd(result){
        if(!result.destination) return;
        
        const items = reorder(jogos, result.source.index, result.destination.index);

        setJogos(items);
        console.log(items);

        api.post(`/lists/${id}/replacement`, {
            sourceIndex: result.source.index,
            destinationIndex: result.destination.index
        });
    }

    useEffect(() => {
        async function loadJogos(){
            const response = await api.get(`/lists/${id}/games`)

            setJogos(response.data);
        }

        loadJogos();
        setLoading(false);
    }, [id]);

    return (
        <div className="container-games">
            <div className="card-jogos">
                <h1 className="titulo-lista">{nomeDaLista}</h1>
                {loading ? (
                    <p className="loading">Carregando jogos...</p>
                ) : (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="jogos" direction="vertical">
                            {(provided) => (
                                <section
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {jogos.map((jogo, index) => (
                                        <Draggable
                                            key={jogo.id.toString()}
                                            draggableId={jogo.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <article
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <img src={jogo.imgUrl} alt={jogo.title} />
                                                    <div>
                                                        <strong>{jogo.title}</strong>
                                                        <p>{jogo.shortDescription}</p>
                                                        <p className="year">{jogo.year}</p>
                                                        <Link className="enter-info" to={`/games/${jogo.id}`}>
                                                            Acessar
                                                        </Link>
                                                    </div>
                                                </article>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </section>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </div>
        </div>
    )
}

export default Games;