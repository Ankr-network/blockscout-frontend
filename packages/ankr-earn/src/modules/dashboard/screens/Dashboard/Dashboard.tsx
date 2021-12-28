import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import { useDashboardStyles as useStyles } from './useDashboardStyles';

export const Dashboard = () => {
  const classes = useStyles();

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
        <Grid item xs={12} lg={6}>
          <StakingAsset
            network="Ethereum Mainnet"
            token={EToken.aMATICb}
            amount={1234}
            tradeLink="trade-link-PLACEHOLDER"
            unstakeLink="unstake-link-PLACEHOLDER"
            stakeLink="stake-link-PLACEHOLDER"
          />
        </Grid>
      </Grid>
    </Container>
  );
};
