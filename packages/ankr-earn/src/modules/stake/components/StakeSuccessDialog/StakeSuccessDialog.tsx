import { Grid, Paper, Typography } from '@material-ui/core';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';
import { useStakeSuccessDialogStyles } from './useStakeSuccessDialogStyles';

export interface IStakeSuccessful {
  tokenName: string;
  onClose?: () => void;
  onAddTokenClick?: () => void;
}

export const StakeSuccessDialog = ({
  tokenName,
  onClose,
  onAddTokenClick,
}: IStakeSuccessful) => {
  const classes = useStakeSuccessDialogStyles();

  return (
    <Paper className={classes.root}>
      <Container className={classes.wrapper}>
        <Typography variant="h1" className={classes.title}>
          {t('stake.success.title')}
        </Typography>

        <Typography className={classes.text}>
          {t('stake.success.description', { token: tokenName })}
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
                {t('stake.success.add-to-wallet', { token: tokenName })}
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>

      <Button variant="outlined" className={classes.closeBtn} onClick={onClose}>
        <CloseIcon size="xxs" htmlColor="inherit" />
      </Button>
    </Paper>
  );
};
