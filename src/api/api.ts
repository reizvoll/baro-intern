import { Todo } from "../types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// 목록 조회
export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Todo 목록 조회에 실패했습니다.");
  }
  return res.json();
}

// 생성 (C)
export async function createTodo(newTodo: Todo): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo)
  });
  if (!res.ok) {
    throw new Error("Todo 생성에 실패했습니다.");
  }
  return res.json();
}

// 수정 (U)
export async function updateTodo(updatedTodo: Todo): Promise<Todo> {
  const res = await fetch(`${API_URL}/${updatedTodo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo)
  });
  if (!res.ok) {
    throw new Error("Todo 업데이트에 실패했습니다.");
  }
  return res.json();
}

// 삭제 (D)
export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    throw new Error("Todo 삭제에 실패햇습니다.");
  }
}
