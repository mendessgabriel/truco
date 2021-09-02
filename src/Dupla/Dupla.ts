import Carta from '../Carta/Carta';
import Player from '../Player/Player';

class Dupla {
    players: Array<Player>;
    pontos: number;
    pontosRodada: number;

    constructor(Players: Array<Player>, Pontos: number, PontosRodada: number){
        this.players = Players;
        this.pontos = Pontos;
        this.pontosRodada = PontosRodada;
    }
}

export default Dupla;