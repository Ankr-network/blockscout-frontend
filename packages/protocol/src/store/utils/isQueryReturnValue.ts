import { QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes';

export const isQueryReturnValue = (value: unknown): value is QueryReturnValue =>
  typeof value === 'object' && value !== null && 'error' in value;
