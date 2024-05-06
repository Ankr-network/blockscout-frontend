import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { nativeTokenNameMap } from '../const';

export interface IRenderCryptoFeeParams {
  fee: number;
  isApproximate?: boolean;
  network: EBlockchain;
}

export const renderCryptoFee = ({
  fee: rawFee,
  isApproximate,
  network,
}: IRenderCryptoFeeParams) => {
  const fee = new BigNumber(rawFee).toFixed(5);
  const networkName = t(nativeTokenNameMap[network]);

  return t('account.amounts.fee.crypto', {
    fee,
    isApproximate,
    network: networkName,
  });
};
