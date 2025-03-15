import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../api/api";
import { Todo } from "../types/todo";

// 업데이트 훅
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // 기존 데이터 가져오기
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // UI에서 먼저 즉시 반영 (낙관적 업데이트)
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.map((t) => (t.id === updated.id ? { ...t, title: updated.title, completed: updated.completed } : t))
      );

      return { prevTodos };
    },
    onError: (_err, _updated, context) => {
      // 요청 실패 시 원래 데이터로 롤백
      queryClient.setQueryData(["todos"], context?.prevTodos);
    }
  });
}

// 삭제 훅
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // UI에서 즉시 제거
      queryClient.setQueryData(
        ["todos"],
        prevTodos.filter((t) => t.id !== id)
      );

      return { prevTodos };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    }
  });
}
