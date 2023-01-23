import { ButtonProps } from '@mui/material';
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
  disabled: boolean;
  link: string;
}

export const chainDialogContent = [
  {
    title: ChainDialogTitle.free,
    itemCount: 3,
    hasIntro: false,
    variant: 'contained' as ButtonProps['variant'],
    disabled: true,
    link: PRICING_PATH,
  },
  {
    title: ChainDialogTitle.premium,
    itemCount: 5,
    hasIntro: true,
    variant: 'contained' as ButtonProps['variant'],
    disabled: false,
    link: PRICING_PATH,
  },
  {
    title: ChainDialogTitle.enterprise,
    itemCount: 3,
    hasIntro: false,
    variant: 'outlined' as ButtonProps['variant'],
    disabled: false,
    link: MAIL_TO_SALES,
  },
];
