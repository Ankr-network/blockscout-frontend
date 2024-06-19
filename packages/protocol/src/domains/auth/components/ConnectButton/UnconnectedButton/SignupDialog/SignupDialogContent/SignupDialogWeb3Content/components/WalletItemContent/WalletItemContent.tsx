import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { useSignupDialogWeb3ContentStyles } from '../../useSignupDialogWeb3ContentStyles';

interface WalletItemContentProps {
  icon: ReactNode;
  name: string;
  isInjected: boolean;
}

export const WalletItemContent = ({
  icon,
  isInjected,
  name,
}: WalletItemContentProps) => {
  const isMobile = useIsSMDown();

  const { classes } = useSignupDialogWeb3ContentStyles(isMobile);

  return (
    <>
      {icon}

      <Typography className={classes.walletItemTitle} variant="h5">
        {name}
      </Typography>

      {!isInjected && (
        <Typography className={classes.walletItemInstall} variant="subtitle2">
          {t('signup-modal.web3.wallet-install')}
        </Typography>
      )}
    </>
  );
};
