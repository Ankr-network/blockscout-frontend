import { History } from 'history';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { CoinStack, Gear, Doc, Block, Wallet } from '@ankr.com/ui';
import { Diamonds } from 'uiKit/Icons/Diamonds';
import { Automate } from 'uiKit/Icons/Automate';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavigationItem } from 'modules/common/components/Navigation';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { track } from 'modules/analytics/mixpanel/utils/track';
import { MixpanelEvent } from 'modules/analytics/mixpanel/const';
import { ButtonProps } from '@mui/material';
import { NavLinkProps } from 'react-router-dom';

export type IsActive = (match: any, location: History['location']) => boolean;

export interface NavigationListParams {
  chainsRoutes: string[];
  hasPremium: boolean;
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

export const getEndpointsList = (chainsRoutes: string[]): NavigationItem[] => [
  {
    StartIcon: Block,
    ActiveIcon: Block,
    href: ChainsRoutesConfig.chains.generatePath(),
    isActive: (match: any, location: History['location']) =>
      isDashboardActive(match, location, chainsRoutes),
    label: t('main-navigation.endpoints'),
  },
  {
    StartIcon: Diamonds,
    ActiveIcon: Diamonds,
    comingSoon: true,
    label: t('main-navigation.enterprise'),
    onClick: () => track({ event: MixpanelEvent.SOON_ENTERPRISE }),
  },
];

export const getToolsList = (): NavigationItem[] => [
  {
    StartIcon: Automate,
    ActiveIcon: Automate,
    label: t('main-navigation.automate'),
    comingSoon: true,
    onClick: () => track({ event: MixpanelEvent.SOON_AUTOMATE }),
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
  onDocsClick,
  onSettingsClick,
}: NavigationListParams): NavigationItem[] => [
  getEndpointsList(chainsRoutes)[0],
  ...getMenuList(hasPremium, onDocsClick),
  ...getSettingList(onSettingsClick),
];

export const getButtonProps = (props: NavigationItem): ButtonProps => ({
  ...props,
  disabled: !props.comingSoon && (!props.href || props.isDisabled),
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
