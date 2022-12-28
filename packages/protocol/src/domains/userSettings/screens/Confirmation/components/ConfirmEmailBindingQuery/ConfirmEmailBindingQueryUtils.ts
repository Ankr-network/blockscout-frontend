import { AccountErrorCode, IEmailResponse, Web3Address } from 'multirpc-sdk';

import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';

export const checkIsRelatedWallet = (
  data?: IEmailResponse,
  address: Web3Address = '',
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
