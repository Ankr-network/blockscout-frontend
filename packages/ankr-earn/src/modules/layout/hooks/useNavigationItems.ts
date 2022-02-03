import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
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
import { RoutesConfig as ETH2SwapRoutes } from 'modules/eth2Swap/Routes';
import { useLocale } from 'modules/i18n/hooks/useLocale';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { Locale } from 'modules/i18n/types/locale';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as PolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { useMemo } from 'react';

interface INavItem extends Omit<INavigationLinkProps, 'className'> {}

/**
 *  TODO Please uncomment links after the release
 */
export const useNavigationItems = () => {
  const { locale } = useLocale();
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
        href: BoostRoutes.root,
      },
      eth2Swap: {
        label: t('main-navigation.eth2Swap'),
        href: ETH2SwapRoutes.root,
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
      ...(featuresConfig.earlyRelease ? [] : [links.dashboard, links.stake]),
      links.parachain,
      links.boost,
    ],
    [links],
  );

  const desktopMenuItems: INavItem[] = useMemo(
    () => [
      ...(featuresConfig.earlyRelease || !featuresConfig.eth2Swap
        ? []
        : [links.eth2Swap]),
      links.docs,
      links.litepaper,
    ],
    [links],
  );

  const mobileItems: INavItem[] = useMemo(
    () => [
      ...(featuresConfig.earlyRelease ? [] : [links.dashboard, links.stake]),
      links.parachain,
      links.boost,
      ...(featuresConfig.earlyRelease || !featuresConfig.eth2Swap
        ? []
        : [links.eth2Swap]),
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

const getLitepaperLink = (locale: Locale) => {
  switch (locale) {
    case Locale.zh:
      return LITEPAPER_CN;

    default:
      return LITEPAPER_EN;
  }
};
