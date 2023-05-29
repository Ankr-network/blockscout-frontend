import { Box, ButtonBase, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { uid } from 'react-uid';
import { t } from '@ankr.com/common';

import { useSignupDialogWeb3ContentStyles } from './useSignupDialogWeb3ContentStyles';
import { ETH_COMPATIBLE_WALLETS } from './SignupDialogWeb3ContentUtils';
import {
  IConnectWalletsModalProps,
  IOnWalletItemClickArgs,
} from './SignupDialogWeb3ContentTypes';

export const SignupDialogWeb3Content = ({
  onConnect,
  onClose,
}: IConnectWalletsModalProps) => {
  const { classes } = useSignupDialogWeb3ContentStyles();

  const onWalletItemClick =
    ({ href, isInjected, walletId }: IOnWalletItemClickArgs) =>
    async () => {
      if (!isInjected) {
        window.open(href, '_blank', 'noopener, noreferrer');

        return;
      }

      onClose();

      await onConnect(walletId);
    };

  return (
    <Box width="100%">
      <Grid container spacing={4} sx={{ marginTop: 0, marginLeft: -2 }}>
        {ETH_COMPATIBLE_WALLETS.map(walletsGroup => (
          <Fragment key={uid(walletsGroup)}>
            {walletsGroup.map(walletItem => {
              const { href, icon, isHidden, isInjected, title, walletId } =
                walletItem;

              if (isHidden) {
                return null;
              }

              return (
                <Grid
                  sx={{ flexBasis: '100%' }}
                  key={uid(walletItem)}
                  padding={2}
                  item
                  sm={4}
                  xs={12}
                >
                  <ButtonBase
                    className={classes.walletItem}
                    onClick={onWalletItemClick({
                      href,
                      isInjected,

                      walletId,
                    })}
                  >
                    {icon}

                    <Typography
                      className={classes.walletItemTitle}
                      variant="h5"
                    >
                      {title}
                    </Typography>

                    {!isInjected && (
                      <Typography
                        className={classes.walletItemInstall}
                        variant="subtitle2"
                      >
                        {t('signup-modal.wallet-install')}
                      </Typography>
                    )}
                  </ButtonBase>
                </Grid>
              );
            })}
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
};
