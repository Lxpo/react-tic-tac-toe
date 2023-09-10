import { useState } from "react"
import { Board } from "./board"

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove];  

    let xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        function isAtCurrentMove () {
            if (move === history.length - 1) {
                return true
            } else {
                return false
            }
        }

        let description = '';

        if(move > 0) {
            if(isAtCurrentMove()) {
                description = `You are at move ${move + 1}`
            } else {
                description = `Go to move #: ${move}`
            }
        } else {
            description = `Go to game start.`
        }

        return(
            <li key={`btn-${move}`}>
                {
                    isAtCurrentMove() ? 
                    (
                        description
                    )
                    :
                    (
                        <button onClick={() =>  jumpTo(move)}>{description}</button>
                    )
                }
                
            </li>
        )

    })

    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}