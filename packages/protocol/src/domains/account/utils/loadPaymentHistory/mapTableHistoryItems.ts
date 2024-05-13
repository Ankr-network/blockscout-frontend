import { EBlockchain, IPaymentHistoryEntity } from 'multirpc-sdk';

import { IPaymentHistoryTableEntity } from 'domains/account/types';
import { isValidTxHash } from 'modules/common/utils/isValidTxHash';
import { isMainnet } from 'modules/common/constants/const';

export const mapTableHistoryItems = (
  initItem: IPaymentHistoryEntity,
): IPaymentHistoryTableEntity => {
  let network = initItem.blockchain;

  // we need it because network field is a const on backend side for ankr tokens
  // with 'eth' value for both app env
  if (!isMainnet && network === EBlockchain.eth) {
    network = EBlockchain.eth_holesky;
  }

  return {
    ...initItem,
    txHash: isValidTxHash(initItem.reason) ? initItem.reason : undefined,
    network,
  };
};
