'use server';

import { getTodos } from '@/app/lib/actions';
import TodoCard from './todo-card';

export default async function TodoCardsWrapper() {
  const response = await getTodos();
  const pendingTasks = response
    .filter((todo) => !todo.is_done)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="flex w-full max-w-[400px] h-screen flex-col gap-2 md:gap-4 overflow-y-auto pb-32">
      {pendingTasks.map((task) => (
        <TodoCard todo={task} key={task.id} />
      ))}
    </div>
  );
}
