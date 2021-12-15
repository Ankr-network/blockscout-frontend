import { t } from 'modules/i18n/utils/intl';

export enum RequestStatusType {
  active = 'active',
  failed = 'failed',
  inactive = 'inactive',
  successful = 'successful',
}
export interface IRequestStatusProgress {
  type: RequestStatusType.active;
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

export type RequestStatus =
  | IRequestStatusProgress
  | IRequestStatusFailed
  | IRequestStatusInactive
  | IRequestStatusSuccessful;

export const extractRequestError = (action: any): string => {
  return t('errors.unknown');
};

export function requestInProgress(progress?: number) {
  return { progress, type: RequestStatusType.active } as RequestStatus;
}

export function requestFailed(error?: string, errorCode?: number) {
  return { error, errorCode, type: RequestStatusType.failed } as RequestStatus;
}

const REQUEST_SUCCESSFUL = { type: RequestStatusType.successful };
export function requestSuccessful() {
  return REQUEST_SUCCESSFUL as RequestStatus;
}

const REQUEST_INACTIVE_EMPTY = {
  type: RequestStatusType.inactive,
} as RequestStatus;

export function requestInactive(message?: string) {
  if (message === undefined) return REQUEST_INACTIVE_EMPTY;
  return { type: RequestStatusType.inactive, message } as RequestStatus;
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
