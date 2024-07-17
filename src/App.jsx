import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Players from "./components/Players"
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import Game_Over from "./components/Game_Over";

const PLAYERS={
  'X':'Player 1',
  'O':'Player 2'
}

const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
  if (gameTurns.length>0 && gameTurns[0].player==='X') {

    currentPlayer='O';
    
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,player){
  let winner;
  for(const combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol=gameBoard[combination[0].row] [combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row] [combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row] [combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol) {
      winner=player[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])];
  for(const turn of gameTurns){
      const{square,player}=turn;
      const{row,col}=square;

      gameBoard[row][col]=player;
  }
  return gameBoard;
}

function App() {
  const [player,setPlayer]=useState(PLAYERS)
  const [gameTurns,setGameTurns]=useState([]);
 
  const activePlayer=deriveActivePlayer(gameTurns);

  const gameBoard=deriveGameBoard(gameTurns);
    const winner=deriveWinner(gameBoard,player)
  const hasDraw=!winner && gameTurns.length===9;

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{
     const currentPlayer=deriveActivePlayer(prevTurns);
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns];
      return updatedTurns;
    })

  }
  function restartGame(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayer(prevPlayer=>{
      return{
        ...prevPlayer,
        [symbol]:newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
    <ol id="players" className="highlight-player">
    <Players initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}/>
    <Players initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
    </ol>
    {(winner || hasDraw) && <Game_Over winner={winner} restartGame={restartGame}/>}
    <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns}/>
    </main>
  )
}

export default App
