import { useAuth } from 'domains/auth/hooks/useAuth';
import { InfoBanner as BaseInfoBanner } from 'modules/common/components/InfoBanner';
import { useExpiredTokenBannerStyles } from './ExpiredTokenBannerStyles';
import { ReactComponent as WarningIcon } from 'uiKit/Icons/warning-icon.svg';
import { tHTML } from 'modules/i18n/utils/intl';

export const ExpiredTokenBanner = () => {
  const classes = useExpiredTokenBannerStyles();
  const { credentials } = useAuth();

  return credentials && !credentials.endpoint_token ? (
    <BaseInfoBanner
      message={tHTML('expired-token.text')}
      icon={<WarningIcon />}
      className={classes.root}
    />
  ) : null;
};
