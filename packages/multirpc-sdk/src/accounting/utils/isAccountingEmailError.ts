import { EmailErrorMessage } from '../email';
import { isAccountingError } from './isAccountingError';

const emailMessages = Object.values(EmailErrorMessage);

export const isAccountingEmailError = (error: unknown) => isAccountingError(error)
  && emailMessages.includes(error.message as EmailErrorMessage);
