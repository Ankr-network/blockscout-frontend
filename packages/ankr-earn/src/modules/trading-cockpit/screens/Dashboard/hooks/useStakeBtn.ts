import { STAKEFI_LINK } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as StakeAvalancheRoutes } from 'modules/stake-avax/Routes';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { RoutesConfig as StakeFantomRoutes } from 'modules/stake-fantom/Routes';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { AvailableTokens } from 'modules/trading-cockpit/types';

const STAKEFI_EHT_STAKE_URL = `${STAKEFI_LINK}/ETH`;

interface IUseStakeBtn {
  href: string;
  disabled: boolean;
  btnText: string;
  tooltip?: string;
}

export const useStakeBtn = (token: AvailableTokens): IUseStakeBtn => {
  const btnPropsByToken: Record<AvailableTokens, IUseStakeBtn> =
    useLocaleMemo(() => {
      const stakeText = t('trading-cockpit.stake-btn');
      const unstakeText = t('trading-cockpit.unstake-btn');
      const defaultHref = StakeRoutes.main.generatePath();

      return {
        [AvailableTokens.BNB]: {
          btnText: stakeText,
          href: StakeBinanceRoutes.stake.generatePath(),
          disabled: false,
        },
        [AvailableTokens.aBNBb]: {
          btnText: unstakeText,
          href: StakeBinanceRoutes.unstake.generatePath(),
          disabled: false,
        },
        [AvailableTokens.MATIC]: {
          btnText: stakeText,
          href: StakePolygonRoutes.stake.generatePath(),
          disabled: false,
        },
        [AvailableTokens.aMATICb]: {
          btnText: unstakeText,
          href: StakePolygonRoutes.unstake.generatePath(),
          disabled: false,
        },
        [AvailableTokens.ETH]: {
          btnText: stakeText,
          href: STAKEFI_EHT_STAKE_URL,
          disabled: false,
        },
        [AvailableTokens.aETHb]: {
          btnText: unstakeText,
          href: defaultHref,
          disabled: true,
          tooltip: t('stake-ethereum.unstake-tooltip'),
        },
        [AvailableTokens.aETHc]: {
          btnText: unstakeText,
          href: defaultHref,
          disabled: true,
          tooltip: t('stake-ethereum.unstake-tooltip'),
        },
        [AvailableTokens.AVAX]: {
          btnText: stakeText,
          href: StakeAvalancheRoutes.stake.generatePath(),
          disabled: false,
        },
        [AvailableTokens.aAVAXb]: {
          btnText: unstakeText,
          href: StakeAvalancheRoutes.unstake.generatePath(),
          disabled: false,
        },
        [AvailableTokens.FTM]: {
          btnText: stakeText,
          href: StakeFantomRoutes.stake.generatePath(),
          disabled: false,
        },
        [AvailableTokens.aFTMb]: {
          btnText: unstakeText,
          href: StakeFantomRoutes.unstake.generatePath(),
          disabled: false,
        },
      };
    }, []);

  return btnPropsByToken[token];
};
