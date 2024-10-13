'use server';

import { getTodos } from '@/app/lib/actions';
import CheckingCardsWrapper from './checking-cards-wrapper';

export default async function CheckTodoCardsWrapper() {
  const response = await getTodos();
  const pendingTasks = response.filter((todo) => !todo.is_done);

  return <CheckingCardsWrapper todos={pendingTasks} />;
}
