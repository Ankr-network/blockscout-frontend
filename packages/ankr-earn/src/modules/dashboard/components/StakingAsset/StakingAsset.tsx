import { Grid, Paper, Typography } from '@material-ui/core';
import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';
import { NetworkIconText } from '../NetworkIconText';
import { Pending } from '../Pending';
import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  token: EToken;
  network: string;
  amount: number;
  tradeLink?: string;
  stakeLink?: string;
  unstakeLink?: string;
  isPending?: boolean;
}

export const StakingAsset = ({
  network,
  token,
  amount,
  tradeLink,
  stakeLink,
  unstakeLink,
  isPending = false,
}: IStakingAssetProps) => {
  const classes = useStyles();

  const displayLinks = stakeLink || unstakeLink || tradeLink;

  return (
    <Paper className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <NetworkIconText network={network} token={token} />
        </Grid>

        {isPending && (
          <Grid item>
            <Pending value={123} token="aMATICb" />
          </Grid>
        )}
      </Grid>

      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item>
          <Typography className={classes.amount}>
            {amount ? amount : '-'}
          </Typography>
        </Grid>

        {displayLinks && (
          <Grid
            item
            xs
            container
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            {stakeLink && (
              <Grid item>
                <PlusMinusBtn href={stakeLink} />
              </Grid>
            )}
            {unstakeLink && (
              <Grid item>
                <PlusMinusBtn href={unstakeLink} icon="minus" />
              </Grid>
            )}
            {tradeLink && (
              <Grid item>
                <NavLink className={classes.tradeButton} href={tradeLink}>
                  {t('dashboard.trade')}
                </NavLink>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
