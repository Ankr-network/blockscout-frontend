import { t } from 'modules/i18n/utils/intl';

export type RequestStatus =
  | IRequestStatusProgress
  | IRequestStatusFailed
  | IRequestStatusInactive
  | IRequestStatusSuccessful;

export interface IRequestStatusProgress {
  type: RequestStatusType.active;
  progress?: number;
}

export interface IRequestStatusFailed {
  type: RequestStatusType.failed;
  errorCode?: number;
  error?: string;
}

export interface IRequestStatusInactive {
  type: RequestStatusType.inactive;
  message?: string;
}

export interface IRequestStatusSuccessful {
  type: RequestStatusType.successful;
}

export enum RequestStatusType {
  active = 'active',
  failed = 'failed',
  inactive = 'inactive',
  successful = 'successful',
}

export const extractRequestError = (action: any): string => t('error.unknown');

export function requestInProgress(progress?: number): RequestStatus {
  return {
    progress,
    type: RequestStatusType.active,
  };
}

export function requestFailed(
  error?: string,
  errorCode?: number,
): RequestStatus {
  return {
    error,
    errorCode,
    type: RequestStatusType.failed,
  };
}

export function requestInactive(message?: string): RequestStatus {
  if (message === undefined)
    return {
      type: RequestStatusType.inactive,
    };

  return {
    type: RequestStatusType.inactive,
    message,
  };
}

export function requestSuccessful(): RequestStatus {
  return {
    type: RequestStatusType.successful,
  };
}
