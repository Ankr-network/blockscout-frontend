import { useQuery } from '@redux-requests/react';

import {
  getTxReceiptRequestKey,
  getTxReceipt,
} from 'modules/bridge/actions/getTxReceipt';

export interface IUseTxReceipt {
  isSuccessful: boolean;
  isLoading: boolean;
  actionName: string;
}

export const useTxReceipt = (actionName: string): IUseTxReceipt => {
  const receiptRequestKey = getTxReceiptRequestKey(actionName);

  const {
    data: receipt,
    loading: isReceiptLoading,
    error: receiptError,
    pristine,
  } = useQuery({
    type: getTxReceipt,
    requestKey: receiptRequestKey,
  });

  const isLoading =
    (!receipt && !receiptError && !pristine) || isReceiptLoading;

  const isSuccessful = receipt?.status === true;

  return {
    isSuccessful,
    isLoading,
    actionName: `${getTxReceipt.toString()}${receiptRequestKey}`,
  };
};
