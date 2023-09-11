import Square from "./square"

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        
            return squares[a];
        }
    }
    return null;
}

export function Board({xIsNext, squares, onPlay}) {
  
    function handleClick (i) {
        console.log('Clicked Square: ', i);
    
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        
        const nextSquares = squares.slice()
        
        if(xIsNext) {
            nextSquares[i] = 'X';
        } else { 
            nextSquares[i] = 'O';
        }
        
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);

    let status;

    if(winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    let boardRows = [];

    for(let i = 0; i < 3; i++) {
        let row = [];
        let squareNum = 0;   
    
        switch(i) {
            case 1: 
                squareNum = 3
                break;
            case 2: 
                squareNum = 6
                break;
            default: 
                squareNum = 0
        }  

        for(let s = 0; s < 3; s++) {
            let currentSquare = squareNum
            row.push(<Square key={`square-${currentSquare}`} value={squares[squareNum]} onSquareClick={() => handleClick(currentSquare)}/>)
            
            squareNum += 1;
        }

        // console.log(`row ${i}`, row);
       
        boardRows.push(
            <div className="board-row" key={`row-${i}`}> 
                {row}
            </div>
        )
    }
    
    return (
        <>
            <div className="status">{status}</div>
            {
                boardRows
            }
        </>
    )
}
