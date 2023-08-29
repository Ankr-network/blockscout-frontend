export interface AccountingError {
  code: AccountingErrorCode;
  message: string;
}

export enum AccountingErrorCode {
  Aborted = 'aborted',
  AlreadyExists = 'already_exists',
  DatabaseError = 'database_error',
  FailedPrecondition = 'failed_precondition',
  InternalError = 'internal_error',
  InvalidArgument = 'invalid_argument',
  NotFound = 'not_found',
  NothingTodo = 'nothing_todo',
  Unavailable = 'unavailable',
  WrongFormat = 'wrong_format',
  WrongState = 'wrong_state',
  TwoFARequired = '2fa_required',
  TwoFAWrong = '2fa_wrong',
  InsufficientBalance = 'insufficient_balance'
}

export interface AccountingErrorResponse {
  error: AccountingError;
}

export enum PermissionErrorCode {
  Permission = 'permission',
}

export interface PermissionError {
  code: PermissionErrorCode;
  message: string;
}

export interface PermissionErrorResponse {
  error: PermissionError;
}

export enum PublicStatsInterval {
  HOUR = '1h',
  DAY = '24h',
  WEEK = '7d',
  MONTH = '30d',
}
