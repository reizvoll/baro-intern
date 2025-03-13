"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../api/api";
import { Todo } from "../types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

  // 투두 수정 뮤테이션
  const updateMutation = useMutation({
    mutationFn: (updated: Todo) => updateTodo(updated),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
  });

  // 투두 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
  });

  // 완료 상태 토글
  const handleToggle = () => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  // 투두 삭제
  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  return (
    <li className="flex items-center justify-between p-2 border rounded">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mr-2"
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        X
      </button>
    </li>
  );
}