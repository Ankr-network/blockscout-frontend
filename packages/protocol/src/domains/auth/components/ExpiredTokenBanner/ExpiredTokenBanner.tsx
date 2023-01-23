import { tHTML } from '@ankr.com/common';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoBanner as BaseInfoBanner } from 'modules/common/components/InfoBanner';
import { useExpiredTokenBannerStyles } from './ExpiredTokenBannerStyles';
import { ReactComponent as WarningIcon } from 'uiKit/Icons/warning-icon.svg';

export const ExpiredTokenBanner = () => {
  const { classes } = useExpiredTokenBannerStyles();
  const { isTokenExpired } = useAuth();

  return isTokenExpired ? (
    <BaseInfoBanner
      message={tHTML('expired-token.text')}
      icon={<WarningIcon />}
      className={classes.root}
    />
  ) : null;
};
