import { t } from '@ankr.com/common';
import { Box, Paper, Typography } from '@material-ui/core';

import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useUnstakeSuccessStyles } from 'modules/stake/components/UnstakeSuccess/useUnstakeSuccessStyles';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';

import { useUnstakeSuccessPolkadot } from './useUnstakeSuccessPolkadotStyles';

interface IUnstakeSuccessPolkadotProps {
  onClose: VoidFunction;
  tokenName: string;
}

const POLKADOT_UNSTAKE_PERIOD = '~28';

export const UnstakeSuccessPolkadot = ({
  onClose,
  tokenName,
}: IUnstakeSuccessPolkadotProps): JSX.Element => {
  const period = t('unit.days-value', { value: POLKADOT_UNSTAKE_PERIOD });

  const successClasses = useUnstakeSuccessStyles();
  const classes = useUnstakeSuccessPolkadot();
  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Paper className={successClasses.root}>
        <Typography
          className={successClasses.title}
          component="h2"
          variant="h1"
        >
          {t('unstake-dialog.success.title')}
        </Typography>

        <Typography className={successClasses.text}>
          {t('unstake-dialog.success.description', {
            token: tokenName,
            period,
          })}
        </Typography>

        <NavLink
          className={classes.btn}
          href={DashboardRoutes.dashboard.generatePath()}
          size="large"
          variant="contained"
        >
          {t('unstake-dialog.success.return')}
        </NavLink>

        {typeof onClose === 'function' && (
          <Button
            className={successClasses.closeBtn}
            variant="outlined"
            onClick={onClose}
          >
            <CloseIcon htmlColor="inherit" size="xxs" />
          </Button>
        )}
      </Paper>
    </Box>
  );
};
