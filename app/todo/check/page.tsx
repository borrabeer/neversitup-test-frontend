import CheckTodoCardsWrapper from '@/app/ui/todo/check/check-cards-wrapper';
import TodoCardSkeleton from '@/app/ui/todo/skeletons/card-skeleton';
import { Bars2Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { Suspense } from 'react';

export default function TodoCheckPage() {
  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className="flex-grow w-full p-4 flex justify-center">
        <div className="w-full h-full">
          <p className="text-2xl text-primary-content text-center">TODO</p>
          <div className="w-full h-full flex justify-center mt-6 md:mt-8">
            <Suspense fallback={<TodoCardSkeleton />}>
              <CheckTodoCardsWrapper />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <Link href="/todo/done" className="btn btn-ghost btn-circle">
          <Bars2Icon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
