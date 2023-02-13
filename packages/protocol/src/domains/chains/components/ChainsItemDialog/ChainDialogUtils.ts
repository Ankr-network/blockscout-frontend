import { ButtonProps } from '@mui/material';
import { t } from '@ankr.com/common';
import { MAIL_TO_SALES, PRICING_PATH } from 'domains/pricing/Routes';

export const chainDialogIntl = 'chain-item-dialog';

export enum ChainDialogTitle {
  free = 'free',
  premium = 'premium',
  enterprise = 'enterprise',
}

export interface IChainDialogContent {
  title: ChainDialogTitle;
  itemCount: number;
  hasIntro: boolean;
  variant: ButtonProps['variant'];
  linkText: string;
  disabled: boolean;
  link: string;
  hasSignupButton?: boolean;
}

const itemFree = {
  title: ChainDialogTitle.free,
  itemCount: 3,
  hasIntro: false,
  variant: 'contained' as ButtonProps['variant'],
  disabled: true,
  linkText: t(`${chainDialogIntl}.${ChainDialogTitle.free}.button`),
  link: PRICING_PATH,
};

const itemPremium = {
  title: ChainDialogTitle.premium,
  itemCount: 5,
  hasIntro: true,
  variant: 'contained' as ButtonProps['variant'],
  disabled: false,
  linkText: t(`${chainDialogIntl}.${ChainDialogTitle.premium}.button`),
  link: PRICING_PATH,
};

const itemEnterprise = {
  title: ChainDialogTitle.enterprise,
  itemCount: 3,
  hasIntro: false,
  variant: 'outlined' as ButtonProps['variant'],
  disabled: false,
  linkText: t(`${chainDialogIntl}.${ChainDialogTitle.enterprise}.button`),
  link: MAIL_TO_SALES,
};

export const chainDialogContent: IChainDialogContent[] = [
  itemFree,
  itemPremium,
  itemEnterprise,
];

export const chainDialogContentV2: IChainDialogContent[] = [
  {
    ...itemFree,
    variant: 'contained' as ButtonProps['variant'],
    disabled: false,
    linkText: t(`${chainDialogIntl}.${ChainDialogTitle.free}.button-register`),
    hasSignupButton: true,
  },
  {
    ...itemPremium,
    variant: 'outlined' as ButtonProps['variant'],
  },
  itemEnterprise,
];
