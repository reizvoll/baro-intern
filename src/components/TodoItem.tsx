"use client";

import { formatTime } from "@/utils/formatTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../api/api";
import { Todo } from "../types/todo";
import TodoEditor from "./TodoEditor";
import Checkbox from "./ui/Checkbox";
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
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Checkbox checked={todo.completed} onToggle={handleToggle} />
        {isEditing ? (
          <TodoEditor title={todo.title} onSubmit={handleTitleSubmit} onCancel={handleTitleCancel} />
        ) : (
          <span
            className={`min-w-0 flex-1 cursor-pointer truncate text-xs transition-colors sm:text-sm md:text-base ${
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
        <span className="min-w-[40px] pl-2 text-right text-xs text-gray-500 sm:text-sm md:text-base dark:text-gray-400">
          {formatTime(todo.createdAt, isMobile)}
        </span>
        <div className="flex px-4">
          <EditButton
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
            title="Edit Todo"
          />
          <TrashButton
            onClick={handleDelete}
            className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
            title="Delete Todo"
          />
        </div>
      </div>
    </li>
  );
}
