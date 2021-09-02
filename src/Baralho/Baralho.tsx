import Carta from '../Carta/Carta';
import { naipes } from '../enum/enum';

class Baralho {
    cartas: Array<Carta> = [];

    setNaipe = (naipeRandom: number): string => {
      if (naipeRandom === naipes.zap) {
        return 'paus';
      }
      else if (naipeRandom === naipes.copas) {
        return 'copas';
      }
      else if (naipeRandom === naipes.espadilha) {
        return 'espadas';
      }
      else {
        return 'ouros';
      }
    }

    iniciaBaralho = () => {
        for (var i = 0; i < 4; i++) {
            let naipe: string = this.setNaipe(i);
            for (var l = 1; l < 11; l++) {
              let carta = new Carta(l, naipe, false);
              this.cartas.push(carta);
            }
          }
    }

    limpaBaralho = () => {
        this.cartas = [];
    }
}

export default Baralho;