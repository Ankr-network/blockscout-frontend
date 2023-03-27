import { NavLinkProps } from 'react-router-dom';
import { ButtonProps } from '@mui/material';
import { History } from 'history';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { CoinStack, Gear, Doc, Block, Wallet, AdvancedApi } from '@ankr.com/ui';
import { Diamonds } from 'uiKit/Icons/Diamonds';
import { Automate } from 'uiKit/Icons/Automate';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { track } from 'modules/analytics/mixpanel/utils/track';
import { MixpanelEvent } from 'modules/analytics/mixpanel/const';

export type IsActive = (match: any, location: History['location']) => boolean;

export interface NavigationListParams {
  chainsRoutes: string[];
  hasPremium: boolean;
  onAAPIClick: () => void;
  onDocsClick: () => void;
  onSettingsClick: () => void;
}

export const DOC_URL = 'https://www.ankr.com/docs/build-blockchain/overview';

const isDashboardActive = (
  match: any,
  location: History['location'],
  chainsRoutes: string[],
) => {
  if (match?.isExact) return match?.isExact;

  return chainsRoutes.some(route => location.pathname.includes(route));
};

const getAdvancedApiList = (onAAPIClick: () => void): NavigationItem[] => [
  {
    StartIcon: AdvancedApi,
    ActiveIcon: AdvancedApi,
    href: AdvancedApiRoutesConfig.advancedApi.generatePath(),
    label: t('main-navigation.advanced-api'),
    onClick: onAAPIClick,
  },
];

export const getEndpointsList = (
  chainsRoutes: string[],
  onAAPIClick: () => void,
): NavigationItem[] => [
  {
    StartIcon: Block,
    ActiveIcon: Block,
    href: ChainsRoutesConfig.chains.generatePath(),
    isActive: (match: any, location: History['location']) =>
      isDashboardActive(match, location, chainsRoutes),
    label: t('main-navigation.endpoints'),
  },
  ...getAdvancedApiList(onAAPIClick),
  {
    StartIcon: Diamonds,
    ActiveIcon: Diamonds,
    isComingSoon: true,
    label: t('main-navigation.enterprise'),
    onClick: () => track({ event: MixpanelEvent.SOON_ENTERPRISE }),
    isDisabled: true,
  },
];

export const getToolsList = (): NavigationItem[] => [
  {
    StartIcon: Automate,
    ActiveIcon: Automate,
    label: t('main-navigation.automate'),
    isComingSoon: true,
    onClick: () => track({ event: MixpanelEvent.SOON_AUTOMATE }),
    isDisabled: true,
  },
];

export const getMenuList = (
  hasPremium: boolean,
  onDocsClick: () => void,
): NavigationItem[] => [
  hasPremium
    ? {
        StartIcon: Wallet,
        ActiveIcon: Wallet,
        href: AccountRoutesConfig.accountDetails.generatePath(),
        label: t('main-navigation.billing'),
      }
    : {
        StartIcon: CoinStack,
        ActiveIcon: CoinStack,
        href: PricingRoutesConfig.pricing.generatePath(),
        label: t('main-navigation.pricing'),
      },
  {
    StartIcon: Doc,
    href: DOC_URL,
    label: t('main-navigation.docs'),
    onClick: onDocsClick,
  },
];

export const getSettingList = (
  onSettingsClick: () => void,
): NavigationItem[] => [
  {
    StartIcon: Gear,
    ActiveIcon: Gear,
    href: UserSettingsRoutesConfig.settings.generatePath(),
    label: t('main-navigation.settings'),
    onClick: onSettingsClick,
  },
];

export const getNavigationList = ({
  chainsRoutes,
  hasPremium,
  onAAPIClick,
  onDocsClick,
  onSettingsClick,
}: NavigationListParams): NavigationItem[] => [
  getEndpointsList(chainsRoutes, onAAPIClick)[0],
  ...getAdvancedApiList(onAAPIClick),
  ...getMenuList(hasPremium, onDocsClick),
  ...getSettingList(onSettingsClick),
];

export const getButtonProps = (props: NavigationItem): ButtonProps => ({
  ...props,
  disabled: !props.isComingSoon && (!props.href || props.isDisabled),
  key: props.label,
  onClick: props.onClick,
  variant: 'text',
});

export const getExternalButtonProps = (
  props: NavigationItem,
): ButtonProps | NavLinkProps => {
  const buttonProps = getButtonProps(props);

  return {
    ...buttonProps,
    href: props.href,
    rel: 'noopener noreferrer',
    target: '_blank',
  };
};

export const getCommonButtonProps = (
  props: NavigationItem,
): ButtonProps | NavLinkProps => {
  const buttonProps = getButtonProps(props);

  return {
    ...buttonProps,
    to: props.href,
    isActive: props.isActive,
  };
};
