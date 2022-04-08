import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from 'provider';

import { trackSwitchToken } from 'modules/analytics/tracking-actions/trackSwitchToken';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { calcFeeAndTotal } from '../utils/calcFeeAndTotal';
import { calcValueWithRatio } from '../utils/calcValueWithRatio';

export interface ISendAnalyticsHookArgs {
  from: Token;
  to: Token;
  feeBasisPoints: number;
  ratio: BigNumber;
  fethBalance?: BigNumber;
  aethBalance?: BigNumber;
}

export interface ISendAnalyticsEventArg {
  amount: string;
}

export interface ISendAnalyticsHookData {
  sendAnalytics(data: ISendAnalyticsEventArg): void;
}

export const useSendAnalytics = ({
  from,
  to,
  feeBasisPoints,
  ratio,
  fethBalance = ZERO,
  aethBalance = ZERO,
}: ISendAnalyticsHookArgs): ISendAnalyticsHookData => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = ({ amount }: ISendAnalyticsEventArg) => {
    const { fee, total } = calcFeeAndTotal({
      amount: new BigNumber(amount),
      feeBP: new BigNumber(feeBasisPoints),
    });

    const inputTokenBalance = from === Token.aETHb ? fethBalance : aethBalance;

    const switchProportion = !inputTokenBalance.isZero()
      ? new BigNumber(amount).div(inputTokenBalance).multipliedBy(100).toFixed()
      : 'Out of range';

    trackSwitchToken({
      walletType: walletName,
      walletPublicAddress: address,
      inputToken: from,
      inputTokenBalance: inputTokenBalance.toFixed(),
      ouputToken: to,
      inputAmount: amount,
      serviceFee: fee.toFixed(),
      outputAmount: calcValueWithRatio({ total, ratio, from }).toFixed(),
      switchProportion,
    });
  };

  return {
    sendAnalytics,
  };
};
