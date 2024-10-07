import { Todos } from "@prisma/client";
import React from "react";

const TodoList = ({ todos }: { todos: Todos[] }) => {
  return (
    <div className="mt-8">
      <h1 className="text-xl font-semibold">Your list:</h1>

      {todos.map((todo, idx) => (
        <div key={todo.id} className="flex gap-2">
          <span>{idx + 1}.</span>
          <li className="capitalize text-blue-600 list-none">{todo.title}</li>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
