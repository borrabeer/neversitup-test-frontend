'use client';

import { Todo } from '@/app/lib/definitions';
import { CheckIcon, RectangleStackIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import TodoModal from './modal';
import { useState } from 'react';

export default function TodoCard({
  todo,
  onSelect,
  isChecking = false,
}: {
  todo: Todo;
  onSelect?: (id: string) => void;
  isChecking?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    if (isChecking) return;
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={clsx(
          'card card-compact bg-secondary shadow relative rounded-lg',
          !isChecking && 'cursor-pointer'
        )}
        onClick={handleOnClick}
      >
        <div className="card-body">
          <div className="w-full h-full flex justify-between items-center">
            <RectangleStackIcon className="w-6 h-6" />
            <p className="text-xl text-primary-content font-bold text-center">
              {todo.title}
            </p>
            {isChecking && onSelect ? (
              <>
                <input
                  type="checkbox"
                  className="checkbox checkbox-lg checkbox-primary border-2 bg-white"
                  onChange={() => onSelect(todo.id)}
                />
              </>
            ) : (
              <span className="text-right">
                <p className="text-lg text-primary-content font-bold">
                  {dayjs(todo.created_at).format('DD MMM')}
                </p>
                <p className="text-sm text-primary-content">
                  {dayjs(todo.created_at).format('hh:mm A')}
                </p>
              </span>
            )}
          </div>
        </div>
        <div
          className={clsx(
            'absolute top-1 left-1',
            todo.is_done && !isChecking ? 'block' : 'hidden'
          )}
        >
          <CheckIcon className="w-4 h-4" />
        </div>
      </div>
      {isOpen && <TodoModal todo={todo} onClose={() => setIsOpen(false)} />}
    </>
  );
}
