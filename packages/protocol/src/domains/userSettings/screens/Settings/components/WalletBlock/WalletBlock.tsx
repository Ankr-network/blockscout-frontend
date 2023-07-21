import { Button, Paper, Typography } from '@mui/material';
import { Eth, MetaMaskWallet } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useDialog } from 'modules/common/hooks/useDialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { usesWalletBlockStyles } from './useWalletBlockStyles';

export const WalletBlock = () => {
  const { classes } = usesWalletBlockStyles();

  const { hasOauthLogin, address, isUserEthAddressType } = useAuth();

  const { isOpened, onOpen, onClose } = useDialog();

  if (!hasOauthLogin || !isUserEthAddressType) {
    return null;
  }

  return (
    <>
      <Paper className={classes.root}>
        {address ? (
          <div className={classes.item}>
            <MetaMaskWallet />
            <Typography className={classes.text}>
              {shrinkAddress(address)}
            </Typography>
          </div>
        ) : (
          <Button
            size="large"
            variant="outlined"
            startIcon={<Eth />}
            color="secondary"
            className={classes.button}
            onClick={onOpen}
          >
            {t('user-settings.settings-screen.connect-wallet')}
          </Button>
        )}
      </Paper>

      <SignupDialog
        onClose={onClose}
        isOpen={isOpened}
        hasOauthLogin={hasOauthLogin}
      />
    </>
  );
};
