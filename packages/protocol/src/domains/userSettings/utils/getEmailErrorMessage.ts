import { t } from '@ankr.com/common';
import {
  EmailErrorMessage,
  IEmailResponse,
  IEmailResponseError,
} from 'multirpc-sdk';

type EmailValue = (args: {
  email?: string;
  params?: IEmailResponseError['params'];
}) => string;

const emailErrors: Partial<Record<EmailErrorMessage, EmailValue>> = {
  [EmailErrorMessage.ADDRESS_PENDING_OTHER_EMAIL_BINDING]: () =>
    t('user-settings.errors.address-pending-other-email-binding'),

  [EmailErrorMessage.CHANGE_WITH_SAME_EMAIL]: () =>
    t('user-settings.errors.change-with-same-email'),

  [EmailErrorMessage.CHANGE_INEXISTENT]: () =>
    t('user-settings.errors.change-inexistent'),

  [EmailErrorMessage.TOO_MANY_CHANGE_EMAIL_REQUESTS]: ({
    params: { resendableInMs = 0 } = {},
  }) => {
    const minutes = Math.ceil(resendableInMs / 1000 / 60);

    return t('user-settings.errors.too-many-change-email-requests', {
      minutes,
      plural: minutes > 1 ? t('user-settings.errors.plural') : '',
    });
  },

  [EmailErrorMessage.TOO_MANY_RESEND_CONFIRMATION_REQUESTS]: ({
    params: { resendableInMs = 0 } = {},
  }) => {
    const minutes = Math.ceil(resendableInMs / 1000 / 60);

    return t('user-settings.errors.too-many-resend-confirmation-requests', {
      minutes,
      plural: minutes > 1 ? t('user-settings.errors.plural') : '',
    });
  },

  [EmailErrorMessage.ALREADY_CONFIRMED]: ({
    email = t('user-settings.common.email-value-fallback'),
  }) => t('user-settings.errors.already-confirmed', { email }),
};

interface IGetEmailErrorMessageParams {
  email?: string;
  error?: any;
}

export const getEmailErrorMessage = ({
  email,
  error,
}: IGetEmailErrorMessageParams): string | undefined => {
  const emailError = error?.response?.data?.error as IEmailResponse['error'];

  if (emailError) {
    if (emailErrors[emailError.message])
      return (emailErrors[emailError.message] as EmailValue)({
        email,
        params: emailError.params,
      });

    return emailError.message;
  }

  return undefined;
};
