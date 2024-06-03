import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { IFeeDetails } from '../types';
import { nativeTokenNameMap } from '../const';
import { processLowFeeDetails } from './processLowFeeDetails';
import { roundCryptoFee } from './roundCryptoFee';

export interface IRenderCryptoFeeParams {
  fee: number;
  isApproximate?: boolean;
  network: EBlockchain;
}

export const renderCryptoFee = ({
  fee: feeCrypto,
  isApproximate,
  network,
}: IRenderCryptoFeeParams) => {
  const feeDetails: IFeeDetails = { feeCrypto, feeUSD: 0 };

  const { feeCrypto: feeCryptoProcessed } = processLowFeeDetails({
    feeDetails,
  });

  const fee = roundCryptoFee({ feeCrypto: feeCryptoProcessed });

  const networkName = t(nativeTokenNameMap[network]);

  return t('account.amounts.fee.crypto', {
    fee,
    isApproximate,
    network: networkName,
  });
};
