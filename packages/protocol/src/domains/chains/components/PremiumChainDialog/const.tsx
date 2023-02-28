import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { ContentType, Item, Title } from './types';
import { MAIL_TO_SALES, PRICING_PATH } from 'domains/pricing/Routes';
import { NavLink } from 'uiKit/NavLink';

export const intlRoot = 'chain-item-dialog';

export const DIALOG_BREAKDOWN = 840;

export const dialogTitlesMap: Record<ContentType, string> = {
  [ContentType.DEFAULT]: '',
  [ContentType.SIGN_UP]: 'Login to continue',
  [ContentType.TOP_UP]: t('account.account-details.top-up.title'),
};

const freeItem: Item = {
  hasIntro: false,
  itemCount: 3,
  renderButton: ({ color, variant = 'contained', className }) => (
    <NavLink
      color={color}
      variant={variant}
      className={className}
      disabled
      fullWidth
      href={PRICING_PATH}
    >
      {t(`${intlRoot}.${Title.free}.button`)}
    </NavLink>
  ),
  title: Title.free,
  isHighlighted: false,
};

const premiumItem: Item = {
  hasIntro: true,
  itemCount: 5,
  renderButton: ({ color, variant, onClick }) => (
    <Button color={color} variant={variant} onClick={onClick}>
      {t(`${intlRoot}.${Title.premium}.button`)}
    </Button>
  ),
  title: Title.premium,
  isHighlighted: true,
};

const enterpriseItem: Item = {
  hasIntro: false,
  itemCount: 3,
  renderButton: ({ color, variant = 'outlined', className, onClick }) => (
    <NavLink
      color={color}
      variant={variant}
      className={className}
      fullWidth
      href={MAIL_TO_SALES}
      onClick={onClick}
    >
      {t(`${intlRoot}.${Title.enterprise}.button`)}
    </NavLink>
  ),
  title: Title.enterprise,
  isHighlighted: false,
};

export const items = [freeItem, premiumItem, enterpriseItem];

export const itemsPremium: Item[] = [
  {
    ...freeItem,
    renderButton: () => null,
  },
  {
    ...premiumItem,
    renderButton: ({ color, variant = 'contained', className }) => (
      <NavLink
        color={color}
        variant={variant}
        className={className}
        disabled
        fullWidth
        href={PRICING_PATH}
      >
        {t(`${intlRoot}.${Title.free}.button`)}
      </NavLink>
    ),
    isHighlighted: false,
  },
  {
    ...enterpriseItem,
    isHighlighted: true,
  },
];

export const itemsV2: Item[] = [
  {
    ...freeItem,
    renderButton: ({ variant = 'contained', onClick }) => (
      <ConnectButton
        variant={variant}
        buttonText={t(`${intlRoot}.${Title.free}.button-register`)}
        onSuccess={onClick}
      />
    ),
    isHighlighted: true,
  },
  {
    ...premiumItem,
    renderButton: ({ color, variant = 'outlined', onClick }) => (
      <Button color={color} variant={variant} onClick={onClick}>
        {t(`${intlRoot}.${Title.premium}.button`)}
      </Button>
    ),
    isHighlighted: false,
  },
  enterpriseItem,
];
