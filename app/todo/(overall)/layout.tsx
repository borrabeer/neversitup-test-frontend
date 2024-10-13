'use client';

import clsx from 'clsx';
import TodoNavButtons from '../../ui/todo/nav-buttons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bars2Icon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import TodoCreateForm from '@/app/ui/todo/create-form';

export default function TodoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOnClickDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className="drawer drawer-end">
        <input
          id="create_todo_drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          readOnly
        />
        <div className="drawer-content">
          <div className="flex-grow w-full h-full p-4 flex justify-center">
            {children}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="create_todo_drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={handleOnClickDrawer}
          ></label>
          <div className="bg-base-200 text-base-content min-h-full w-80 p-4">
            <TodoCreateForm />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'absolute inset-x-0 bottom-4 md:bottom-6 w-full',
          (pathname === '/todo/done' || isDrawerOpen) && 'hidden'
        )}
      >
        <TodoNavButtons onClickDrawer={handleOnClickDrawer} />
      </div>
      <div
        className={clsx(
          'absolute right-4 top-4',
          (pathname === '/todo/done' || isDrawerOpen) && 'hidden'
        )}
      >
        <Link href="/todo/done" className="btn btn-ghost btn-circle">
          <Bars2Icon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
