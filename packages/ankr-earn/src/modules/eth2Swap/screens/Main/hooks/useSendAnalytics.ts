import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from 'provider';

import { trackSwitchToken } from 'modules/analytics/tracking-actions/trackSwitchToken';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { TOKENS } from 'modules/eth2Swap/const';
import { TSwapOption } from 'modules/eth2Swap/types';

import { calcFeeAndTotal } from '../utils/calcFeeAndTotal';
import { calcValueWithRatio } from '../utils/calcValueWithRatio';

export interface ISendAnalyticsHookArgs {
  swapOption: TSwapOption;
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
  swapOption,
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

    const inputTokenBalance =
      swapOption === Token.aETHb ? fethBalance : aethBalance;

    const switchProportion = !inputTokenBalance.isZero()
      ? new BigNumber(amount).div(inputTokenBalance).multipliedBy(100).toFixed()
      : 'Out of range';

    trackSwitchToken({
      walletType: walletName,
      walletPublicAddress: address,
      inputToken: swapOption,
      inputTokenBalance: inputTokenBalance.toFixed(),
      ouputToken: TOKENS[swapOption],
      inputAmount: amount,
      serviceFee: fee.toFixed(),
      outputAmount: calcValueWithRatio({ total, ratio, swapOption }).toFixed(),
      switchProportion,
    });
  };

  return {
    sendAnalytics,
  };
};
