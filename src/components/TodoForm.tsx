"use client";

import { createTodo } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Todo } from "../types/todo";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  // createTodo API를 호출하는 뮤테이션
  const createMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] }); // 기존 요청 중단

      // 기존 todos 가져오기
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // 새로운 todo를 낙관적으로 추가
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) => [...oldTodos, newTodo]);

      return { prevTodos };
    },
    onError: (_err, _newTodo, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["todos"], context?.prevTodos);
    },
    onSuccess: (newTodo) => {
      // 성공 시 UI에서 바로 반영 (불필요한 refetch 방지)
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) => [...oldTodos, newTodo]);
    }
  });
  
  // 폼 제출 이벤트 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    const todos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
    const maxId = todos.reduce((max, todo) => Math.max(max, parseInt(todo.id, 10)), 0);
    const newId = (maxId + 1).toString();

    createMutation.mutate({
      id: newId,
      title,
      completed: false,
      created_at: new Date().toISOString()
    });

    setTitle(""); // 입력 필드 초기화
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-[600px] flex-nowrap gap-2 p-4 tb:mt-2 tb:p-2">
      <input
        className="text-body1 tb:text-body2 mb:text-body3 min-w-0 flex-1 rounded border bg-white px-2 py-1 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        type="text"
        placeholder="내용을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="text-body1 tb:text-body2 mb:text-body3 shrink-0 rounded-full bg-gray-400 px-3 py-1 text-white hover:bg-gray-500 dark:bg-indigo-700/80 dark:hover:bg-indigo-800/80"
      >
        <span className="block mb:hidden">Add +</span>
        <span className="hidden mb:block">+</span>
      </button>
    </form>
  );
}