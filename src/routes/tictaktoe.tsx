import { createFileRoute } from "@tanstack/react-router";
import TicTakToe from "../components/TicTakToe";

export const Route = createFileRoute("/tictaktoe")({
  component: TicTakToeIndex,
});

export default function TicTakToeIndex() {
  return (
    <div>
      <TicTakToe />
    </div>
  );
}
