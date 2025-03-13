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
    <div className="w-full max-w-2xl mx-auto md:pt-4">
      {/* 탭 버튼 컨테이너 */}
      <div className="relative border-b border-gray-300 flex">
        {[
          { key: "all", label: "전체" },
          { key: "active", label: "진행중" },
          { key: "completed", label: "완료" },
        ].map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as "all" | "completed" | "active")}
            className={`flex-1 text-center py-2 text-sm md:text-base lg:text-lg font-medium transition-colors 
              ${
                filter === tab.key
                  ? "text-black font-bold dark:text-gray-100" // 라이트 모드: 검정 / 다크 모드: 밝은 회색
                  : "text-gray-500 dark:text-gray-400" // 선택 안 된 탭 색상 반전
              }`}
          >
            {tab.label}
          </button>
        ))}
        {/* 활성 탭 밑줄 애니메이션 */}
        <div
          className="absolute bottom-0 h-[3px] bg-black dark:bg-gray-100 transition-all duration-300"
          style={{
            width: "33.333%", // 한 개의 탭 너비 (3개일 경우 33.333%)
            left: filter === "all" ? "0%" : filter === "active" ? "33.333%" : "66.666%",
          }}
        />
      </div>

      {/* 필터링된 투두 리스트 */}
      <ul className="pt-8 space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
