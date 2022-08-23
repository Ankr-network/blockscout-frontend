import { Paper, Typography } from '@material-ui/core';

import { t } from 'common';

import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';

import { useUnstakeSuccessStyles } from './useUnstakeSuccessStyles';

interface IUnstakeSuccessProps {
  infoText?: string;
  period?: string;
  title?: string;
  tokenName?: string;
  onClose?: () => void;
}

export const UnstakeSuccess = ({
  infoText,
  period,
  title,
  tokenName,
  onClose,
}: IUnstakeSuccessProps): JSX.Element => {
  const classes = useUnstakeSuccessStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} component="h2" variant="h1">
        {typeof title === 'string' ? title : t('unstake-dialog.success.title')}
      </Typography>

      <Typography className={classes.text}>
        {typeof infoText === 'string'
          ? infoText
          : t('unstake-dialog.success.description', {
              token: tokenName,
              period,
            })}
      </Typography>

      <NavLink
        fullWidth
        className={classes.btn}
        href={DashboardRoutes.dashboard.generatePath()}
        size="large"
        variant="contained"
      >
        {t('unstake-dialog.success.return')}
      </NavLink>

      <Button className={classes.closeBtn} variant="outlined" onClick={onClose}>
        <CloseIcon htmlColor="inherit" size="xxs" />
      </Button>
    </Paper>
  );
};
