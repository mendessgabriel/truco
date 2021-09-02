import Carta from '../Carta/Carta';

class Jogadas {
    cartas: Array<Carta> = [];

    constructor(Cartas: Array<Carta>) {
        this.cartas = Cartas;
    }
}

export default Jogadas;