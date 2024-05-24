import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { LOW_APPROXIMATED_CRYPTO } from 'modules/common/constants/const';

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
  const value = new BigNumber(rawFee);

  const shouldShowSmallestValue = value.isLessThan(LOW_APPROXIMATED_CRYPTO);

  const fee = (shouldShowSmallestValue ? LOW_APPROXIMATED_CRYPTO : value)
    .decimalPlaces(5, BigNumber.ROUND_UP)
    .toFormat();
  const networkName = t(nativeTokenNameMap[network]);

  return t('account.amounts.fee.crypto', {
    fee,
    isApproximate,
    network: networkName,
  });
};
