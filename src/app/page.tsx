import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-10 tb:px-6">
      <h1 className="text-title1 mb:text-title2 text-center font-bold">TODO 리스트</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}
