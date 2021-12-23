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

export interface IRequestStatusSuccessful {
  type: RequestStatusType.successful;
}

export interface IRequestStatusInactive {
  type: RequestStatusType.inactive;
  message?: string;
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

export function isRequestInProgress(status: RequestStatus) {
  return status.type === RequestStatusType.active;
}

export function isRequestFailed(status: RequestStatus) {
  return status.type === RequestStatusType.failed;
}

export function isRequestSuccessful(status: RequestStatus) {
  return status.type === RequestStatusType.successful;
}

export function isRequestInactive(status: RequestStatus) {
  return status.type === RequestStatusType.inactive;
}

export function getRequestError(...statuses: RequestStatus[]) {
  const status = statuses.find(
    status => status.type === RequestStatusType.failed,
  );

  if (status && status.type === RequestStatusType.failed) {
    return status.error ? status.error : 'Error';
  }

  return undefined;
}

export const getRequestsError = getRequestError;
