import { t } from '@ankr.com/common';
import { Box, Button, Paper, Typography } from '@material-ui/core';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';

import connectWalletIcon from '../../assets/connect-wallet-icon.jpg';
import connectWalletIcon2x from '../../assets/connect-wallet-icon@2x.jpg';

import { useConnectStyles } from './useConnectStyles';

interface IGuardRouteProps {
  isConnected: boolean;
  children: JSX.Element;
  onConnectClick: () => void;
}

export const ConnectionGuard = ({
  isConnected,
  children,
  onConnectClick,
}: IGuardRouteProps): JSX.Element => {
  const classes = useConnectStyles();

  if (!isConnected) {
    return (
      <DefaultLayout verticalAlign="center">
        <Box component="section" py={{ xs: 5, md: 8 }}>
          <Container>
            <Paper className={classes.root}>
              <div className={classes.imgArea}>
                <img
                  alt={t('connect.title')}
                  className={classes.img}
                  src={connectWalletIcon}
                  srcSet={`${connectWalletIcon2x} 2x`}
                />
              </div>

              <Typography className={classes.titleArea} variant="h3">
                {t('connect.title')}
              </Typography>

              <Button onClick={onConnectClick}>
                {t('connect.connect-wallet')}
              </Button>
            </Paper>
          </Container>
        </Box>
      </DefaultLayout>
    );
  }

  return children;
};
