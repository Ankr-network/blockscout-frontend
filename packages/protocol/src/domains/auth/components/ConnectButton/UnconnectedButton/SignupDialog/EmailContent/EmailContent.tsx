import { Box, Button, Typography } from '@material-ui/core';

import { t } from '@ankr.com/common';
import { useEmailContentStyles } from './useEmailContentStyles';
import { ReactComponent as GoogleIcon } from 'uiKit/Icons/google.svg';
import { InfoBanner } from 'modules/common/components/InfoBanner';
import { ReactComponent as WarningIcon } from 'uiKit/Icons/warning-icon.svg';
import { tHTML } from 'modules/i18n/utils/intl';

interface EmailContentProps {
  onClick: () => void;
}

export const EmailContent = ({ onClick }: EmailContentProps) => {
  const classes = useEmailContentStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h5" color="textSecondary">
        {t('signup-modal.oauth-title')}
      </Typography>

      <Box className={classes.content}>
        <Button
          fullWidth
          className={classes.button}
          variant="outlined"
          onClick={onClick}
          startIcon={<GoogleIcon />}
        >
          {t('signup-modal.gmail-button')}
        </Button>
        <InfoBanner
          icon={<WarningIcon />}
          message={tHTML('signup-modal.email-warning')}
          className={classes.banner}
        />
        <Typography className={classes.subtitle} variant="subtitle1">
          {tHTML('signup-modal.description')}
        </Typography>
      </Box>
    </Box>
  );
};
