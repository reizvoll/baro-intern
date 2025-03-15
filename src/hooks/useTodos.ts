"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/api";
import { Todo } from "../types/todo";

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false
  });
}
