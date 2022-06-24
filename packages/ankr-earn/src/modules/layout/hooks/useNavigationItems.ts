import { useMemo } from 'react';

import { t } from 'common';

import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { RoutesConfig as BridgeRoutes } from 'modules/bridge/RoutesConfig';
import { INavigationLinkProps } from 'modules/common/components/NavigationLink';
import {
  DOCS_LINK,
  featuresConfig,
  isMainnet,
  LITEPAPER_CN,
  LITEPAPER_EN,
} from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useLocale } from 'modules/i18n/hooks/useLocale';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { Locale } from 'modules/i18n/types/locale';
import { RoutesConfig as PolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { RoutesConfig as AnkrStakingRoutes } from 'modules/stake-ankr/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { RoutesConfig as SwitcherRoutes } from 'modules/switcher/Routes';

const getLitepaperLink = (locale: Locale): string => {
  switch (locale) {
    case Locale.zh:
      return LITEPAPER_CN;

    default:
      return LITEPAPER_EN;
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
        href: DashboardRoutes.dashboard.generatePath(),
      },
      stake: {
        label: t(
          `main-navigation.${
            featuresConfig.ankrStaking ? 'liquid-staking' : 'stake'
          }`,
        ),
        href: StakeRoutes.main.generatePath(),
      },
      ankrStaking: {
        label: t('main-navigation.ankr-staking'),
        href: AnkrStakingRoutes.main.generatePath(),
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
        href: BoostRoutes.root,
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
        href: DOCS_LINK,
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
      ...(featuresConfig.ankrStaking ? [links.ankrStaking] : []),
      links.stake,
      links.boost,
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
      ...(featuresConfig.ankrStaking ? [links.ankrStaking] : []),
      links.stake,
      links.boost,
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
