"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

export default function TodoList() {
  // 필터 상태: all, completed, active
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  // 커스텀 훅을 통해 투두 목록을 가져옵니다.
  const { data: todos, isPending, isError } = useTodos();

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!todos) return null;

  let filteredTodos = todos;
  if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-gray-200" : "bg-gray-100"}`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${filter === "active" ? "bg-gray-200" : "bg-gray-100"}`}
        >
          진행중
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${filter === "completed" ? "bg-gray-200" : "bg-gray-100"}`}
        >
          완료
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
