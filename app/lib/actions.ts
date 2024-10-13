'use server';

import { cookies } from 'next/headers';
import { backendAPI } from '../axios-client';
import { redirect } from 'next/navigation';
import { Todo } from './definitions';
import { revalidatePath } from 'next/cache';
import * as yup from 'yup';
import { initializeAxios } from '../axios';
import dayjs from 'dayjs';

export async function register({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    await backendAPI.post('auth/register', {
      username,
      password,
    });
  } catch (error) {
    console.error('Error registering:', error);
    throw new Error('Failed to register');
  }
}

export async function registration(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    await register({ username, password });
  } catch (error: unknown) {
    if ((error as Error)?.message?.includes('Invalid credentials')) {
      return 'Invalid credentials';
    }
    throw error;
  } finally {
    redirect('/login');
  }
}

export async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const { data } = await backendAPI.post('auth/login', {
      username,
      password,
    });

    const { access_token: accessToken } = data;

    if (accessToken)
      cookies().set('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      });
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error('Invalid credentials');
  }
}

export async function signOut() {
  cookies().delete('token');
  redirect('/login');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    await signIn({ username, password });
  } catch (error: unknown) {
    if ((error as Error)?.message?.includes('Invalid credentials')) {
      return 'Invalid credentials';
    }
    throw error;
  } finally {
    redirect('/todo');
  }
}

export async function getTodos(): Promise<Todo[]> {
  try {
    initializeAxios();
    const { data } = await backendAPI.get('todo');

    return data.data || [];
  } catch (error: unknown) {
    console.error('Error fetching todos:', error);
    throw new Error('Failed to fetch todos');
  }
}

export async function editTodo(id: string, data: Todo) {
  try {
    initializeAxios();
    await backendAPI.patch(`todo/${id}`, data);
  } catch (error: unknown) {
    console.error('Error editing todo:', error);
    throw new Error('Failed to edit todo');
  }
}

export async function checkTodos(selected: Todo[]) {
  try {
    const checkedTodos = selected.filter((value) => value.is_done === true);

    initializeAxios();

    await Promise.all(checkedTodos.map((todo) => editTodo(todo.id, todo)));

    revalidatePath('/todo');
  } catch (error: unknown) {
    console.error('Error checking todos:', error);
    throw new Error('Failed to check todos');
  } finally {
    redirect('/todo');
  }
}

const createTodoSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    dueDate: yup.date().required('Due date is required'),
    dueTime: yup.string().required('Due time is required'),
  })
  .required();

export async function createTodo(formData: FormData) {
  const { title, description, dueDate, dueTime } =
    createTodoSchema.validateSync({
      title: formData.get('title'),
      description: formData.get('description'),
      dueDate: formData.get('dueDate'),
      dueTime: formData.get('dueTime'),
    });

  try {
    initializeAxios();
    await backendAPI.post('todo', {
      title,
      description,
      due_date: dayjs(dueDate)
        .hour(Number(dueTime.split(':')[0]))
        .minute(Number(dueTime.split(':')[1]))
        .toISOString(),
    });

    revalidatePath('/todo');
  } catch (error: unknown) {
    console.error('Error creating todo:', error);
    throw new Error('Failed to create todo');
  } finally {
    redirect('/');
  }
}
