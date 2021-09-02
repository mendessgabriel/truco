import Carta from '../Carta/Carta';
import Player from '../Player/Player';
import Jogada from '../Jogadas/Jogada';

class Rodada {
    cartas: Array<Carta> = [];
    rodadas: Array<number> = [];
    players: Array<Player> = [];

    jogadas: Array<Jogada> = [];
    pontosRodada: number = 0;

    fimRodada = () => {
        this.jogadas = [];
        this.pontosRodada = 0;
    } 
}

export default Rodada;