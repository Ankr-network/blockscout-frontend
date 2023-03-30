import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { Item, Title } from './types';
import { PRICING_PATH } from 'domains/pricing/Routes';
import { NavLink } from 'uiKit/NavLink';

export const intlRoot = 'chain-item-dialog';

export const DIALOG_BREAKDOWN = 840;

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
    <Button
      color={color}
      variant={variant}
      className={className}
      fullWidth
      onClick={onClick}
    >
      {t(`${intlRoot}.${Title.enterprise}.button`)}
    </Button>
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
