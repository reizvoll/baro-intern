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
      created_at: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-[600px] flex-nowrap gap-2 p-4 tb:p-2 tb:mt-2">
      <input
        className="text-body1 tb:text-body2 mb:text-body3 min-w-0 flex-1 rounded border bg-white px-2 py-1 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        type="text"
        placeholder="내용을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="text-body1 tb:text-body2 mb:text-body3 shrink-0 rounded-full bg-gray-400 px-3 py-1 text-white hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        <span>Add +</span>
      </button>
    </form>
  );
}
