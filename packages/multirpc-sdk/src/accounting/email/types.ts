import { Address } from '@ankr.com/provider';

export enum EmailConfirmationStatus {
  PENDING = 'EMAIL_CONFIRMATION_STATUS_PENDING',
  DELETED = 'EMAIL_CONFIRMATION_STATUS_DELETED',
  CONFIRMED = 'EMAIL_CONFIRMATION_STATUS_CONFIRMED',
}

export interface IEmailResponse {
  address: Address;
  email: string;
  status: EmailConfirmationStatus;
  expiresAt: string;
  error?: IEmailResponseError;
}

export interface IEmailResponseError {
  code: 'already_exists' | 'failed_precondition' | 'not_found' | string;
  message: EmailErrorMessage;
  params?: {
    resendableInMs?: number;
  };
}

export enum EmailErrorMessage {
  ADDRESS_PENDING_OTHER_EMAIL_BINDING = "binding with provided address and 'pending' status already exists: data exists already",
  ALREADY_CONFIRMED = 'binding with provided email already exists and confirmed: data exists already',
  CHANGE_INEXISTENT = "binding with provided address in 'pending' status not found: not found",
  CHANGE_WITH_SAME_EMAIL = 'trying to change binding with the same email: nothing todo',
  CODE_ALREADY_USED = 'confirmation code has already been used: wrong state',
  CONFIRMATION_CODE_NOT_FOUND = 'confirmation code not found: not found',
  EMAIL_BINDING_NOT_FOUND = 'not found',
  LINK_EXPIRED = 'confirmation code has already expired: wrong state',
  TOO_MANY_CHANGE_EMAIL_REQUESTS = 'sending confirmation codes too often: wrong state',
  TOO_MANY_RESEND_CONFIRMATION_REQUESTS = 'too many confirmation codes created: wrong state',
}

export interface IGetEmailBindingsResponse {
  bindings: IEmailResponse[];
}

export interface IGetActiveEmailBindingResponse {
  address: string;
  email: string;
}

export interface EmailBindingParams {
  email: string;
  totp?: string;
}