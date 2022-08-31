import { useMemo } from 'react';

import { t } from 'common';

import { RoutesConfig as BridgeRoutes } from 'modules/bridge/RoutesConfig';
import { INavigationLinkProps } from 'modules/common/components/NavigationLink';
import {
  DOCS_OVERVIEW_LINK,
  isMainnet,
  LITEPAPER_LINK,
} from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { useLocale } from 'modules/i18n/hooks/useLocale';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { Locale } from 'modules/i18n/types/locale';
import { RoutesConfig as PolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { RoutesConfig as SwitcherRoutes } from 'modules/switcher/Routes';

const getLitepaperLink = (locale: Locale): string => {
  switch (locale) {
    case Locale.zh:
      return LITEPAPER_LINK.stakingCN;

    default:
      return LITEPAPER_LINK.stakingEN;
  }
};

interface INavItem extends Omit<INavigationLinkProps, 'className'> {}

interface IUseNavigationItemsData {
  desktopItems: INavItem[];
  desktopMenuItems: INavItem[];
  mobileItems: INavItem[];
}

export const useNavigationItems = (): IUseNavigationItemsData => {
  const { locale } = useLocale();

  const links: Record<string, INavItem> = useLocaleMemo(
    () => ({
      dashboard: {
        label: t('main-navigation.dashboard'),
        href: DashboardRoutes.dashboardSpare.generatePath(),
      },
      staking: {
        label: t('main-navigation.staking'),
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
      defi: {
        label: t('main-navigation.defi'),
        href: DefiRoutes.root,
      },
      switcher: {
        label: t('main-navigation.switcher'),
        href: SwitcherRoutes.root,
      },
      bridge: {
        label: t('main-navigation.bridge'),
        href: BridgeRoutes.main.generatePath(),
      },
      docs: {
        label: t('main-navigation.docs'),
        href: DOCS_OVERVIEW_LINK,
      },
      litepaper: {
        label: t('main-navigation.litepaper'),
        href: getLitepaperLink(locale),
      },
    }),
    [],
  );

  const desktopItems: INavItem[] = useMemo(
    () => [
      links.dashboard,
      links.staking,
      links.defi,
      links.bridge,
      links.switcher,
    ],
    [links],
  );

  const desktopMenuItems: INavItem[] = useMemo(
    () => [links.parachain, links.docs, links.litepaper],
    [links],
  );

  const mobileItems: INavItem[] = useMemo(
    () => [
      links.dashboard,
      links.staking,
      links.defi,
      links.bridge,
      links.switcher,
      links.parachain,
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
