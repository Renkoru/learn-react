import classNames from "classnames";
import { MoveItem } from ".";

export default function History({
  moves,
  currentMove,
  handleJump,
  handleHistoryHover,
}: {
  moves: MoveItem[][];
  currentMove: number;
  handleJump: CallableFunction;
  handleHistoryHover: CallableFunction;
}) {
  return (
    <div>
      <ul>
        <li className="hover:cursor-pointer" onClick={() => handleJump(0)}>
          Start of the game
        </li>
        {moves.map((_, i) => (
          <li
            key={i}
            onClick={() => handleJump(i + 1)}
            className={classNames("hover:cursor-pointer", {
              "font-bold": i === currentMove - 1,
            })}
            onMouseEnter={() => handleHistoryHover(i + 1)}
            onMouseLeave={() => handleHistoryHover(null)}
          >
            Move # {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
