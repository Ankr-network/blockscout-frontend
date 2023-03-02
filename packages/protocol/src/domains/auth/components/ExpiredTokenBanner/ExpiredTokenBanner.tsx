import { tHTML } from '@ankr.com/common';
import { Mark } from '@ankr.com/ui';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoBanner as BaseInfoBanner } from 'modules/common/components/InfoBanner';
import { useExpiredTokenBannerStyles } from './ExpiredTokenBannerStyles';

export const ExpiredTokenBanner = () => {
  const { classes } = useExpiredTokenBannerStyles();

  const { isTokenExpired } = useAuth();

  return isTokenExpired ? (
    <BaseInfoBanner
      message={tHTML('expired-token.text')}
      icon={<Mark />}
      className={classes.root}
    />
  ) : null;
};
