import { EmailErrorMessage } from '../types';
import { isAccountError } from './isAccountError';

const emailMessages = Object.values(EmailErrorMessage);

export const isAccountEmailError = (error: unknown) => isAccountError(error)
  && emailMessages.includes(error.message as EmailErrorMessage);
