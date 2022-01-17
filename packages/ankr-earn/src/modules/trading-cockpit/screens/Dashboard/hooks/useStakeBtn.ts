import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { AvailableTokens } from 'modules/trading-cockpit/types';

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
          href: defaultHref,
          disabled: true,
        },
        [AvailableTokens.aETHb]: {
          btnText: unstakeText,
          href: defaultHref,
          disabled: true,
          tooltip: t('trading-cockpit.eth-unstake-err'),
        },
        [AvailableTokens.aETHc]: {
          btnText: unstakeText,
          href: defaultHref,
          disabled: true,
          tooltip: t('trading-cockpit.eth-unstake-err'),
        },
        [AvailableTokens.AVAX]: {
          btnText: stakeText,
          href: defaultHref,
          disabled: true,
        },
        [AvailableTokens.aAVAXb]: {
          btnText: unstakeText,
          href: defaultHref,
          disabled: true,
        },
      };
    }, []);

  return btnPropsByToken[token];
};
