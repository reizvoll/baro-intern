import { formatTime } from "@/utils/formatTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../api/api";
import { Todo } from "../types/todo";
import TodoEditor from "./TodoEditor";
import Checkbox from "./ui/Checkbox";
import Dot from "./ui/Dot";
import EditButton from "./ui/EditButton";
import TrashButton from "./ui/TrashButton";

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
    mutationFn: updateTodo,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // 기존 데이터 가져오기
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // UI에서 먼저 즉시 반영 (낙관적 업데이트)
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.map((t) => (t.id === updated.id ? { ...t, title: updated.title, completed: updated.completed } : t))
      );

      return { prevTodos };
    },
    onError: (_err, _updated, context) => {
      // 요청 실패 시 원래 데이터로 롤백
      queryClient.setQueryData(["todos"], context?.prevTodos);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // UI에서 즉시 제거
      queryClient.setQueryData(["todos"], prevTodos.filter((t) => t.id !== id));

      return { prevTodos };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    }
  });

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
      <div className="flex min-w-0 flex-1 items-center gap-4 tb:gap-3 mb:gap-2">
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
        {!isEditing && (
          <span className="text-body1 tb:text-body2 mb:text-body3 min-w-[40px] pl-2 text-right text-gray-500 dark:text-gray-400">
            {formatTime(todo.created_at, isMobile)}
          </span>
        )}
        <div className="flex px-2 mb:px-1">
          {isMobile ? (
            isEditing ? (
              <button
                onClick={handleTitleSubmit.bind(null, todo.title)}
                className="text-body3 rounded border bg-gray-100 px-3 py-1 text-gray-500 dark:bg-gray-800 dark:text-gray-300"
              >
                완료
              </button>
            ) : (
              <Dot onEdit={handleEdit} onDelete={handleDelete} />
            )
          ) : (
            <>
              {isEditing ? (
                <button
                  onClick={handleTitleSubmit.bind(null, todo.title)}
                  className="text-body1 tb:text-body2 rounded border bg-gray-100 px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-500"
                >
                  완료
                </button>
              ) : (
                <>
                  <EditButton onClick={handleTextClick} title="수정" />
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
