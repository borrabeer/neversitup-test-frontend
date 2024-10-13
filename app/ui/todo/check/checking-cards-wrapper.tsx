'use client';

import { Todo } from '@/app/lib/definitions';
import TodoCard from '../todo-card';
import Link from 'next/link';
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { checkTodos } from '@/app/lib/actions';

export default function CheckingCardsWrapper({ todos }: { todos: Todo[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const checkedTodosWithSelected = checkTodos.bind(
    null,
    todos
      .filter((task) => selected.includes(task.id))
      .map((todo) => {
        todo.is_done = true;
        return todo;
      })
  );

  const handleOnSelect = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <>
      <div className="flex w-full max-w-[400px] h-full flex-col gap-2 md:gap-4 overflow-y-scroll">
        {todos.map((task) => (
          <TodoCard
            isChecking={true}
            onSelect={handleOnSelect}
            todo={task}
            key={task.id}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-4 md:bottom-6 w-full">
        <div className="flex justify-center gap-4 md:gap-6 items-end">
          <Link href="/todo" className="btn btn-error btn-lg btn-circle">
            <XMarkIcon className="w-6 h-6 text-white" />
          </Link>
          <form action={checkedTodosWithSelected}>
            <button type="submit" className="btn btn-success btn-lg btn-circle">
              <CheckIcon className="w-6 h-6 text-white" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
