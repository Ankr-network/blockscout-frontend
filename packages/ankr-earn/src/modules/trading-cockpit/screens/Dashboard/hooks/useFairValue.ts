import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { t } from 'modules/i18n/utils/intl';
import { getAETHCRatio } from 'modules/trading-cockpit/actions/getAETHCRatio';
import {
  AETHB_FAIR_VALUE_RATIO,
  AMATICB_FAIR_VALUE_RATIO,
} from 'modules/trading-cockpit/const';
import { AvailableTokens } from 'modules/trading-cockpit/types';

export const useFairValue = (
  fromToken: AvailableTokens,
  toToken: AvailableTokens,
) => {
  const dispatchRequest = useDispatchRequest();
  let fairValue = 0;
  let tooltip = t('trading-cockpit.fair-value.tooltip');

  const { data: aETHCRatioData, loading } = useQuery<BigNumber | null>({
    type: getAETHCRatio,
  });

  const aETHcRatio = aETHCRatioData ?? new BigNumber(0);

  if (
    fromToken === AvailableTokens.aETHb ||
    toToken === AvailableTokens.aETHb
  ) {
    fairValue = AETHB_FAIR_VALUE_RATIO;
  } else if (
    fromToken === AvailableTokens.aMATICb ||
    toToken === AvailableTokens.aMATICb
  ) {
    fairValue = AMATICB_FAIR_VALUE_RATIO;
  } else if (fromToken === AvailableTokens.aETHc) {
    const ratio = aETHcRatio.isGreaterThan(0)
      ? new BigNumber(1).div(aETHcRatio)
      : new BigNumber(0);

    fairValue = ratio.decimalPlaces(DEFAULT_ROUNDING).toNumber();
  } else if (toToken === AvailableTokens.aETHc) {
    fairValue = aETHcRatio.decimalPlaces(DEFAULT_ROUNDING).toNumber();
  }

  if (
    fromToken === AvailableTokens.aETHc ||
    toToken === AvailableTokens.aETHc
  ) {
    tooltip = t('trading-cockpit.fair-value.tooltip-aethc');
  }

  useInitEffect(() => {
    if (aETHCRatioData) {
      return;
    }
    dispatchRequest(getAETHCRatio());
  });

  return { fairValue, tooltip, isLoading: loading };
};
