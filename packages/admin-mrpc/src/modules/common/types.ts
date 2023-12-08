import { SerializedError } from '@reduxjs/toolkit';

export interface IMutationResponse<T> {
  data?: T;
  error?: SerializedError;
}
