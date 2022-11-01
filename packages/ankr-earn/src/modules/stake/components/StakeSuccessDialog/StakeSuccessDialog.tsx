import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { Grid, Paper, Typography } from '@material-ui/core';

import { t } from 'common';

import { trackClickGoToDashboard } from 'modules/analytics/tracking-actions/trackClickGoToDashboard';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';

import { useStakeSuccessDialogStyles } from './useStakeSuccessDialogStyles';

export interface IStakeSuccessful {
  title?: string;
  tokenName: string;
  onAddTokenClick?: () => void;
  onClose?: () => void;
}

export const StakeSuccessDialog = ({
  title = t('stake.success.title'),
  tokenName,
  onAddTokenClick,
  onClose,
}: IStakeSuccessful): JSX.Element => {
  const classes = useStakeSuccessDialogStyles();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const onDashboardClick = (): void => {
    trackClickGoToDashboard({
      tokenName: tokenName as Token,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  return (
    <Paper className={classes.root}>
      <Container className={classes.wrapper}>
        <Typography className={classes.title} variant="h1">
          {title}
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
              onMouseDown={onDashboardClick}
              onTouchStart={onDashboardClick}
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
