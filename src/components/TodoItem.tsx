import { useDeleteTodo, useUpdateTodo } from "@/hooks/useTodoMutations";
import { formatTime } from "@/utils/formatTime";
import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import TodoEditor from "./TodoEditor";
import Checkbox from "./ui/Checkbox";
import Dot from "./ui/Dot";
import EditButton from "./ui/EditButton";
import TrashButton from "./ui/TrashButton";

export default function TodoItem({ todo }: { todo: Todo }) {
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

  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const handleToggle = () => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  const handleTitleSubmit = (newTitle: string) => {
    if (!newTitle.trim() || newTitle === todo.title) {
      setIsEditing(false);
      return;
    }

    // 수정 후 UI 즉시 업데이트
    updateMutation.mutate({ ...todo, title: newTitle });
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-4 tb:p-3 mb:p-2">
      {/* 체크박스 + 제목 또는 수정 인풋 */}
      <div className="flex min-w-0 flex-1 items-center gap-4 tb:gap-3 mb:gap-2">
        <Checkbox checked={todo.completed} onToggle={handleToggle} />
        {isEditing ? (
          <TodoEditor title={todo.title} onSubmit={handleTitleSubmit} onCancel={() => setIsEditing(false)} />
        ) : (
          <span
            className={`min-w-0 flex-1 cursor-pointer truncate transition-colors ${
              todo.completed ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-gray-100"
            } text-body1 tb:text-body2 mb:text-body3`}
            title={todo.title}
            onClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center">
        {!isEditing && (
          <span className="min-w-[40px] pl-2 text-right text-body1 text-gray-500 tb:text-body2 mb:text-body3 dark:text-gray-400">
            {formatTime(todo.created_at, isMobile)}
          </span>
        )}
        <div className="flex px-2 mb:px-1">
          {isMobile ? (
            isEditing ? (
              <button
                onClick={handleTitleSubmit.bind(null, todo.title)}
                className="rounded border bg-gray-100 px-3 py-1 text-body3 text-gray-500 dark:bg-gray-800 dark:text-gray-300"
              >
                완료
              </button>
            ) : (
              <Dot onEdit={() => setIsEditing(true)} onDelete={handleDelete} />
            )
          ) : (
            <>
              {isEditing ? (
                <button
                  onClick={handleTitleSubmit.bind(null, todo.title)}
                  className="rounded border bg-gray-100 px-3 py-1 text-body1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 tb:text-body2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-500"
                >
                  완료
                </button>
              ) : (
                <>
                  <EditButton onClick={() => setIsEditing(true)} title="수정" />
                  <TrashButton onClick={handleDelete} title="삭제" />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}
