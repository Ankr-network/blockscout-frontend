import { Link, LinkProps } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from 'modules/i18n/utils/intl';
import { LoadableButton } from 'uiKit/LoadableButton';
import { AccountMarker } from '../AccountMarker';
import { Balance } from '../Balance';
import { useStyles } from './AccountDetailsButtonStyles';
import { useAccountData } from './hooks/useAccountData';

export interface AccountDetailsButtonProps {
  isMobile?: boolean;
}

export const AccountDetailsButton = ({
  isMobile = false,
}: AccountDetailsButtonProps) => {
  const { balance, isLoading, status } = useAccountData();

  const classes = useStyles(isMobile);

  return (
    <LoadableButton<'a', LinkProps>
      className={classes.accountDetailsButtonRoot}
      component={Link}
      loading={isLoading}
      to={AccountRoutesConfig.accountDetails.path}
      variant="text"
    >
      <div className={classes.content}>
        <AccountMarker status={status} />
        <span className={classes.label}>
          <Balance balance={balance} className={classes.balance} />
          <span className={classes.currency}>
            &nbsp;{t('account.currencies.credit')}
          </span>
        </span>
      </div>
    </LoadableButton>
  );
};
