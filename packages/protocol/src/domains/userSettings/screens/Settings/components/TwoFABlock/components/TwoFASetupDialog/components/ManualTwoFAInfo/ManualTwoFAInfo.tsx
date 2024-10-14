import { tHTML } from '@ankr.com/common';
import { Box, Typography } from '@mui/material';

import { SET_UP_2FA_CACHE_KEY } from 'domains/userSettings/const';
import { useSetupTwoFAMutation } from 'domains/userSettings/actions/twoFA/setupTwoFA';

import { USER_SETTINGS_INTL_ROOT } from '../../../../constants';
import { useTwoFAInfoStyles } from '../TwoFAInfo/TwoFAInfoStyles';

export const ManualTwoFAInfo = () => {
  const { classes } = useTwoFAInfoStyles();

  const [, { data: { passcode } = { passcode: '' } }] = useSetupTwoFAMutation({
    fixedCacheKey: SET_UP_2FA_CACHE_KEY,
  });

  return (
    <Box className={classes.root}>
      <Typography className={classes.header} variant="body1">
        {tHTML(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.manual-setup.header`)}
      </Typography>
      <Box className={classes.description} component="div">
        {tHTML(
          `${USER_SETTINGS_INTL_ROOT}.setup-dialog.manual-setup.description`,
          {
            code: passcode,
          },
        )}
      </Box>
    </Box>
  );
};
