import { createFileRoute } from "@tanstack/react-router";
import TodoList from "../components/TodoList";

export const Route = createFileRoute("/todolist")({
  component: TodoList,
});

export default function TicTakToeIndex() {
  return (
    <div>
      <TodoList />
    </div>
  );
}
