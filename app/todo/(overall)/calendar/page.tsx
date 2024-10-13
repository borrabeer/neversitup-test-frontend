import CalendarHeader from '@/app/ui/todo/calendar/calendar-header';
import CalendarTodoCardsWrapper from '@/app/ui/todo/calendar/cards-wrapper';
import TodoCardSkeleton from '@/app/ui/todo/skeletons/card-skeleton';
import dayjs from 'dayjs';
import { Suspense } from 'react';

export default function TodoCalendarPage({
  searchParams,
}: {
  searchParams?: { date?: string };
}) {
  const today = dayjs(searchParams?.date || new Date());

  return (
    <div className="w-full h-full">
      <p className="text-2xl text-primary-content text-center">
        {today.format('MMM YYYY')}
      </p>
      <div className="w-full mt-6 md:mt-8 -mx-4 md:-mx-6">
        <CalendarHeader />
      </div>
      <div className="w-full h-full flex justify-center mt-6 md:mt-8">
        <Suspense fallback={<TodoCardSkeleton />}>
          <CalendarTodoCardsWrapper date={today} />
        </Suspense>
      </div>
    </div>
  );
}
