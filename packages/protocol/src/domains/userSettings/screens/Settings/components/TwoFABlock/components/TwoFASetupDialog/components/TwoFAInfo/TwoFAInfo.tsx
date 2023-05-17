import { tHTML } from '@ankr.com/common';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useTwoFAInfoStyles } from './TwoFAInfoStyles';
import { USER_SETTINGS_INTL_ROOT } from '../../../../constants';
import { TwoFAQRCode } from '../TwoFAQRCode';

interface TwoFAInfoProps {
  children: ReactNode;
}

export const TwoFAInfo = ({ children }: TwoFAInfoProps) => {
  const { classes } = useTwoFAInfoStyles();

  return (
    <>
      <Box className={classes.root}>
        <Typography className={classes.header} variant="body1" component="div">
          {tHTML(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.info.header`)}
        </Typography>
        <Box className={classes.description} component="div">
          {tHTML(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.info.description`)}
        </Box>
        {children}
      </Box>
      <TwoFAQRCode />
    </>
  );
};
