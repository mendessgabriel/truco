import Carta from '../Carta/Carta';

class Player {
    nome: string = '';
    quantidadeCartas: number = 0;
    cartas: Array<Carta> = [];

    constructor(QuantidadeCartas: number) {
        this.quantidadeCartas = QuantidadeCartas;
    }

    jogar = (indexCarta: number): Carta => {
        let carta: Carta = new Carta('4', 'paus', false);

        if (this.cartas.length > 0 && this.cartas[indexCarta]) {
            carta = this.cartas[indexCarta];
        }

        while (indexCarta >= 0) {
            this.cartas.splice(indexCarta, 1);
            indexCarta = this.cartas.indexOf(carta);
        }

        return carta;
    }

    trucar = () => {
        alert(this.nome + ' TRUCOOOOOO!');
    }

}

export default Player;