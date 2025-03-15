import { formatTime } from "@/utils/formatTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../api/api";
import { Todo } from "../types/todo";
import TodoEditor from "./TodoEditor";
import Checkbox from "./ui/Checkbox";
import EditButton from "./ui/EditButton";
import TrashButton from "./ui/TrashButton";
import Dot from "./ui/Dot";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();
  const [isMobile, setIsMobile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateMutation = useMutation({
    mutationFn: (updated: Todo) => updateTodo(updated),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleToggle = () => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

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

  const handleTextClick = () => {
    setIsEditing(true);
  };

  // 모바일에서는 Dot 메뉴의 "수정" 옵션을 통해 수정 모드로 진입
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <li className="flex items-center justify-between p-4 tb:p-3 mb:p-2">
      {/* 체크박스 + 제목 또는 수정 인풋 */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Checkbox checked={todo.completed} onToggle={handleToggle} />
        {isEditing ? (
          <TodoEditor title={todo.title} onSubmit={handleTitleSubmit} onCancel={handleTitleCancel} />
        ) : (
          <span
            className={`min-w-0 flex-1 cursor-pointer truncate transition-colors ${
              todo.completed ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-gray-100"
            } text-body1 tb:text-body2 mb:text-body3`}
            title={todo.title}
            onClick={handleTextClick}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center">
        <span className="text-body1 tb:text-body2 mb:text-body3 min-w-[40px] pl-2 text-right text-gray-500 dark:text-gray-400">
          {formatTime(todo.created_at, isMobile)}
        </span>
        <div className="flex gap-2 px-2 mb:px-1">
          {isMobile ? (
            <Dot onEdit={handleEdit} onDelete={handleDelete} />
          ) : (
            <>
              {isEditing ? (
                <button
                  onClick={handleTitleSubmit.bind(null, todo.title)}
                  className="text-body1 tb:text-body2 mb:text-body3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
                >
                  완료
                </button>
              ) : (
                <EditButton onClick={handleTextClick} title="Edit Todo" />
              )}
              <TrashButton onClick={handleDelete} title="Delete Todo" />
            </>
          )}
        </div>
      </div>
    </li>
  );
}