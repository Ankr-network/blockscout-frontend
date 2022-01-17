import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED } from 'modules/common/const';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { t } from 'modules/i18n/utils/intl';
import { getAETHCRatio } from 'modules/trading-cockpit/actions/getAETHCRatio';
import { BOND_TOKENS_RATIO } from 'modules/trading-cockpit/const';
import { AvailableTokens } from 'modules/trading-cockpit/types';

export const useFairValue = (
  fromToken: AvailableTokens,
  toToken: AvailableTokens,
) => {
  const dispatchRequest = useDispatchRequest();
  let fairValue = 0;
  let tooltip = '';

  const { data: aETHCRatioData, loading } = useQuery<BigNumber | null>({
    type: getAETHCRatio,
  });

  const aETHcRatio = aETHCRatioData ?? new BigNumber(0);

  if (fromToken === AvailableTokens.aETHc) {
    const ratio = aETHcRatio.isGreaterThan(0)
      ? new BigNumber(1).div(aETHcRatio)
      : new BigNumber(0);

    fairValue = ratio.decimalPlaces(DEFAULT_FIXED).toNumber();
  } else if (toToken === AvailableTokens.aETHc) {
    fairValue = aETHcRatio.decimalPlaces(DEFAULT_FIXED).toNumber();
  } else {
    fairValue = BOND_TOKENS_RATIO;
  }

  if (
    fromToken === AvailableTokens.aETHc ||
    toToken === AvailableTokens.aETHc
  ) {
    tooltip = t('trading-cockpit.fair-value.tooltip-aethc');
  } else {
    tooltip = t('trading-cockpit.fair-value.tooltip');
  }

  useInitEffect(() => {
    if (aETHCRatioData) {
      return;
    }
    dispatchRequest(getAETHCRatio());
  });

  return { fairValue, tooltip, isLoading: loading };
};
