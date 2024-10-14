import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { SET_UP_2FA_CACHE_KEY } from 'domains/userSettings/const';
import { useSetupTwoFAMutation } from 'domains/userSettings/actions/twoFA/setupTwoFA';

import { useTwoFAQRCodeStyles } from './TwoFAQRCodeStyles';

export const TwoFAQRCode = () => {
  const [, { data: { qrCode } = { qrCode: '' } }] = useSetupTwoFAMutation({
    fixedCacheKey: SET_UP_2FA_CACHE_KEY,
  });
  const { classes } = useTwoFAQRCodeStyles();

  const [src, setSrc] = useState('');

  useEffect(() => {
    const qrCodeSrc = `data:image/png;base64,${qrCode}`;

    setSrc(qrCodeSrc);
  }, [qrCode]);

  return (
    <Box className={classes.root}>
      {src && <img width="224" height="224" src={src} alt="" />}
    </Box>
  );
};
