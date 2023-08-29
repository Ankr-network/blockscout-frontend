import { AccountingErrorCode, IEmailResponse, Web3Address } from 'multirpc-sdk';

import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';

export const checkIsRelatedWallet = (
  data?: IEmailResponse,
  address: Web3Address = '',
) => data && data.address === address.toLowerCase();

const getCode = (error: unknown) =>
  isAxiosAccountingError(error) ? error.response?.data.error.code : undefined;

export const processError = (error: any) => {
  const code = getCode(error);

  return {
    isCodeAlreadyUsed: code === AccountingErrorCode.WrongState,
    isConfirmationCodeNotFound: code === AccountingErrorCode.NotFound,
    isLinkExpired: code === AccountingErrorCode.FailedPrecondition,
  };
};
