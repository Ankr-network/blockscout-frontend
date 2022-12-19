import { AccountErrorCode, Web3Address } from 'multirpc-sdk';
import { ResponseData } from '@redux-requests/core';

import { confirmEmailBinding } from 'domains/userSettings/actions/email/confirmEmailBinding';
import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';

export const checkIsRelatedWallet = (
  data: ResponseData<typeof confirmEmailBinding>,
  address: Web3Address,
) => data && data.address === address.toLowerCase();

const getCode = (error: unknown) =>
  isAxiosAccountError(error) ? error.response?.data.error.code : undefined;

export const processError = (error: any) => {
  const code = getCode(error);

  return {
    isCodeAlreadyUsed: code === AccountErrorCode.WrongState,
    isConfirmationCodeNotFound: code === AccountErrorCode.NotFound,
    isLinkExpired: code === AccountErrorCode.FailedPrecondition,
  };
};
