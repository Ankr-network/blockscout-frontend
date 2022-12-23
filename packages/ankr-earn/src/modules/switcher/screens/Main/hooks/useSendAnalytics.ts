import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackSwitchToken } from 'modules/analytics/tracking-actions/trackSwitchToken';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { SWITCHER_FROM_TOKENS } from 'modules/switcher/const';

import { calcValueWithRatio } from '../utils/calcValueWithRatio';

export interface ISendAnalyticsHookArgs {
  from: Token;
  to: Token;
  ratio: BigNumber;
  abBalance?: BigNumber;
  acBalance?: BigNumber;
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
  ratio,
  abBalance = ZERO,
  acBalance = ZERO,
}: ISendAnalyticsHookArgs): ISendAnalyticsHookData => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const isFromToken = useMemo(
    () => SWITCHER_FROM_TOKENS.includes(from),
    [from],
  );

  const sendAnalytics = ({ amount }: ISendAnalyticsEventArg) => {
    const total = new BigNumber(amount);

    const inputTokenBalance = isFromToken ? abBalance : acBalance;

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
      outputAmount: calcValueWithRatio({ total, ratio, from }).toFixed(),
      switchProportion,
    });
  };

  return {
    sendAnalytics,
  };
};
