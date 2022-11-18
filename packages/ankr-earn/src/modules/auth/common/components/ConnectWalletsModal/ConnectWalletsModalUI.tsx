import { t } from '@ankr.com/common';
import { Box, Grid, Typography } from '@material-ui/core';
import { Children, ReactNode } from 'react';
import { uid } from 'react-uid';

import { Dialog } from 'uiKit/Dialog';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { useConnectWalletsModalStyles } from './useConnectWalletsModalStyles';

interface IConnectWalletsModalUIProps {
  isOpen?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

export const ConnectWalletsModalUI = ({
  isOpen = false,
  isLoading = false,
  children,
  onClose,
}: IConnectWalletsModalUIProps): JSX.Element => {
  const classes = useConnectWalletsModalStyles();

  return (
    <Dialog
      className={classes.root}
      isHiddenCloseBtn={isLoading}
      open={isOpen}
      onClose={onClose}
    >
      <Box width="100%">
        <Typography className={classes.title} variant="h3">
          {t('wallets.modal-title')}
        </Typography>

        {isLoading ? (
          <Box className={classes.loading}>
            <QueryLoadingAbsolute />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {Children.map(
              children,
              (child, index) =>
                !!child && (
                  <Grid key={uid(index)} item sm={4} xs={12}>
                    {child}
                  </Grid>
                ),
            )}
          </Grid>
        )}
      </Box>
    </Dialog>
  );
};
