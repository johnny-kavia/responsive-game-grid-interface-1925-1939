import React from "react";

// PUBLIC_INTERFACE
function Square({ value, onClick, isWinning, isLastMove, index }) {
  /** A single board cell rendered as an accessible button. */
  const label = value
    ? `Square ${index + 1}, ${value}`
    : `Square ${index + 1}, empty`;

  return (
    <button
      className={[
        "square",
        value ? "square--filled" : "",
        isWinning ? "square--winning" : "",
        isLastMove ? "square--lastMove" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={Boolean(value)}
    >
      <span className="squareValue" aria-hidden="true">
        {value}
      </span>
    </button>
  );
}

export default Square;
