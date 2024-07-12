import { IHandledQueryError } from 'store/queries/types';

// detects error that is explicitly returned from queryFn
export const isHandledQueryError = (
  exception: unknown,
): exception is IHandledQueryError =>
  typeof exception === 'object' &&
  exception !== null &&
  'error' in exception &&
  'isUnhandledError' in exception &&
  typeof exception.isUnhandledError === 'boolean' &&
  !exception.isUnhandledError;
