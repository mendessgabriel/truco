import React, { useEffect } from 'react';
import Carta from './Carta/Carta';
import Player from './Player/Player';
import Dupla from './Dupla/Dupla';
import Baralho from './Baralho/Baralho';
import './App.css';

function App() {
  const [quantidadeJogadores, setQuantidadeJogadores] = React.useState<number>(0);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [rodadas, setRodadas] = React.useState<Carta[]>([]);
  const [manilha, setManilha] = React.useState<number>(Math.floor(Math.random() * 10) + 1);

  const [baralhoGame, setBaralhoGame] = React.useState<Baralho>(new Baralho());

  const [aceitarTruco, setAceitarTruco] = React.useState<boolean>(false);

  const [dupla, setDupla] = React.useState<Dupla[]>([]);
  const [second, setSecond] = React.useState<string>('0');
  const [counter, setCounter] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [jogadorRodada, setJogadorRodada] = React.useState<Player>();

  const [trucado, setTrucado] = React.useState<boolean>(false);
  const [duplaVencedora, setDuplaVencedora] = React.useState<Dupla[]>([]);

  const setPlayersGame = (event: React.ChangeEvent<{ value: string }>) => {
    setQuantidadeJogadores(parseInt(event.target.value));
  }

  const iniciaBaralho = () => {
    let baralho = new Baralho();
    baralho.iniciaBaralho();

    setBaralhoGame(baralho);
  }

  const zeraBaralho = () => {
    if (baralhoGame.cartas.length > 0) {
      baralhoGame.limpaBaralho();
    }
  }

  const endGame = () => {
    zeraBaralho();
    setManilha(Math.floor(Math.random() * 10) + 1);
    setPlayers([]);
    setRodadas([]);
    setSecond('0');
    setCounter(0);
    setIsActive(!isActive);
  }

  const trucar = () => {
    if (jogadorRodada) {
      jogadorRodada?.trucar();
      setIsActive(!isActive);
    }

    setTrucado(true);
  }

  const aceitarTrucoRodada = () => {
    setAceitarTruco(true);
    setTrucado(false);
    setIsActive(!isActive);
  }

  const rejeitarTrucoRodada = () => {
    setAceitarTruco(false);
    setRodadaWinner(rodadas, true);
    // setManilha(Math.floor(Math.random() * 10) + 1);
    iniciaBaralho();
    setRodadas([]);
    setTrucado(false);
    setIsActive(!isActive);

    let teste = setPlayerRodada(jogadorRodada?.nome) - 1;
    let nextPlayer = parseInt(jogadorRodada ? jogadorRodada?.nome.substring(jogadorRodada?.nome.length - 1, jogadorRodada?.nome.length) : '0');

    if (teste === players.length - 1) {
      nextPlayer = 0;
      setJogadorRodada(players[nextPlayer]);
      setSecond('0');
      setCounter(0);
    }

    if (jogadorRodada?.nome.includes(nextPlayer.toString())) {
      setJogadorRodada(players[nextPlayer]);
      setSecond('0');
      setCounter(0);
    }
  }

  const setRodadaWinner = (cartasRodada: Array<Carta>, trucoRejeitado?: boolean): Carta => {
    console.log(cartasRodada);
    let cartaVencedora: Array<Carta> = [];

    if (trucoRejeitado) {
      if (dupla[0].players[0].nome === jogadorRodada?.nome ||
        dupla[0].players[1].nome === jogadorRodada?.nome) {
        dupla[0].pontosRodada += 1;
      } else {
        dupla[0].pontosRodada += 1;
      }

      setTimeout(() => {
        players.forEach((pla) => {
          let cartas: Array<Carta> = [];

          for (var l = 0; l < 3; l++) {
            let anyBaralhoValue = Math.floor(Math.random() * baralhoGame.cartas.length);
            let carta: Carta = baralhoGame.cartas.splice(anyBaralhoValue - 1, 1)[0];

            if (carta.valor === manilha)
              carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, true, pla);
            else
              carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, false, pla);

            cartas.push(carta);
          }

          pla.cartas = cartas;
        });

        dupla[0].pontos = 0;
        dupla[1].pontos = 0;
        setDuplaVencedora([]);

      }, 500);

      return new Carta('', '', false);
    } else {
      cartasRodada.forEach((carta) => {
        if (carta.ehManilha) {
          cartaVencedora.push(carta);
        } else {
          if (carta.valor == 3) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3) {
                cartaVencedora = [];
              } else {
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 2) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 'A') {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 10) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2 || cartaVencedora[0].valor == 'A') {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 9) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2 || cartaVencedora[0].valor == 'A' ||
                cartaVencedora[0].valor == 10) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 8) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2 || cartaVencedora[0].valor == 'A' ||
                cartaVencedora[0].valor == 10 || cartaVencedora[0].valor == 9) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 7) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2 || cartaVencedora[0].valor == 'A' ||
                cartaVencedora[0].valor == 10 || cartaVencedora[0].valor == 9 || cartaVencedora[0].valor == 8) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 6) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2 || cartaVencedora[0].valor == 'A' ||
                cartaVencedora[0].valor == 10 || cartaVencedora[0].valor == 9 || cartaVencedora[0].valor == 8 ||
                cartaVencedora[0].valor == 7) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 5) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2 || cartaVencedora[0].valor == 'A' ||
                cartaVencedora[0].valor == 10 || cartaVencedora[0].valor == 9 || cartaVencedora[0].valor == 8 ||
                cartaVencedora[0].valor == 7 || cartaVencedora[0].valor == 6) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else if (carta.valor == 4) {
            if (cartaVencedora.length > 0 && cartaVencedora[0].ehManilha == false) {
              if (cartaVencedora[0].valor == 3 || cartaVencedora[0].valor == 2 || cartaVencedora[0].valor == 'A' ||
                cartaVencedora[0].valor == 10 || cartaVencedora[0].valor == 9 || cartaVencedora[0].valor == 8 ||
                cartaVencedora[0].valor == 7 || cartaVencedora[0].valor == 6 || cartaVencedora[0].valor == 5) {

              } else {
                cartaVencedora = [];
                cartaVencedora.push(carta);
              }
            } else {
              cartaVencedora.push(carta);
            }
          } else {
            cartaVencedora.push(carta);
          }
        }
      });

      cartaVencedora.forEach((carta) => {
        if (carta.ehManilha) {
          if (carta.naipe === 'paus') {
            cartaVencedora = [];
            cartaVencedora.push(carta);
          } else if (carta.naipe === 'copas') {
            cartaVencedora = [];
            cartaVencedora.push(carta);
          } else if (carta.naipe === 'espadas') {
            cartaVencedora = [];
            cartaVencedora.push(carta);
          } else {
            cartaVencedora = [];
            cartaVencedora.push(carta);
          }
        }
      })

      if (cartaVencedora[0].pertenceAoJogador?.nome.includes('1') || cartaVencedora[0].pertenceAoJogador?.nome.includes('3')) {
        let newDupla = dupla;

        newDupla[0].pontos += 1;

        if (newDupla[0].pontos === 2) {
          // setManilha(Math.floor(Math.random() * 10) + 1);
          if (aceitarTruco)
            newDupla[0].pontosRodada += 3;
          else
            newDupla[0].pontosRodada += 1;

          setTimeout(() => {
            players.forEach((pla) => {
              let cartas: Array<Carta> = [];

              for (var l = 0; l < 3; l++) {
                let anyBaralhoValue = Math.floor(Math.random() * baralhoGame.cartas.length);
                let carta: Carta = baralhoGame.cartas.splice(anyBaralhoValue - 1, 1)[0];

                if (carta.valor === manilha)
                  carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, true, pla);
                else
                  carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, false, pla);

                cartas.push(carta);
              }

              pla.cartas = cartas;
            });

            
            newDupla[0].pontos = 0;
            newDupla[1].pontos = 0;
            setDuplaVencedora([]);
            setAceitarTruco(false);
            

          }, 500);
        }
        setDuplaVencedora([...duplaVencedora, newDupla[0]]);

        setDupla(newDupla);

      } else {
        let newDupla = dupla;
        newDupla[1].pontos += 1;

        if (newDupla[1].pontos === 2) {
          // setManilha(Math.floor(Math.random() * 10) + 1);
          if (aceitarTruco)
            newDupla[1].pontosRodada += 3;
          else
            newDupla[1].pontosRodada += 1;

          setTimeout(() => {
            players.forEach((pla) => {
              let cartas: Array<Carta> = [];

              for (var l = 0; l < 3; l++) {
                let anyBaralhoValue = Math.floor(Math.random() * baralhoGame.cartas.length);
                let carta: Carta = baralhoGame.cartas.splice(anyBaralhoValue - 1, 1)[0];

                if (carta.valor === manilha)
                  carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, true, pla);
                else
                  carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, false, pla);

                cartas.push(carta);
              }

              pla.cartas = cartas;
            });

            
            newDupla[0].pontos = 0;
            newDupla[1].pontos = 0;
            setDuplaVencedora([]);
            setAceitarTruco(false);
          }, 500);
        }
        setDuplaVencedora([...duplaVencedora, newDupla[1]]);

        setDupla(newDupla);
      }
    }

    return cartaVencedora[0];
  }

  const jogar = (carta: number, player: Player) => {
    autoPlay(player, carta);

    let teste = setPlayerRodada(jogadorRodada?.nome) - 1;
    let nextPlayer = parseInt(jogadorRodada ? jogadorRodada?.nome.substring(jogadorRodada?.nome.length - 1, jogadorRodada?.nome.length) : '0');

    if (teste === players.length - 1) {
      nextPlayer = 0;
      setJogadorRodada(players[nextPlayer]);
      setSecond('0');
      setCounter(0);
    }

    if (jogadorRodada?.nome.includes(nextPlayer.toString())) {
      setJogadorRodada(players[nextPlayer]);
      setSecond('0');
      setCounter(0);
    }

  }

  const setGamePlayers = () => {
    if (quantidadeJogadores % 2 === 0) {
      let players: Array<Player> = [];

      for (var i = 0; i < quantidadeJogadores; i++) {
        let cartas: Array<Carta> = [];

        for (var l = 0; l < 3; l++) {
          let anyBaralhoValue = Math.floor(Math.random() * baralhoGame.cartas.length);
          let carta: Carta = baralhoGame.cartas.splice(anyBaralhoValue - 1, 1)[0];

          if (carta.valor === manilha)
            carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, true);
          else
            carta = new Carta(carta.valor == 1 ? 'A' : carta.valor, carta.naipe, false);

          cartas.push(carta);
        }

        let player = new Player(cartas.length);
        player.nome = 'Player ' + (i + 1);
        player.cartas = cartas;

        for (var g = 0; g < player.cartas.length; g++) {
          player.cartas[g].pertenceAoJogador = player;
        }

        players.push(player);
      }

      setPlayers(players);

      if (players.length > 3 && dupla.length === 0) {
        let duplaUm: Dupla = new Dupla(players.filter(element => element.nome.includes('1') || element.nome.includes('3')), 0, 0);
        let duplaDois: Dupla = new Dupla(players.filter(element => element.nome.includes('2') || element.nome.includes('4')), 0, 0);
        let duplaArray: Array<Dupla> = [duplaUm, duplaDois];

        setDupla(duplaArray);
      }

      const randomPlayer = Math.floor(Math.random() * players.length);
      console.log(randomPlayer, players[randomPlayer]);
      setJogadorRodada(players[randomPlayer]);
      // iniciaBaralho();
      setIsActive(!isActive);
    }
  }

  const autoPlay = (player: Player, player1Played: number) => {
    if (rodadas.length === players.length) {
      setRodadaWinner(rodadas);
      setManilha(Math.floor(Math.random() * 10) + 1);
      iniciaBaralho();
      setRodadas([]);
    } else {
      if (player1Played != 90) {
        let cartaQueVaiPraMesa = player.jogar(player1Played);
        setRodadas([...rodadas, cartaQueVaiPraMesa]);
      } else {
        let indice = Math.floor(Math.random() * player.cartas.length);
        let cartaQueVaiPraMesa = player.jogar(indice);
        setRodadas([...rodadas, cartaQueVaiPraMesa]);
      }
    }
  }

  const setPlayerRodada = (nomeJogador?: string): number => {
    return parseInt(jogadorRodada ? jogadorRodada?.nome.substring(jogadorRodada?.nome.length - 1, jogadorRodada?.nome.length) : '0');
  }

  useEffect(() => {
    // setIsActive(false);
    if (baralhoGame.cartas.length === 0) {
      iniciaBaralho();
    }

    let intervalId: any;

    if (isActive) {
      intervalId = setInterval(() => {
        if (jogadorRodada?.nome.includes('1')) {
          if (counter + 1 === 30 || counter + 1 > 30) {
            autoPlay(jogadorRodada ? jogadorRodada : players[0], 90);

            let teste = setPlayerRodada(jogadorRodada?.nome) - 1;
            let nextPlayer = parseInt(jogadorRodada ? jogadorRodada?.nome.substring(jogadorRodada?.nome.length - 1, jogadorRodada?.nome.length) : '0');

            if (teste === players.length - 1) {
              nextPlayer = 0;
              setJogadorRodada(players[nextPlayer]);
              setSecond('0');
              setCounter(0);
            }

            if (jogadorRodada?.nome.includes(nextPlayer.toString())) {
              setJogadorRodada(players[nextPlayer]);
              setSecond('0');
              setCounter(0);
            }

          } else {
            setSecond((counter + 1).toString());
            setCounter(counter => counter + 1);
          }
        } else {
          if (counter + 1 === 3 || counter + 1 > 3) {
            autoPlay(jogadorRodada ? jogadorRodada : players[0], 90);

            let teste = setPlayerRodada(jogadorRodada?.nome) - 1;
            let nextPlayer = parseInt(jogadorRodada ? jogadorRodada?.nome.substring(jogadorRodada?.nome.length - 1, jogadorRodada?.nome.length) : '0');

            if (teste === players.length - 1) {
              nextPlayer = 0;
              setJogadorRodada(players[nextPlayer]);
              setSecond('0');
              setCounter(0);
            }

            if (jogadorRodada?.nome.includes(nextPlayer.toString())) {
              setJogadorRodada(players[nextPlayer]);
              setSecond('0');
              setCounter(0);
            }

          } else {
            setSecond((counter + 1).toString());
            setCounter(counter => counter + 1);
          }
        }
      }, 1000)

      return () => clearInterval(intervalId);
    }

  }, [isActive, counter]);

  return (
    <div>
      {players.length === 0 && <div className="perguntaQuantidadeJogadores" id="perguntaQuantidadeJogadores">
        {manilha > 0 ? <div>
          <label htmlFor="quantidadeJogadores">Quantos jogadores participarão do jogo? </label>
          <input type="number" onChange={setPlayersGame} id="quantidadeJogadores" name="quantidadeJogadores" />
        </div> : null}
        {players.length === 0 ? <button onClick={setGamePlayers} id="comecarJogo">Começar!</button> : <div>
          <button onClick={endGame} >fim de jogo!</button>
        </div>
        }
      </div>}

      <div className='divPai'>
        <div style={{ display: 'flex' }}>
          <div className='primeira'>
            {dupla.map((dup, indexDupla) => {
              return (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }} key={indexDupla}>
                    <label style={{ padding: '1rem' }}><b>{dup.players[0].nome.includes('1') || dup.players[0].nome.includes('3') ? 'Nós ' : 'Eles '}</b></label>
                    <div style={{ display: 'flex' }}>
                      <div className={duplaVencedora[0] ? (duplaVencedora[0].players[0].nome === dup.players[0].nome || duplaVencedora[0].players[0].nome === dup.players[1].nome) ? 'win-pointGrid' : 'lose-pointGrid' : 'non-pointGrid'}>{' '}</div>
                      <div className={duplaVencedora[1] ? (duplaVencedora[1].players[0].nome === dup.players[0].nome || duplaVencedora[0].players[0].nome === dup.players[1].nome) ? 'win-pointGrid' : 'lose-pointGrid' : 'non-pointGrid'}>{' '}</div>
                      <div className={duplaVencedora[2] ? (duplaVencedora[2].players[0].nome === dup.players[0].nome || duplaVencedora[0].players[0].nome === dup.players[1].nome) ? 'win-pointGrid' : 'lose-pointGrid' : 'non-pointGrid'}>{' '}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ color: 'green', textAlign: 'center' }}>
              Rodada valendo: <b>{aceitarTruco ? '3' : '1'}</b>
              <p>Pontos totais dupla Player 1 e Player 3: <b>{dupla && dupla[0] && dupla[0].pontosRodada}</b></p>
              <p>Pontos totais dupla Player 2 e Player 4: <b>{dupla && dupla[1] &&   dupla[1].pontosRodada}</b></p>
            </div>
          </div>
          <div className='segunda'>

            {players && players[2] && <div className='divJogadorGrid'>
              {players[2].cartas.map((carta, indexCarta) => {
                return (
                  <div key={indexCarta} onClick={() => jogar(indexCarta, players[2])} className={players[2].nome !== 'Player 1' ? 'backCardGrid' : carta.ehManilha ? 'gold' : 'carta'}>
                    <div>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>

                    <div className={carta.naipe === 'paus' ? 'centerCardBlack' : carta.naipe === 'copas' ? 'centerCard' : carta.naipe === 'espadas' ? 'centerCardBlack' : 'centerCard'}>
                      <div className="alinhamento firstLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento secondLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento thirdLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                    </div>

                    <div>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>
                  </div>
                );
              })}

            </div>}
            {jogadorRodada && jogadorRodada?.nome === players[2].nome ? <div style={{ width: '90%', marginLeft: '30px', marginTop: '40px' }}>
              <progress className="progress" value={second} max={players[2].nome.includes('1') ? "30" : "3"}></progress>
            </div>
              : null}
          </div>
          <div className='terceira'>
            {manilha > 0 && <div className='manilha'>
              <label>Manilha:</label>
              <p>{manilha == 8 ? 'Q' : manilha == 9 ? 'J' : manilha == 10 ? 'K' : manilha == 1 ? 'A' : manilha}</p>
            </div>}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div className='quarta'>
            {players && players[3] && <div className=''>
              {jogadorRodada?.nome === players[3].nome ? <div className='progressDiv'>
                <progress className="progressLateral" value={second} max={players[3].nome.includes('1') ? "30" : "3"}></progress>
              </div>
                : null}
              {players[3].cartas.map((carta, indexCarta) => {
                return (
                  <div key={indexCarta} onClick={() => jogar(indexCarta, players[3])} className={players[3].nome !== 'Player 1' ? 'backCardGridLateral' : carta.ehManilha ? 'goldGrid' : 'carta'}>
                    <div>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>

                    <div className={carta.naipe === 'paus' ? 'centerCardBlack' : carta.naipe === 'copas' ? 'centerCard' : carta.naipe === 'espadas' ? 'centerCardBlack' : 'centerCard'}>
                      <div className="alinhamento firstLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento secondLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento thirdLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                    </div>

                    <div>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>
                  </div>
                );
              })}
            </div>}
          </div>
          <div className='quinta'>
            {rodadas.map((rodada, indexRodada) => {
              return (
                <>
                  <div key={indexRodada} className='rodada'>
                    <div className={rodada.ehManilha ? 'goldGrid' : 'carta'} >
                      {rodada.pertenceAoJogador?.nome}
                      <div>
                        <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.valor == 1 ? 'A' : rodada.valor == 8 ? 'Q' : rodada.valor == 9 ? 'J' : rodada.valor == 10 ? 'K' : rodada.valor}</p>
                        <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>

                      <div className={rodada.naipe === 'paus' ? 'centerCardBlack' : rodada.naipe === 'copas' ? 'centerCard' : rodada.naipe === 'espadas' ? 'centerCardBlack' : 'centerCard'}>
                        <div className="alinhamento firstLine">
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                        </div>
                        <div className="alinhamento secondLine">
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                        </div>
                        <div className="alinhamento thirdLine">
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                          <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                        </div>
                      </div>

                      <div style={{ justifyContent: 'flex-end' }}>
                        <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.valor == 1 ? 'A' : rodada.valor == 8 ? 'Q' : rodada.valor == 9 ? 'J' : rodada.valor == 10 ? 'K' : rodada.valor}</p>
                        <p className={rodada.naipe === 'paus' ? 'black' : rodada.naipe === 'copas' ? 'red' : rodada.naipe === 'espadas' ? 'black' : 'red'}>{rodada.naipe === 'paus' ? '♣' : rodada.naipe === 'copas' ? '♥' : rodada.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className='sexta'>
            {players && players[1] && <div className=''>
              {jogadorRodada?.nome === players[1].nome ? <div className='progressDivDireita'>
                <progress className="progressLateralDireita" value={second} max={players[1].nome.includes('1') ? "30" : "3"}></progress>
              </div>
                : null}
              {players[1].cartas.map((carta, indexCarta) => {
                return (
                  <div key={indexCarta} onClick={() => jogar(indexCarta, players[1])} className={players[1].nome !== 'Player 1' ? 'backCardGridLateralRight' : carta.ehManilha ? 'gold' : 'carta'}>
                    <div>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>

                    <div className={carta.naipe === 'paus' ? 'centerCardBlackGrid' : carta.naipe === 'copas' ? 'centerCard' : carta.naipe === 'espadas' ? 'centerCardBlackGrid' : 'centerCardGrid'}>
                      <div className="alinhamento firstLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento secondLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento thirdLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                    </div>

                    <div>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>
                  </div>
                );
              })}
            </div>}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div className='setima'>
            {jogadorRodada?.nome.includes('1') && <button className='btntruco' onClick={trucar}>
              TRUCAR</button>}
          </div>
          <div className='oitava'>
            {jogadorRodada && jogadorRodada?.nome === players[0].nome ? <div style={{ width: '90%', marginLeft: '30px' }}>
              <progress className="progress" value={second} max={players[0].nome.includes('1') ? "30" : "3"}></progress>
            </div>
              : null}
            {players && players[0] && <div className='divJogadorGrid'>

              {players[0].cartas.map((carta, indexCarta) => {
                return (
                  <div key={indexCarta} onClick={() => jogar(indexCarta, players[0])} className={players[0].nome !== 'Player 1' ? 'backCardGrid' : carta.ehManilha ? 'goldGridMy' : 'cartaGrid'}>
                    <div>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>

                    <div className={carta.naipe === 'paus' ? 'centerCardBlackGrid' : carta.naipe === 'copas' ? 'centerCardGrid' : carta.naipe === 'espadas' ? 'centerCardBlackGrid' : 'centerCardGrid'}>
                      <div className="alinhamento firstLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento secondLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                      <div className="alinhamento thirdLine">
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                        <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                      </div>
                    </div>

                    <div style={{ justifyContent: 'flex-end' }}>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.valor == 1 ? 'A' : carta.valor == 8 ? 'Q' : carta.valor == 9 ? 'J' : carta.valor == 10 ? 'K' : carta.valor}</p>
                      <p className={carta.naipe === 'paus' ? 'black' : carta.naipe === 'copas' ? 'red' : carta.naipe === 'espadas' ? 'black' : 'red'}>{carta.naipe === 'paus' ? '♣' : carta.naipe === 'copas' ? '♥' : carta.naipe === 'espadas' ? '♠' : '♦'}</p>
                    </div>
                  </div>
                );
              })}
            </div>}
          </div>
          <div className='nona'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
