import { useRef, useState } from "react";
import Todo, { TodoItem } from "./TodoItem";

function NewTodo({ onCreate }: { onCreate: CallableFunction }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    const value = inputRef.current!.value;
    if (value === "") {
      return;
    }

    onCreate(value);
    inputRef.current!.value = "";
  }

  return (
    <div>
      <input name="newtodo" type="text" ref={inputRef} />
      <button className="btn-primary ml-2" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: "1", text: "Learn React", isLiked: true },
    { id: "2", text: "Write Todo app", isLiked: false },
    { id: "3", text: "Find a job", isLiked: false },
    { id: "4", text: "Enjoy", isLiked: false },
  ]);

  function handleCreate(text: string) {
    console.log("index handle create", text);
    setTodos([
      ...todos,
      {
        id: self.crypto.randomUUID(),
        text,
        isLiked: false,
      },
    ]);
  }

  function handleComplete(id: TodoItem["id"]) {
    setTodos(todos.filter(({ id: tid }) => tid !== id));
  }

  function handleLike(id: TodoItem["id"]) {
    const newTodos = [...todos];
    const todoLikedIndex = newTodos.findIndex(({ id: tid }) => tid === id);
    newTodos[todoLikedIndex].isLiked = !newTodos[todoLikedIndex].isLiked;

    setTodos(newTodos);
  }

  const likesCount = todos.filter(({ isLiked }) => isLiked).length;

  return (
    <div>
      <h1 className="flex">
        <span>Todolist</span>
        <img className="w-5 mx-2" alt="" src="/public/heart-solid.svg" /> :{" "}
        {likesCount}
      </h1>
      <div>
        {todos.map((item) => (
          <Todo
            key={item.id}
            data={item}
            onComplete={() => handleComplete(item.id)}
            onLike={() => handleLike(item.id)}
          />
        ))}
      </div>
      <NewTodo onCreate={handleCreate} />
    </div>
  );
}
