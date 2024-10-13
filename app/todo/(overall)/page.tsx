import { Suspense } from 'react';
import TodoCardSkeleton from '../../ui/todo/skeletons/card-skeleton';
import TodoCardsWrapper from '../../ui/todo/cards-wrapper';

export default function TodoPage() {
  return (
    <div className="w-full h-full">
      <p className="text-2xl text-primary-content text-center">TODO</p>
      <div className="w-full h-full flex justify-center mt-6 md:mt-8">
        <Suspense fallback={<TodoCardSkeleton />}>
          <TodoCardsWrapper />
        </Suspense>
      </div>
    </div>
  );
}
