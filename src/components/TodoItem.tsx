"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../api/api";
import { Todo } from "../types/todo";
import TrashButton from "./ui/TrashButton";
import Checkbox from "./ui/Checkbox";
import { formatTime } from "@/utils/formatTime";

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
    <li className="flex items-center justify-between p-2">
      {/* 체크박스 + 텍스트 */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
      <Checkbox checked={todo.completed} onToggle={handleToggle} />
        <span
           className={`text-lg transition-colors truncate flex-1 min-w-0 ${
            todo.completed
              ? "text-gray-400 dark:text-gray-600"
              : "text-gray-900 dark:text-gray-100"
          }`}
          title={todo.title}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[40px] text-right">
      {formatTime(todo.createdAt)}
        </span>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <TrashButton />
        </button>
      </div>
    </li>
  );
}
