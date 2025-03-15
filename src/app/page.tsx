import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-10 md:px-6">
      <h1 className="text-center text-2xl font-bold">TODO 리스트</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}
