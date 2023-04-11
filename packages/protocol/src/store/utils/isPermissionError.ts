export const PERMISSION_ERROR =
  "You don't have sufficient permission to access this resource" as const;

export type PermissionError = typeof PERMISSION_ERROR;

const errors: PermissionError[] = [PERMISSION_ERROR];

export const isPermissionError = (error: unknown): error is PermissionError =>
  typeof error === 'string' && errors.includes(error as PermissionError);
