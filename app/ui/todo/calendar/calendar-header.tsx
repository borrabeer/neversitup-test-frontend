'use client';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function CalendarHeader() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const today = dayjs(params.get('date') || new Date());

  const days = [
    today.subtract(3, 'days'),
    today.subtract(2, 'days'),
    today.subtract(1, 'days'),
    today,
    today.add(1, 'days'),
    today.add(2, 'days'),
    today.add(3, 'days'),
  ];

  const handleOnSelect = (day: dayjs.Dayjs) => {
    params.set('date', day.format('YYYY-MM-DD'));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-screen overflow-x-hidden">
      <div className="flex gap-0 flex-nowrap items-center">
        {days.map((day) => (
          <button
            key={day.format('YYYY-MM-DD')}
            className={clsx(
              'btn rounded-sm h-20 flex flex-col gap-0 flex-1 px-0',
              day.isSame(today, 'day') && 'btn-primary h-28'
            )}
            onClick={() => handleOnSelect(day)}
          >
            <p className="text-base text-primary-content text-center">
              {day.format('D')}
            </p>
            <p className="text-sm text-primary-content text-center">
              {day.format('ddd')}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
