import BigNumber from 'bignumber.js';
import { Callback } from 'mixpanel-browser';

import { MixpanelEvent, TopUpCurrency } from './const';
import { TopUpSubmitEventProps } from './types';
import { track } from './utils/track';

export interface TopUpSubmitTrackingParams {
  address?: string;
  amount: number;
  callback: Callback;
  creditBalance: BigNumber;
  currency: TopUpCurrency;
  hasPremium?: boolean;
  isNew: boolean;
  walletName?: string;
}

const event = MixpanelEvent.ENTER_BILLING_FLOW;

export const trackTopUpSubmit = ({
  address: wallet_public_address,
  amount: token_amount,
  callback: options,
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

  return track<TopUpSubmitEventProps>({
    event,
    options,
    properties: {
      balance: creditBalance.toFormat(),
      billing,
      replenishment_balance,
      token_amount,
      token_button,
      top_up_balance,
      wallet_public_address,
      wallet_type,
    },
  });
};
