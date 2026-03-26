import React, { useMemo, useState } from "react";
import Square from "./Square";

/**
 * Returns winner information for a given board.
 * @param {(null|'X'|'O')[]} squares
 * @returns {{winner: null|'X'|'O', line: number[] | null}}
 */
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
}

function isBoardFull(squares) {
  return squares.every((v) => v !== null);
}

// PUBLIC_INTERFACE
function TicTacToe() {
  /** A complete 2-player Tic Tac Toe game: 3x3 board, turn-taking, win/draw detection, and restart. */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [lastMoveIndex, setLastMoveIndex] = useState(null);

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerInfo.winner;
  const winningLine = winnerInfo.line;
  const isDraw = !winner && isBoardFull(squares);

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "Draw: No moves left";
    return `Next player: ${xIsNext ? "X" : "O"}`;
  }, [winner, isDraw, xIsNext]);

  function handleSquareClick(index) {
    // Ignore clicks if game is over or square already filled.
    if (winner || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setLastMoveIndex(index);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setLastMoveIndex(null);
  }

  const statusTone = winner ? "success" : isDraw ? "warning" : "info";

  return (
    <div className="tictactoe">
      <div className="statusRow" role="status" aria-live="polite">
        <span className={`statusBadge statusBadge--${statusTone}`}>
          {status}
        </span>
      </div>

      <div
        className="board"
        role="grid"
        aria-label="Tic Tac Toe board"
        aria-describedby="gameHelp"
      >
        {squares.map((value, index) => {
          const isWinning = winningLine ? winningLine.includes(index) : false;
          const isLastMove = lastMoveIndex === index;

          return (
            <Square
              key={index}
              value={value}
              onClick={() => handleSquareClick(index)}
              isWinning={isWinning}
              isLastMove={isLastMove}
              index={index}
            />
          );
        })}
      </div>

      <p id="gameHelp" className="helpText">
        Click or tap a square to place your mark. X goes first.
      </p>

      <div className="actions">
        <button className="btn btnPrimary" onClick={handleRestart} type="button">
          New Game
        </button>
        <button
          className="btn btnGhost"
          onClick={handleRestart}
          type="button"
          aria-label="Restart game (same as new game)"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;
