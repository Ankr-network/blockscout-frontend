import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { INavigationLinkProps } from 'modules/common/components/NavigationLink';
import { isMainnet } from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as PolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { useMemo } from 'react';

interface INavItem extends Omit<INavigationLinkProps, 'className'> {}

export const useNavigationItems = () => {
  const links: Record<string, INavItem> = useLocaleMemo(
    () => ({
      dashboard: {
        label: t('main-navigation.dashboard'),
        href: DashboardRoutes.dashboard.generatePath(),
      },
      stake: {
        label: t('main-navigation.stake'),
        href: StakeRoutes.main.generatePath(),
      },
      parachain: {
        label: t('main-navigation.parachain'),
        href: PolkadotSlotAuctionRoutes.crowdloans.generatePath(
          isMainnet
            ? EParachainPolkadotNetwork.DOT.toLowerCase()
            : EParachainPolkadotNetwork.WND.toLowerCase(),
        ),
      },
      boost: {
        label: t('main-navigation.boost'),
        href: BoostRoutes.tradingCockpit.generatePath(),
      },
      docs: {
        label: t('main-navigation.docs'),
        href: '/docs', // TODO: add proper route
      },
      litepaper: {
        label: t('main-navigation.litepaper'),
        href: 'litepaper', // TODO: add proper route
      },
    }),
    [],
  );

  const desktopItems: INavItem[] = useMemo(
    () => [links.dashboard, links.stake, links.parachain, links.boost],
    [links],
  );

  const desktopMenuItems: INavItem[] = useMemo(
    () => [links.docs, links.litepaper],
    [links],
  );

  const mobileItems: INavItem[] = useMemo(
    () => [
      links.dashboard,
      links.stake,
      links.parachain,
      links.boost,
      links.docs,
      links.litepaper,
    ],
    [links],
  );

  return {
    desktopItems,
    desktopMenuItems,
    mobileItems,
  };
};
