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
  const [finishEditingTrigger, setFinishEditingTrigger] = useState(false);

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
    setFinishEditingTrigger(false);
  };

  const handleTitleCancel = () => {
    setIsEditing(false);
    setFinishEditingTrigger(false);
  };

  // 클릭하면 수정 모드 진입 (모바일/데스크톱 모두)
  const handleTextClick = () => {
    setIsEditing(true);
  };

  // 수정 모드일 때 EditButton 클릭 시 finishEditingTrigger를 true로 변경하여 제출하도록 함
  const handleEditButtonClick = () => {
    if (isEditing) {
      setFinishEditingTrigger(true);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 tb:p-3 mb:p-2">
      {/* 체크박스 + 제목 또는 수정 인풋 */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Checkbox checked={todo.completed} onToggle={handleToggle} />
        {isEditing ? (
          <TodoEditor
            title={todo.title}
            onSubmit={handleTitleSubmit}
            onCancel={handleTitleCancel}
            finishEditingTrigger={finishEditingTrigger}
          />
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
        <div className="flex gap-2 px-4">
          {isEditing ? (
            <button
              onClick={handleEditButtonClick}
              className="text-body1 tb:text-body2 mb:text-body3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
            >
              수정하기
            </button>
          ) : (
            <EditButton onClick={handleEditButtonClick} title="Edit Todo" />
          )}
          <TrashButton onClick={handleDelete} title="Delete Todo" />
        </div>
      </div>
    </li>
  );
}
