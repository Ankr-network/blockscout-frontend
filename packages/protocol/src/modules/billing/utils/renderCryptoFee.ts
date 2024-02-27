import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { ENetwork } from '../types';

export interface IRenderCryptoFeeParams {
  fee: number;
  network: ENetwork;
}

export const renderCryptoFee = ({
  fee: rawFee,
  network,
}: IRenderCryptoFeeParams) => {
  const fee = new BigNumber(rawFee).toFixed(5);

  return t('account.amounts.fee.crypto', { fee, network });
};
