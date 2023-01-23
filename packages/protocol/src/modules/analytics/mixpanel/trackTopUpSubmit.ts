import BigNumber from 'bignumber.js';
import { Callback } from 'mixpanel-browser';

import { TopUpCurrnecy } from './const';
import { trackEnterBillingFlow } from './utils/trackEnterBillingFlow';

export interface TopUpSubmitTrackingParams {
  address?: string;
  amount: number;
  callback: Callback;
  creditBalance: BigNumber;
  currency: TopUpCurrnecy;
  hasPremium?: boolean;
  isNew: boolean;
  walletName?: string;
}

export const trackTopUpSubmit = ({
  address: wallet_public_address,
  amount: token_amount,
  callback,
  creditBalance,
  currency: token_button,
  hasPremium: billing = false,
  isNew,
  walletName: wallet_type,
}: TopUpSubmitTrackingParams) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [replenishment_balance, top_up_balance] = isNew
    ? [token_amount, undefined]
    : [undefined, creditBalance.plus(token_amount).toNumber()];

  return trackEnterBillingFlow(
    {
      balance: creditBalance.toFormat(),
      billing,
      replenishment_balance,
      token_amount,
      token_button,
      top_up_balance,
      wallet_public_address,
      wallet_type,
    },
    callback,
  );
};
