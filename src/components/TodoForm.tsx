"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/api";
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
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-4 p-4 max-w-[600px] mx-auto flex-nowrap">
      <input
        className="border rounded px-2 py-1 min-w-0 flex-1 outline-none text-xs sm:text-sm md:text-base bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        type="text"
        placeholder="내용을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-400 dark:bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-500 dark:hover:bg-gray-700 text-sm sm:text-base shrink-0"
      >
        <span className="hidden min-[286px]:block">Add +</span>
        <span className="block min-[286px]:hidden">+</span>
      </button>
    </form>
  );
}
