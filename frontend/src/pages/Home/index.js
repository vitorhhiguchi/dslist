import { Link } from 'react-router-dom';
import './home.css';

function Home() {

    return(
        <div className="container-home">
            <div className="right">
                <p >DSList PRO</p>
                <h1>Suas coleções do jeito certo</h1>
                <span>Organize suas listas de jogos e compartilhe com seus amigos!</span>
                <Link className="button-iniciar" to="/lists">Iniciar</Link>
            </div>
            <div className="left">
                <img src="/homePage.png" alt="DSList PRO" />
            </div>
        </div>
    );
}

export default Home;