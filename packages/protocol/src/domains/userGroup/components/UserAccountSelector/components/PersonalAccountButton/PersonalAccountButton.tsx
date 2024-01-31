import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { PersonalAccountButtonIcon } from './components/PersonalAccountButtonIcon';
import { usePersonalAccountButton } from './hooks/usePersonalAccountButton';
import { usePersonalAccountButtonStyles } from './usePersonalAccountButtonStyles';

export interface PersonalAccountButtonProps {
  onClick: () => void;
}

export const PersonalAccountButton = ({
  onClick,
}: PersonalAccountButtonProps) => {
  const {
    accountName,
    hasOauthWithoutWeb3,
    oauthProvider,
    withoutWeb3WithoutOauth,
  } = usePersonalAccountButton();

  const { classes } = usePersonalAccountButtonStyles();

  if (withoutWeb3WithoutOauth) {
    // TODO: handle this case in https://ankrnetwork.atlassian.net/browse/MRPC-4112
    // eslint-disable-next-line no-console
    console.log('UnconnectedButton');
  }

  return (
    <Button
      startIcon={
        <PersonalAccountButtonIcon
          hasOauthWithoutWeb3={hasOauthWithoutWeb3}
          oauthProvider={oauthProvider}
        />
      }
      classes={{ startIcon: classes.startIcon }}
      className={classes.root}
      onClick={onClick}
      variant="text"
    >
      <div className={classes.accountInfo}>
        <Typography className={classes.accountName} variant="body2">
          {accountName}
        </Typography>
        <Typography className={classes.accountSettings} variant="body3">
          {t('account-menu.personal-account-settings')}
        </Typography>
      </div>
    </Button>
  );
};
