'use client';

import {
  Bars3Icon,
  CalendarIcon,
  CheckIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TodoNavButtons({
  onClickDrawer,
}: {
  onClickDrawer: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex justify-center gap-4 md:gap-6 items-end">
      <Link href="/todo/check" className="btn btn-primary btn-md btn-circle">
        <CheckIcon className="w-6 h-6" />
      </Link>
      {pathname === '/todo/calendar' ? (
        <Link href="/todo" className="btn btn-primary btn-lg btn-circle">
          <Bars3Icon className="w-6 h-6" />
        </Link>
      ) : (
        <Link
          href="/todo/calendar"
          className="btn btn-primary btn-lg btn-circle"
        >
          <CalendarIcon className="w-6 h-6" />
        </Link>
      )}
      <label
        htmlFor="create_todo_drawer"
        className="btn btn-primary btn-md btn-circle drawer-button"
        onClick={onClickDrawer}
      >
        <PlusIcon className="w-6 h-6" />
      </label>
    </div>
  );
}
