import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { ENetwork } from '../types';

export interface IRenderCryptoFeeParams {
  fee: number;
  isApproximate?: boolean;
  network: ENetwork;
}

export const renderCryptoFee = ({
  fee: rawFee,
  isApproximate,
  network,
}: IRenderCryptoFeeParams) => {
  const fee = new BigNumber(rawFee).toFixed(5);

  return t('account.amounts.fee.crypto', { fee, isApproximate, network });
};
