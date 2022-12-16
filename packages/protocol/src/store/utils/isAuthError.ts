export const TOKEN_AUTH_ERROR =
  'Auth token is not provided or malformed' as const;
export const TOKEN_EXPIRED_ERROR = 'this token has already expired' as const;
export const TOKEN_MALFORMED_ERROR = 'auth token is malformed' as const;

export type AuthError =
  | typeof TOKEN_AUTH_ERROR
  | typeof TOKEN_EXPIRED_ERROR
  | typeof TOKEN_MALFORMED_ERROR;

const errors: AuthError[] = [
  TOKEN_AUTH_ERROR,
  TOKEN_EXPIRED_ERROR,
  TOKEN_MALFORMED_ERROR,
];

export const isAuthError = (error: unknown): error is AuthError =>
  typeof error === 'string' && errors.includes(error as AuthError);
