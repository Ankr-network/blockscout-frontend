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
  renderButton: ({ className }) => (
    <NavLink
      className={className}
      disabled
      fullWidth
      href={PRICING_PATH}
      variant="contained"
    >
      {t(`${intlRoot}.${Title.free}.button`)}
    </NavLink>
  ),
  title: Title.free,
};

const premiumItem: Item = {
  hasIntro: true,
  itemCount: 5,
  renderButton: ({ onClick }) => (
    <Button onClick={onClick}>
      {t(`${intlRoot}.${Title.premium}.button`)}
    </Button>
  ),
  title: Title.premium,
};

const enterpriseItem: Item = {
  hasIntro: false,
  itemCount: 3,
  renderButton: ({ className, onClick }) => (
    <NavLink
      className={className}
      fullWidth
      href={MAIL_TO_SALES}
      onClick={onClick}
      variant="outlined"
    >
      {t(`${intlRoot}.${Title.enterprise}.button`)}
    </NavLink>
  ),
  title: Title.enterprise,
};

export const items = [freeItem, premiumItem, enterpriseItem];

export const itemsV2: Item[] = [
  {
    ...freeItem,
    renderButton: ({ onClick }) => (
      <ConnectButton
        buttonText={t(`${intlRoot}.${Title.free}.button-register`)}
        onSuccess={onClick}
        variant="contained"
      />
    ),
  },
  {
    ...premiumItem,
    renderButton: ({ onClick }) => (
      <Button onClick={onClick} variant="outlined">
        {t(`${intlRoot}.${Title.premium}.button`)}
      </Button>
    ),
  },
  enterpriseItem,
];
