'use server';

import { cookies } from 'next/headers';
import { setAuthorizationHeader } from './axios-client';

export const initializeAxios = () => {
  const token = process.env.AUTH_TOKEN || cookies().get('token')?.value;
  setAuthorizationHeader(token);
};
