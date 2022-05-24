import { Grid, Paper, Typography } from '@material-ui/core';

import { t } from 'common';

import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
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
}: IStakeSuccessful): JSX.Element => {
  const classes = useStakeSuccessDialogStyles();

  return (
    <Paper className={classes.root}>
      <Container className={classes.wrapper}>
        <Typography className={classes.title} variant="h1">
          {t('stake.success.title')}
        </Typography>

        <Typography className={classes.text}>
          {t('stake.success.description', { token: tokenName })}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NavLink
              fullWidth
              href={DashboardRoutes.dashboard.generatePath()}
              variant="contained"
            >
              {t('stake.buttons.return')}
            </NavLink>
          </Grid>

          {typeof onAddTokenClick === 'function' && (
            <Grid item xs={12}>
              <Button fullWidth variant="outlined" onClick={onAddTokenClick}>
                {t('stake.success.add-to-wallet', { token: tokenName })}
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>

      <Button className={classes.closeBtn} variant="outlined" onClick={onClose}>
        <CloseIcon htmlColor="inherit" size="xxs" />
      </Button>
    </Paper>
  );
};
