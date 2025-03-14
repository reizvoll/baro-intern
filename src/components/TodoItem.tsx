"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../api/api";
import { Todo } from "../types/todo";
import Checkbox from "./ui/Checkbox";
import TodoEditor from "./TodoEditor";
import { formatTime } from "@/utils/formatTime";
import EditButton from "./ui/EditButton";
import TrashButton from "./ui/TrashButton";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();
  const [isMobile, setIsMobile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 420); // 420px 미만, 모바일로 판단
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 투두 수정 뮤테이션
  const updateMutation = useMutation({
    mutationFn: (updated: Todo) => updateTodo(updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  // 투두 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  // 완료 상태 토글
  const handleToggle = () => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  // 투두 삭제
  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  const handleTitleSubmit = (newTitle: string) => {
    updateMutation.mutate({ ...todo, title: newTitle });
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-3 md:p-6">
      {/* 체크박스 + 제목 또는 수정 인풋 */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Checkbox checked={todo.completed} onToggle={handleToggle} />
        {isEditing ? (
          <TodoEditor title={todo.title} onSubmit={handleTitleSubmit} onCancel={handleTitleCancel} />
        ) : (
          <span
            className={`text-lg transition-colors truncate flex-1 min-w-0 cursor-pointer ${
              todo.completed ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-gray-100"
            }`}
            title={todo.title}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center">
  <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[40px] text-right pl-2">
    {formatTime(todo.createdAt, isMobile)}
  </span>
  <div className="px-4 flex">
    <EditButton
      onClick={() => setIsEditing(true)}
      className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500"
      title="Edit Todo"
    />
    <TrashButton
      onClick={handleDelete}
      className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500"
      title="Delete Todo"
    />
  </div>
</div>
    </li>
  );
}
