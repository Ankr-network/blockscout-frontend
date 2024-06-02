import { EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/payments/types';
import { renderCryptoAmount } from 'modules/payments/utils/renderCryptoAmount';
import { renderCryptoFee } from 'modules/payments/utils/renderCryptoFee';

import { getTotalFee } from './getTotalFee';

export interface IRenderTotalAmountDescriptionParams {
  allowanceFee?: number;
  amount: number;
  currency: ECurrency;
  depositFee: number;
  network: EBlockchain;
}

export const renderTotalAmountDescription = ({
  allowanceFee,
  amount,
  currency,
  depositFee,
  network,
}: IRenderTotalAmountDescriptionParams) => {
  const cryptoAmount = renderCryptoAmount({ amount, currency });
  const fee = getTotalFee({ allowanceFee, depositFee });
  const cryptoFee = renderCryptoFee({ fee, network });

  return `${cryptoAmount} + ${cryptoFee}`;
};
