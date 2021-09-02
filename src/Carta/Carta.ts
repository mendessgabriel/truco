import Player from "../Player/Player";

class Carta {
    valor: any;
    naipe: string;
    ehManilha: boolean;
    pertenceAoJogador?: Player;

    constructor(Valor: any, Naipe: string, EhManilha: boolean, PertenceAoJogador?: Player){
        this.valor = Valor;
        this.naipe = Naipe;
        this.ehManilha = EhManilha;
        this.pertenceAoJogador = PertenceAoJogador;
    }
}

export default Carta;