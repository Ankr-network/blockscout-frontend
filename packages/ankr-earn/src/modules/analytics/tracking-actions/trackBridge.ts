import BigNumber from 'bignumber.js';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IBridgeTokensArgs {
  address?: string;
  walletType?: string;
  token: string;
  amount: BigNumber;
  balance: BigNumber;
  from?: string;
  to?: string;
}

interface IBridgeTokensEvent extends IBaseWaletData {
  inputToken: string;
  inputTokenBalance: string;
  outputToken: string;
  inputAmount: string;
  outputAmount: string;
  bridgeProportion: string;
  fromChain?: string;
  toChain?: string;
}

export const trackBridge = async ({
  address,
  walletType,
  token,
  amount,
  balance,
  from,
  to,
}: IBridgeTokensArgs): Promise<void> => {
  const readyAmount = amount.toFixed();
  const bridgeProportion = !balance.isZero()
    ? amount.dividedBy(balance).multipliedBy(100).toFixed()
    : '';

  const properties: IBridgeTokensEvent = {
    walletType,
    walletPublicAddress: address,
    inputToken: token,
    inputTokenBalance: balance.toFixed(),
    outputToken: token,
    inputAmount: readyAmount,
    outputAmount: readyAmount,
    bridgeProportion,
    fromChain: from,
    toChain: to,
  };

  trackAnalyticEvent({ event: AnalyticsEvents.EnterBridgeFlow, properties });
};
