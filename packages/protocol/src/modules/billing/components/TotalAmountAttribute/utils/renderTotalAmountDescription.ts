import { ECurrency, ENetwork } from 'modules/billing/types';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';
import { renderCryptoFee } from 'modules/billing/utils/renderCryptoFee';

import { getTotalFee } from './getTotalFee';

export interface IRenderTotalAmountDescriptionParams {
  amount: number;
  currency: ECurrency;
  approvalFee?: number;
  depositFee: number;
  network: ENetwork;
}

export const renderTotalAmountDescription = ({
  amount,
  approvalFee,
  currency,
  depositFee,
  network,
}: IRenderTotalAmountDescriptionParams) => {
  const cryptoAmount = renderCryptoAmount({ amount, currency });
  const fee = getTotalFee({ approvalFee, depositFee });
  const cryptoFee = renderCryptoFee({ fee, network });

  return `${cryptoAmount} + ${cryptoFee}`;
};
