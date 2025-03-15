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
    mutationFn: (newTodo: Todo) => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
  // 폼 제출 이벤트 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    // 현재 todos 목록 가져와 배열로 처리 (없으면 빈 배열이 나오게끔)
    const todos = (queryClient.getQueryData<Todo[]>(["todos"]) ?? []) as Todo[];
    const maxId = todos.reduce((max: number, todo: Todo) => {
      const numId = parseInt(todo.id, 10);
      return numId > max ? numId : max;
    }, 0);
    const newId = (maxId + 1).toString();

    createMutation.mutate({
      id: newId,
      title,
      completed: false,
      created_at: new Date().toISOString()
    });
    setTitle(""); //초기화 설정
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