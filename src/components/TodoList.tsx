"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function TodoList() {
  // 필터 상태: all, completed, active
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  // 커스텀 훅을 통해 투두 목록을 가져옵니다.
  const { data: todos, isPending, isError } = useTodos();

  if (isPending)
    return (
      <div className="mt-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!todos) return null;

  //필터별 개수 계산
  const totalCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  // 선택된 필터에 따라 목록 필터링
  let filteredTodos = todos;
  if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-4 tb:p-2">
      {/* 탭 버튼 컨테이너 */}
      <div className="relative flex border-b border-gray-300">
        {[
          { key: "all", label: "전체", count: totalCount },
          { key: "active", label: "진행 중", count: activeCount },
          { key: "completed", label: "완료", count: completedCount }
        ].map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as "all" | "completed" | "active")}
            className={`flex-1 py-2 text-center text-body1 transition-colors tb:text-body2 mb:text-body3 ${
              filter === tab.key
                ? "font-bold text-black dark:text-gray-100" // 라이트 모드: 검정 / 다크 모드: 밝은 회색
                : "text-gray-500 dark:text-gray-400" // 선택 안 된 탭 색상 반전
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
        {/* 활성 탭 밑줄 애니메이션 */}
        <div
          className="absolute bottom-0 h-[3px] bg-black transition-all duration-300 dark:bg-gray-100"
          style={{
            width: "33.333%", // 한 개의 탭 너비 (3개일 경우 33.333%)
            left: filter === "all" ? "0%" : filter === "active" ? "33.333%" : "66.666%"
          }}
        />
      </div>

      {/* 필터링된 투두 리스트 */}
      <ul className="pt-6 mb:pt-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
