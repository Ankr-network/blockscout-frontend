import { Grid, Typography } from '@material-ui/core';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';
import { NavLink } from 'uiKit/NavLink';
import { useStakeSuccessDialogStyles } from './useStakeSuccessDialogStyles';

export interface IStakeSuccessful {
  token: AvailableTokens;
  isOpened?: boolean;
  onClose?: () => void;
  onAddTokenClick?: () => void;
}

export const StakeSuccessDialog = ({
  token,
  isOpened = false,
  onClose,
  onAddTokenClick,
}: IStakeSuccessful) => {
  const classes = useStakeSuccessDialogStyles();

  return (
    <Dialog open={isOpened} onClose={onClose}>
      <div className={classes.wrapper}>
        <Typography variant="h1" className={classes.title}>
          {t('stake.success.title')}
        </Typography>

        <Typography className={classes.text}>
          {t('stake.success.description', { token })}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NavLink
              variant="contained"
              fullWidth
              href={DashboardRoutes.dashboard.generatePath()}
            >
              {t('stake.success.return')}
            </NavLink>
          </Grid>

          {typeof onAddTokenClick === 'function' && (
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={onAddTokenClick}>
                {t('stake.success.add-to-wallet', { token })}
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </Dialog>
  );
};
