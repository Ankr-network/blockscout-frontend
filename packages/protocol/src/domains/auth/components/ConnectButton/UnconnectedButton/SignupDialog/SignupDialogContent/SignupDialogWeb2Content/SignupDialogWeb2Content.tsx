import { Box, Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { Google, Mark } from '@ankr.com/ui';

import { InfoBanner } from 'modules/common/components/InfoBanner';

import { useSignupDialogWeb2ContentStyles } from './useSignupDialogWeb2ContentStyles';

interface SignupDialogWeb2ContentProps {
  onClick: () => void;
}

export const SignupDialogWeb2Content = ({
  onClick,
}: SignupDialogWeb2ContentProps) => {
  const { classes } = useSignupDialogWeb2ContentStyles();

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
          startIcon={<Google />}
        >
          {t('signup-modal.gmail-button')}
        </Button>
        <InfoBanner
          icon={<Mark />}
          message={tHTML('signup-modal.email-warning')}
          className={classes.banner}
        />
        <Typography className={classes.subtitle} variant="h6">
          {tHTML('signup-modal.description')}
        </Typography>
      </Box>
    </Box>
  );
};
