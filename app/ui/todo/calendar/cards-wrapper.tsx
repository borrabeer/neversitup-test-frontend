'use server';

import { getTodos } from '@/app/lib/actions';
import TodoCard from '../todo-card';
import dayjs from 'dayjs';

export default async function CalendarTodoCardsWrapper({
  date,
}: {
  date: dayjs.Dayjs;
}) {
  const response = await getTodos();
  const dueDateTasks = response
    .filter((todo) => todo.due_date && dayjs(todo.due_date).isSame(date, 'day'))
    .sort((a, b) => dayjs(a.due_date).diff(dayjs(b.due_date)));

  return (
    <div className="flex w-full max-w-[400px] h-full flex-col gap-2 md:gap-4 overflow-y-scroll pb-32">
      {dueDateTasks.map((task) => (
        <div key={task.id} className="flex gap-4 items-center">
          <p className="text-base text-primary-content">
            {dayjs(task.due_date).format('HH:mm')}
          </p>
          <div className="flex-1">
            <TodoCard todo={task} />
          </div>
        </div>
      ))}
    </div>
  );
}
