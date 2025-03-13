import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">TODO 리스트</h1>
      <TodoForm />
      <TodoList />
    </main>
  )
}
