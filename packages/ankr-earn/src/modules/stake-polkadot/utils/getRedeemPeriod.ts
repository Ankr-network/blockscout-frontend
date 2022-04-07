import { REDEEM_PERIOD_DAYS } from '../const';
import { EPolkadotNetworks } from '../types';

export const getRedeemPeriod = (
  currNetwork: EPolkadotNetworks | unknown,
): number => {
  switch (currNetwork) {
    case EPolkadotNetworks.DOT:
      return REDEEM_PERIOD_DAYS.DOT;

    case EPolkadotNetworks.KSM:
      return REDEEM_PERIOD_DAYS.KSM;

    case EPolkadotNetworks.WND:
      return REDEEM_PERIOD_DAYS.WND;

    default:
      return REDEEM_PERIOD_DAYS.DEFAULT;
  }
};
