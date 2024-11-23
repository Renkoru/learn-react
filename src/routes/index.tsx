import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

export default function Index() {
  return (
    <>
      <div>
        <Link to="/tictaktoe">Tic Tak Toe game from React tutorial</Link>
      </div>
      <div>
        <Link to="/todolist">Todo List</Link>
      </div>
    </>
  );
}
