import { t } from '@ankr.com/common';
import { Box, Grid, Paper, Typography } from '@material-ui/core';

import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { RoutesConfig as StakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { RoutesConfig as StakeMaticPolygonRoutes } from 'modules/stake-matic/polygon/Routes';
import { CloseButton } from 'uiKit/CloseButton';
import { Container } from 'uiKit/Container';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { NavLink } from 'uiKit/NavLink';

import { useNetworkChooserStyles } from './useNetworkChooserStyles';

const HREF_CLOSE = DashboardRoutes.dashboard.generatePath();
const HREF_MATIC_ETH = StakeMaticEthRoutes.stake.generatePath();
const HREF_MATIC_POLYGON = StakeMaticPolygonRoutes.stake.generatePath();

export const NetworkChooser = (): JSX.Element => {
  const classes = useNetworkChooserStyles();

  return (
    <Box component="section" py={5}>
      <Container maxWidth={700}>
        <Paper className={classes.paper}>
          <Container maxWidth={490}>
            <Typography className={classes.title} variant="h3">
              {t('stake-matic-common.network-chooser.title')}
            </Typography>

            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs>
                <NavLink
                  className={classes.chooseItemArea}
                  href={HREF_MATIC_ETH}
                  variant="outlined"
                >
                  <EthIcon className={classes.chooseItemIcon} />

                  <span className={classes.chooseItemTitle}>
                    {t('stake-matic-common.network-chooser.ethereum-network')}
                  </span>
                </NavLink>
              </Grid>

              <Grid item xs>
                <NavLink
                  className={classes.chooseItemArea}
                  href={HREF_MATIC_POLYGON}
                  variant="outlined"
                >
                  <MaticIcon className={classes.chooseItemIcon} />

                  <span className={classes.chooseItemTitle}>
                    {t('stake-matic-common.network-chooser.polygon-network')}
                  </span>
                </NavLink>
              </Grid>
            </Grid>
          </Container>

          <CloseButton isAbsoluteRight href={HREF_CLOSE} />
        </Paper>
      </Container>
    </Box>
  );
};
