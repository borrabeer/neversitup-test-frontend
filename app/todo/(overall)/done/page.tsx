'use server';

import { signOut } from '@/app/lib/actions';
import DoneCardsWrapper from '@/app/ui/todo/done/done-cards-wrapper';
import TodoCardSkeleton from '@/app/ui/todo/skeletons/card-skeleton';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function TodoDonePage() {
  return (
    <div className="relative w-full">
      <p className="text-2xl text-primary-content text-center">DONE TASKS</p>
      <div className="w-full h-full flex justify-center mt-6 md:mt-8">
        <Suspense fallback={<TodoCardSkeleton />}>
          <DoneCardsWrapper />
        </Suspense>
      </div>
      <div className="absolute bottom-4 md:bottom-6 inset-x-0 flex justify-center">
        <form action={signOut}>
          <button className="btn btn-error btn-md btn-wide">Logout</button>
        </form>
      </div>
      <div className="absolute left-0 top-0">
        <Link href="/todo" className="btn btn-ghost btn-circle">
          <ArrowLeftIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
