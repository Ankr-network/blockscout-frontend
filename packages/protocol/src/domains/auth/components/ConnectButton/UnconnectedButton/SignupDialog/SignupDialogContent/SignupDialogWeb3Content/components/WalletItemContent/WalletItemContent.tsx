import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useSignupDialogWeb3ContentStyles } from '../../useSignupDialogWeb3ContentStyles';
import { isMobile } from 'web3modal';

interface WalletItemContentProps {
  icon: ReactNode;
  name: string;
  isInjected: boolean;
}

export const WalletItemContent = ({
  icon,
  name,
  isInjected,
}: WalletItemContentProps) => {
  const isMobileView = isMobile();

  const { classes } = useSignupDialogWeb3ContentStyles(isMobileView);

  return (
    <>
      {icon}

      <Typography className={classes.walletItemTitle} variant="h5">
        {name}
      </Typography>

      {!isInjected && (
        <Typography className={classes.walletItemInstall} variant="subtitle2">
          {t('signup-modal.wallet-install')}
        </Typography>
      )}
    </>
  );
};
