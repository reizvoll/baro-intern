"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/api";
import { Todo } from "../types/todo";

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false
  });
}
