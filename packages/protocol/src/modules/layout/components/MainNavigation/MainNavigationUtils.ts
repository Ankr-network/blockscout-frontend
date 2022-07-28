import { History } from 'history';
import { ChainsRoutesConfig, PATH_CHAINS } from 'domains/chains/Routes';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as BillingIcon } from 'uiKit/Icons/billing.svg';
import { ReactComponent as PricingIcon } from 'uiKit/Icons/pricing.svg';
import { ReactComponent as DocsIcon } from 'uiKit/Icons/docs.svg';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/setting.svg';
import { t } from 'common';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExplorerRoutesConfig } from 'domains/explorer/Routes';
import { NavigationItem } from 'modules/common/components/Navigation';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

export type IsActive = (match: any, location: History['location']) => boolean;

export const HAS_REQUEST_EXPLORER = false;
export const DOC_URL = 'https://www.ankr.com/docs/build-blockchain/overview';
export const FAQ_URL = 'https://docs.ankr.com/ankr-protocol/faqs';

const isDashboardActive: IsActive = (
  match: any,
  location: History['location'],
) => {
  return match?.isExact || location.pathname.includes(PATH_CHAINS);
};

export const getNavigationList = (
  isWalletConnected: boolean,
  hasCredentials: boolean,
  isMobile?: boolean,
): NavigationItem[] => {
  const list: NavigationItem[] = [
    {
      label: t('main-navigation.endpoints'),
      StartIcon: BoxIcon,
      href: ChainsRoutesConfig.chains.generatePath(),
      isActive: isDashboardActive,
    },
    (isWalletConnected || hasCredentials) && {
      label: t('main-navigation.billing'),
      StartIcon: BillingIcon,
      href: AccountRoutesConfig.accountDetails.generatePath(),
    },
    !hasCredentials && {
      label: t('main-navigation.pricing'),
      StartIcon: PricingIcon,
      href: PricingRoutesConfig.pricing.generagePath(),
    },
    {
      label: t('main-navigation.docs'),
      StartIcon: DocsIcon,
      href: DOC_URL,
    },
    isMobile && {
      label: t('extra-navigation.settings'),
      StartIcon: SettingsIcon,
      href: UserSettingsRoutesConfig.settings.generatePath(),
    },
    HAS_REQUEST_EXPLORER && {
      label: t('main-navigation.request-explorer'),
      StartIcon: BoxIcon,
      href: ExplorerRoutesConfig.requestExplorer.generatePath(),
    },
  ].filter(Boolean) as NavigationItem[];

  return list;
};
