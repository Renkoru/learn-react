import { useState } from "react";
import GameField from "./GameField";
import Controls from "./Controls";
import History from "./History";

export type MoveItem = null | string;
export type MoveHighlightIndex = null | number;

export default function TicTakToe() {
  const [winner, setWinner] = useState<MoveItem>(null);
  const [highlightedMove, setHighlightedMove] =
    useState<MoveHighlightIndex>(null);
  const [xIsNext, setXIsNext] = useState(true);
  const [moves, setMoves] = useState([Array(9).fill(null)]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [currentMove, setCurrentMove] = useState(moves[currentMoveIndex]);

  function handleMove(i: number) {
    const nextMove = currentMove.slice();
    nextMove[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setMoves([...moves.slice(0, currentMoveIndex + 1), nextMove]);
    setCurrentMove(nextMove);
    setCurrentMoveIndex(currentMoveIndex + 1);

    const possibleWinner = calculateWinner(nextMove);
    if (possibleWinner) {
      setWinner(possibleWinner);
    }
  }

  function handleReset() {
    setMoves([Array(9).fill(null)]);
    setCurrentMove(moves[0]);
    setWinner(null);
    setCurrentMoveIndex(0);
  }

  function handlePreviousMove() {
    if (currentMoveIndex === 0) {
      return;
    }

    setXIsNext(!xIsNext);
    setWinner(null);
    setCurrentMoveIndex(currentMoveIndex - 1);
    setCurrentMove(moves[currentMoveIndex - 1]);
  }

  function handleNextMove() {
    if (currentMoveIndex === moves.length - 1) {
      return;
    }

    setXIsNext(!xIsNext);
    setCurrentMoveIndex(currentMoveIndex + 1);
    setCurrentMove(moves[currentMoveIndex + 1]);

    const possibleWinner = calculateWinner(moves[currentMoveIndex + 1]);
    if (possibleWinner) {
      setWinner(possibleWinner);
    }
  }

  function handleJump(i: number) {
    setXIsNext(i % 2 === 0);
    setCurrentMoveIndex(i);
    setCurrentMove(moves[i]);

    setWinner(calculateWinner(moves[i]));
  }

  function handleHistoryHover(i: MoveHighlightIndex) {
    if (!i) {
      setHighlightedMove(null);
      return;
    }

    setHighlightedMove(getMoveItemIndex(moves, i!));
    console.log("highlighted", i);
  }

  return (
    <div>
      <div>
        <GameField
          currentMoves={currentMove}
          handleMove={handleMove}
          isDisabled={!!winner}
          highlightedMove={highlightedMove}
        />

        <Controls
          handleReset={handleReset}
          handlePreviousMove={handlePreviousMove}
          handleNextMove={handleNextMove}
        />
        <History
          handleJump={handleJump}
          currentMove={currentMoveIndex}
          handleHistoryHover={handleHistoryHover}
          moves={moves.slice(1)}
        />
      </div>

      <div>{winner && <div>Winner: {winner}</div>}</div>
    </div>
  );
}

// calculates index of changed moveItem
function getMoveItemIndex(allMoves: MoveItem[][], i: number): number {
  const currentMove = allMoves[i];
  const previousMove = allMoves[i - 1];

  for (let j = 0; j < currentMove.length; j++) {
    if (currentMove[j] !== previousMove[j]) {
      return j;
    }
  }

  return 0;
}

function calculateWinner(squares: MoveItem[]): string | null {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
