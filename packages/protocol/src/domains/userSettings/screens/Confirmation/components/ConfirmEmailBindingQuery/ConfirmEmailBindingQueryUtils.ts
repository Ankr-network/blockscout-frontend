import { ResponseData } from '@redux-requests/core';

import { confirmEmailBinding } from 'domains/userSettings/actions/email/confirmEmailBinding';
import { EmailErrorMessage, IEmailResponse, Web3Address } from 'multirpc-sdk';

export const checkIsRelatedWallet = (
  data: ResponseData<typeof confirmEmailBinding>,
  address: Web3Address,
) => data && data.address === address.toLowerCase();

export const processError = (error: any) => {
  const emailError = error?.response?.data?.error as IEmailResponse['error'];

  const isLinkExpired = emailError?.message === EmailErrorMessage.LINK_EXPIRED;

  const isCodeAlreadyUsed =
    emailError?.message === EmailErrorMessage.CODE_ALREADY_USED;

  const isConfirmationCodeNotFound =
    emailError?.message === EmailErrorMessage.CONFIRMATION_CODE_NOT_FOUND;

  return {
    isLinkExpired,
    isCodeAlreadyUsed,
    isConfirmationCodeNotFound,
  };
};
