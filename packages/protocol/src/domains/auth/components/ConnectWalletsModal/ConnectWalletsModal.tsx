import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import { Fragment } from 'react';
import { uid } from 'react-uid';

import { t } from '@ankr.com/common';
import { Dialog } from 'uiKit/Dialog';
import { useConnectWalletsModalStyles } from './useConnectWalletsModalStyles';
import { ETH_COMPATIBLE_WALLETS } from './ConnectWalletsModalUtils';
import {
  IConnectWalletsModalProps,
  IOnWalletItemClickArgs,
} from './ConnectWalletsModalTypes';

export const ConnectWalletsModal = ({
  isOpen = false,
  onClose,
  onConnect,
}: IConnectWalletsModalProps) => {
  const classes = useConnectWalletsModalStyles();

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxPxWidth={618}
      className={classes.root}
    >
      <Box width="100%">
        <Typography className={classes.title} variant="h3">
          {t('header.modal-title')}
        </Typography>

        <Grid container spacing={2}>
          {ETH_COMPATIBLE_WALLETS.map(walletsGroup => (
            <Fragment key={uid(walletsGroup)}>
              {walletsGroup.map(walletItem => {
                const { href, icon, isHidden, isInjected, title, walletId } =
                  walletItem;

                if (isHidden) {
                  return null;
                }

                return (
                  <Grid key={uid(walletItem)} item sm={4} xs={12}>
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
                          {t('header.wallet-install')}
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
    </Dialog>
  );
};
