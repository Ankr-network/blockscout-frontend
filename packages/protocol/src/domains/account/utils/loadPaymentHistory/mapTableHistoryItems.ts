import { IPaymentHistoryEntity } from 'multirpc-sdk';

import { IPaymentHistoryTableEntity } from 'domains/account/types';
import { isValidTxHash } from 'modules/common/utils/isValidTxHash';

export const mapTableHistoryItems = (
  initItem: IPaymentHistoryEntity,
): IPaymentHistoryTableEntity => {
  return {
    ...initItem,
    txHash: isValidTxHash(initItem.reason) ? initItem.reason : undefined,
  };
};
