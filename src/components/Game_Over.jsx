export default function Game_Over({winner,restartGame}){
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It's Draw</p>}
            <p><button onClick={restartGame}>Rematch!  </button></p>
        </div>
    )
}