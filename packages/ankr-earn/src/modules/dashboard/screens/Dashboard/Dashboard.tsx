import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { RoutesConfig as RoutesConfigBoost } from 'modules/boost/Routes';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats as fetchStatsPolygon } from 'modules/stake-polygon/actions/fetchStats';
import { RoutesConfig as RoutesConfigPolygon } from 'modules/stake-polygon/Routes';
import { useDashboardStyles as useStyles } from './useDashboardStyles';

export const Dashboard = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  useInitEffect(() => {
    dispatchRequest(fetchStatsPolygon());
  });

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('dashboard.title')}
      </Typography>

      <Paper className={classes.paper}>
        <Typography className={classes.balanceLabel}>
          {t('dashboard.balance')}
        </Typography>

        <Typography className={classes.balance}>$45,567</Typography>
      </Paper>

      <Typography className={classes.assetsTitle} variant="h3">
        {t('dashboard.assets')}
      </Typography>

      <Grid container spacing={3}>
        <Queries<ResponseData<typeof fetchStatsPolygon>>
          requestActions={[fetchStatsPolygon]}
        >
          {({ data }) => (
            <Grid item xs={12} lg={6}>
              <StakingAsset
                network="Ethereum Mainnet"
                token={EToken.aMATICb}
                amount={data.aMaticbBalance}
                tradeLink={RoutesConfigBoost.tradingCockpit.generatePath()}
                unstakeLink="unstake-link-PLACEHOLDER"
                stakeLink={RoutesConfigPolygon.stake.generatePath()}
              />
            </Grid>
          )}
        </Queries>
      </Grid>
    </Container>
  );
};
