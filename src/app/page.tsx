import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="pt-10 max-w-[1200px] mx-auto  px-4 md:px-6">
      <h1 className="text-2xl font-bold text-center">TODO 리스트</h1>
      <TodoForm />
      <TodoList />
    </main>
  )
}
