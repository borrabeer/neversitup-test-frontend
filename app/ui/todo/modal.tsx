'use client';

import { Todo } from '@/app/lib/definitions';
import dayjs from 'dayjs';

export default function TodoModal({
  todo,
  onClose,
}: {
  todo: Todo;
  onClose: () => void;
}) {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-96 rounded-lg text-primary-content">
        <p className="font-bold text-2xl text-center">{todo.title}</p>
        <span className="flex gap-4 justify-center">
          <p className="text-base font-bold">
            {dayjs(todo.created_at).format('DD MMM')}
          </p>
          <p className="text-base text-secondary-content">
            {dayjs(todo.created_at).format('HH:mm')}
          </p>
        </span>
        <p className="text-base pt-6 text-center">Description</p>
        <div className="py-6">
          <span className="text-secondary-content text-base text-left text-pretty">
            {todo.description}
          </span>
        </div>
        <div className="modal-action justify-center">
          <form method="dialog">
            <button className="btn btn-primary btn-wide" onClick={onClose}>
              Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
