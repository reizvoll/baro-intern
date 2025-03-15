"use client";

import { createTodo } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Todo } from "../types/todo";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [listid, setListId] = useState(0);
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
    const id = (listid + 1).toString();
    setListId(listid + 1);
    createMutation.mutate({
      id: id,
      title,
      completed: false,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-[600px] flex-nowrap gap-2 p-4 sm:gap-4">
      <input
        className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs outline-none sm:text-sm md:text-base dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        type="text"
        placeholder="내용을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-gray-400 px-3 py-1 text-sm text-white hover:bg-gray-500 sm:text-base dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        <span className="min-[286px]:block hidden">Add +</span>
        <span className="min-[286px]:hidden block">+</span>
      </button>
    </form>
  );
}
