import { MouseEventHandler, ReactNode, useState } from "react";
import { MoveItem, MoveHighlightIndex } from ".";
import classNames from "classnames";

function Square({
  value,
  handleClick,
  isHighlighted,
}: {
  value: MoveItem;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  isHighlighted: boolean;
}) {
  return (
    <button
      className={classNames(
        "w-24 h-24 text-3xl border-black border-solid border",
        { "bg-lime-100": isHighlighted },
      )}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function GameField({
  currentMoves,
  handleMove,
  isDisabled,
  highlightedMove,
}: {
  currentMoves: MoveItem[];
  handleMove: CallableFunction;
  isDisabled: boolean;
  highlightedMove: MoveHighlightIndex;
}) {
  function handleClick(i: number) {
    if (isDisabled || currentMoves[i]) {
      return;
    }

    handleMove(i);
  }

  return (
    <div>
      {[0, 3, 6].map((i) => (
        <div key={i} className="flex">
          {[0, 1, 2].map((j) => (
            <Square
              key={j}
              value={currentMoves[i + j]}
              handleClick={() => handleClick(i + j)}
              isHighlighted={i + j === highlightedMove}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
