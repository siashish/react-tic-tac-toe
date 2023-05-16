import { useState } from "react";
import Board from "./board";

function Game() {
    const [history, setHistory] = useState([
       Array(9).fill(null),
      ])
    const[xIsNext,setxIsNext] = useState(true)
    const [stepNumber, setStepNumber] = useState(0)
    const squares = history[stepNumber];
    
    function handleClick(i){
        // Ye kaam ni kr rha 
        // const newHistory = history.slice(0, stepNumber + 1);
        // const squares = history[history.length - 1];
        // if (calculateWinner(squares) || squares[i]) {
        //     return;
        // }
        // squares[i] = xIsNext ? 'X' : 'O';
        // setHistory([...newHistory, squares])
        // setxIsNext(!xIsNext);
        // setStepNumber(newHistory.length)
        console.log(stepNumber, "stepnumber")
        const newA = history.slice(0,stepNumber+1);
        const newsquare = squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;                               
        }
        newsquare[i] = xIsNext ? 'X' : 'O';
        setHistory([...newA,newsquare])
        setxIsNext(!xIsNext);
        console.log(history)
        setStepNumber(history.length)
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }

    const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });

    function jumpTo(step) {
        console.log("move" +  step );
        setxIsNext((step % 2) === 0);
        setStepNumber(step);
      }

    return ( <div>
        <div className="status">{status}</div><Board handleClick={handleClick} squares={squares}/>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
        </div>
    );
}

export default Game;